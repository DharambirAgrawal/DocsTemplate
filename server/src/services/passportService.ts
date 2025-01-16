import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import User from "../models/auth/user.model";
import { Application } from "express";
import { generateToken } from "../utils/jwtUtils";
import { refreshTokenPayload, accessTokenPayload } from "../config/tokenPayload";

// Define the user interface (if you don't have it defined yet)
interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | null;
  accountStatus: string;
  isEmailVerified: boolean;
  role: string;
}

export const passportInitialize = (app: Application) => {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: UserType, done) => {
    done(null, user);
  });

  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "https://upgraded-space-meme-gv67xr5w9572wvx9-8080.app.github.dev/api/auth/google/callback",
      },
      async (accessToken: string, refreshToken: string, profile: Profile, done) => {
        try {
          // Find user by email (unique identifier)
          let user = await User.findOne({ email: profile.emails ? profile.emails[0].value : "" });

          console.log(profile);

          if (!user) {
            // If user doesn't exist, create new user
            user = new User({
              firstName: profile.name?.givenName || "",
              lastName: profile.name?.familyName || "",
              email: profile.emails ? profile.emails[0].value : "",
              password: null, // No password for Google users
              accountStatus: "ACTIVE",
              isEmailVerified: true,
              role: "USER",
            });
            await user.save();
          }

          // Generate new refresh and access tokens
          const refreshTokenPayloadData = {
            ...refreshTokenPayload,
            email: profile.emails ? profile.emails[0].value : "",
            role: "USER",
          };
          const newRefreshToken = generateToken(refreshTokenPayloadData, process.env.JWT_TOKEN_SECRET!, 1440 * 7); // 7 days

          const accessTokenPayloadData = {
            ...accessTokenPayload,
            email: profile.emails ? profile.emails[0].value : "",
            role: "USER",
          };
          const newAccessToken = generateToken(accessTokenPayloadData, process.env.JWT_TOKEN_SECRET!, 1440); // 1 day

          // Optionally save session in DB (if needed)
          // await Session.create({
          //   userId: user._id,
          //   sessionId: profile.id,
          //   refreshToken: newRefreshToken,
          //   accessToken: newAccessToken,
          //   isRevoked: false,
          //   lastActiveAt: new Date(),
          //   expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
          // });

          // Return user with tokens
          return done(null, { user, accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
