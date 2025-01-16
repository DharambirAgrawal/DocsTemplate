import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/auth/user.model";
import Session from "../models/auth/sesssion.model";
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
        const payload = { userId: user.id, role: user.role };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" });
        const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

        // Save session in DB
        await Session.create({
          userId: user._id,
          sessionId: profile.id,
          refreshToken: newRefreshToken,
          accessToken: accessToken,
          isRevoked: false,
          lastActiveAt: new Date(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
        });

        return done(null, { user, accessToken, refreshToken: newRefreshToken });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
