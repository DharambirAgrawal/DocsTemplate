import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/auth/user.model";
import Session from "../models/auth/sesssion.model";
import { Application } from "express";
import { generateToken } from "../utils/jwtUtils";
import { refreshTokenPayload,accessTokenPayload } from "../config/tokenPayload";


export const passportMiddleware = (request, response, next) => {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = cb => {
      cb();
    };
  }

  if (request.session && !request.session.save) {
    request.session.save = cb => {
      cb();
    };
  }

  next();
};

export const passportInitialize=(app:Application)=>{
  app.use(passport.initialize());
  passport.serializeUser( (user, done) => {
    done(null, user)
 })
  app.use(passport.session());
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "https://upgraded-space-meme-gv67xr5w9572wvx9-8080.app.github.dev/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });
  console.log(profile)
          if (!user) {
            user = new User({
              firstName: profile.name.givenName || "",
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              password: null, // No password for Google users
              accountStatus: "ACTIVE",
              isEmailVerified: true,
              role: "USER",
            });
            await user.save();
          }
  
          // Generate new tokens
          const payload1={
            ...refreshTokenPayload,
            email:profile.emails[0].value,
            role:'USER'
          }
          const newRefreshToken = generateToken(payload1,process.env.JWT_TOKEN_SECRET,
            1440 * 7
          ); // 7 day

          const payload2={
            ...accessTokenPayload,
            email:profile.emails[0].value,
            role:'USER'
          }
          const accessToken =  generateToken(payload2,process.env.JWT_TOKEN_SECRET,
            1440 
          );
          // Save session in DB
          // await Session.create({
          //   userId: user._id,
          //   sessionId: profile.id,
          //   refreshToken: newRefreshToken,
          //   accessToken: accessToken,
          //   isRevoked: false,
          //   lastActiveAt: new Date(),
          //   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
          // });
  
          return done(null, { user, accessToken, refreshToken: newRefreshToken });
        } catch (error) {
          console.log(error);
          return done(error, profile);
        }
      }
    )
  );
  
}
