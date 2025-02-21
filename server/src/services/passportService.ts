import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import User from "../models/auth/user.model";
import { Application } from "express";

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
        callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done
      ) => {
        try {
          // Return user with tokens
          return done(null, { user: profile });
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
