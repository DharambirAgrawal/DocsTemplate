import { generateToken, generateUniqueId } from "../../utils/jwtUtils";
import User from "../../models/auth/user.model";
import {
  refreshTokenPayload,
  accessTokenPayload,
} from "../../config/tokenPayload";
import { AppError } from "../../errors/AppError";
import Session from "../../models/auth/sesssion.model";
import mongoose from "mongoose";

export const googleLogin = async (existingUser: any) => {
  // Resend Email to verify email (resend)
  if (existingUser.accountStatus == "PENDING") {
    const verifyEmail = await fetch(
      `${process.env.BASE_URL}/api/auth/resend-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify({ email: existingUser.email }),
        },
      }
    );
    if (!verifyEmail.ok) {
      throw new AppError("Server Error", 500);
    }
    return {
      status: "error",
      message: "Verification email sent",
    };
  }

  // Check for lockout status
  if (
    existingUser.lockoutUntil &&
    existingUser.lockoutUntil.getTime() > Date.now()
  ) {
    return {
      status: "error",
      message: "Try again in 15 minutes",
    };
  }

  // Create unique sessionId refreshToken, accessToken from email and sessionId
  const sessionId = generateUniqueId();
  const payload = {
    sessionId: sessionId,
    email: existingUser.email,
  };
  const refreshToken = generateToken(
    { ...refreshTokenPayload, ...payload },
    process.env.JWT_TOKEN_SECRET,
    10080
  ); // 7 day
  const accessToken = generateToken(
    { ...accessTokenPayload, ...payload },
    process.env.JWT_TOKEN_SECRET,
    1440
  ); // 1 day

  const newSession = new Session({
    userId: existingUser._id, // Reference the user _id
    sessionId: sessionId,
    refreshToken: refreshToken, // Replace with actual logic to generate a refresh token
    accessToken: accessToken, // Replace with actual logic to generate an access token
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set expiration time (e.g., 1 hour from now)
    lastActiveAt: new Date(),
    isRevoked: false,
  });

  // Save the session to the database
  const savedSession = await newSession.save();

  if (!savedSession) {
    throw new AppError("Failed to create session", 500);
  }

  // Add this session's _id to the user's sessionIds array
  existingUser.sessionIds.push(savedSession._id as mongoose.Types.ObjectId); // Push the new session's _id
  await existingUser.save();

  if (!savedSession) {
    throw new AppError("Failed to update user", 500);
  }

  return {
    status: "success",
    data: {
      sessionId: sessionId,
      tokens: { refreshToken, accessToken },
    },
  };
};

export const googleRegister = async (req: any, res: any) => {
  try {
    if (!req.user && !req.user.user._json) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const {
      sub,
      name,
      given_name,
      family_name,
      picture,
      email,
      email_verified,
    } = req.user.user._json;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = new User({
        providerId: sub,
        firstName: given_name,
        lastName: family_name,
        email: email,
        providerProfileImage: picture || null,
        isEmailVerified: true,
        role: "USER",
        loginProvider: "GOOGLE",
        accountStatus: "ACTIVE",
      });
      await newUser.createProfile();
      await newUser.save();
      if (!newUser) {
        return res.status(500).json({ message: "Failed to create user" });
      }
      const login = await googleLogin(newUser);
      if (login.status === "error" || !login.data) {
        return res.status(403).json({ message: login.message });
      }
      const { accessToken, refreshToken } = login.data.tokens;
      //sending token in authorization token
      res.cookie("access_token", accessToken, {
        httpOnly: true, // Prevents access to the cookie via JavaScript
        secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
        sameSite: "None", // Prevents CSRF attacks
        maxAge: 1000 * 60 * 60 * 24 * 1, // Set the max age for the refresh token (e.g., 30 days)
      });

      // Set refresh token cookie
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true, // Prevents access to the cookie via JavaScript
        secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
        sameSite: "None", // Prevents CSRF attacks
        maxAge: 1000 * 60 * 60 * 24 * 7, // Set the max age for the refresh token (e.g., 30 days)
      });
      res.header("Authorization", `Bearer ${login.data.sessionId}`);
      return res.redirect(`${process.env.CLIENT_BASE_URL}/auth/signup`);
    }

    if (existingUser.loginProvider != "GOOGLE") {
      throw new AppError(
        `Already loggedin with ${existingUser.loginProvider.toLowerCase()}`,
        400
      );
    }
    const login = await googleLogin(existingUser);
    if (login.status === "error" || !login.data) {
      return res.status(403).json({ message: login.message });
    }
    const { accessToken, refreshToken } = login.data.tokens;
    //sending token in authorization token
    res.cookie("access_token", accessToken, {
      httpOnly: true, // Prevents access to the cookie via JavaScript
      secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
      sameSite: "None", // Prevents CSRF attacks
      maxAge: 1000 * 60 * 60 * 24 * 1, // Set the max age for the refresh token (e.g., 30 days)
    });

    // Set refresh token cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true, // Prevents access to the cookie via JavaScript
      secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
      sameSite: "None", // Prevents CSRF attacks
      maxAge: 1000 * 60 * 60 * 24 * 7, // Set the max age for the refresh token (e.g., 30 days)
    });
    res.header("Authorization", `Bearer ${login.data.sessionId}`);
    // return res.redirect(`${process.env.CLIENT_BASE_URL}/dashboard/home`)
    return res.redirect(`${process.env.CLIENT_BASE_URL}/auth/signup`);
  } catch (err: any) {
    console.log(err);
    return res.redirect(`${process.env.CLIENT_BASE_URL}/auth/signup`);
  }
};
