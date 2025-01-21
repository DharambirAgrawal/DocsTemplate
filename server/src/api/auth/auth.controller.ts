import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import mongoose from "mongoose";
import {
  validateEmail,
  validatePassword,
  validateField,
} from "../../utils/utils";
import { decodeToken } from "../../utils/jwtUtils";
import { comparePasswords } from "../../utils/utils";
import User from "../../models/auth/user.model";
import Session from "../../models/auth/sesssion.model";
import { generateToken, generateUniqueId } from "../../utils/jwtUtils";
import {
  SendEmailVerificationEmail,
  sendForgetPasswordEmail,
  passwordChangeEmail,
} from "./auth.helper";
import {subscribetoNewsletter} from "../user/user.helper"
import {
  verifyEmailPayload,
  accessTokenPayload,
  refreshTokenPayload,
  resetPasswordPayload,
  suspendAccountPayload,
} from "../../config/tokenPayload";
import Newsletter from "../../models/user/NewsLetter";

// ------------------- 1. Register User -------------------
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, email, password, subscribe } = req.body;
  // Validate input fields
  validateField(
    ["firstName", "lastName", "email", "password", "subscribe"],
    req.body
  );

  // Validate email format
  if (!validateEmail(email)) {
    throw new AppError("Invalid Email!", 400);
  }

  // Validate password strength
  if (!validatePassword(password)) {
    throw new AppError("Invalid Password!", 400);
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already Exists", 400);
  }
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  if (!newUser) {
    throw new AppError("Server Error, Try again!", 500);
  }

  if (subscribe === "checked") {
    await subscribetoNewsletter({
      email,
      subscribe: true,
      status: "PENDING",
    });
  } else {
    await subscribetoNewsletter({
      email,
      subscribe: false,
      status: "INACTIVE",
    });
  }

  res.status(200).json({
    status: "success",
    message: "User registered successfully",
  });
  await SendEmailVerificationEmail({
    email,
    subscribe: subscribe === "checked" ? "true" : "false",
  });
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.params;

  // Validate token
  if (!token) {
    throw new AppError("Resource not found", 400);
  }

  // Decode the token to get the email and type
  const { email, type, subscribe } = decodeToken(
    token,
    process.env.VERIFY_EMAIL_SECRET || ""
  );

  if (!email || type !== verifyEmailPayload.type || !subscribe) {
    throw new AppError("Unauthorize", 401);
  }

  const updatedUser = await User.findOneAndUpdate(
    { email, verificationToken: token },
    {
      isEmailVerified: true,
      verificationToken: null,
      accountStatus: "ACTIVE",
    }
  );

  if (!updatedUser) {
    throw new AppError("The token is already used.", 500);
  }
  if (subscribe === "true") {
    await subscribetoNewsletter({ email, subscribe: true, status: "ACTIVE" });
  }

  res.status(200).json({
    status: "success",
    message: "Email verified successfully",
  });
};

export const resendEmailVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    throw new AppError("Resource not found", 400);
  }

  // Check if the user exists
  const existingUser = await User.findOne({ email });
  const existingNewsletter = await Newsletter.findOne({ email });

  if (!existingUser) {
    throw new AppError("User does not exist", 400);
  }
  if (existingUser.loginProvider != "EMAIL") {
    throw new AppError(
      `Already loggedin with ${existingUser.loginProvider.toLowerCase}`,
      400
    );
  }

  // Check if the email is already verified
  if (existingUser.isEmailVerified) {
    throw new AppError("Email is already verified", 400);
  }

  // Send the verification email
  if (existingNewsletter && existingNewsletter.status == "PENDING") {
    await SendEmailVerificationEmail({ email, subscribe: "true" });
  } else {
    await SendEmailVerificationEmail({ email, subscribe: "false" });
  }
  res.status(200).json({
    status: "success",
    message: "Verification email sent successfully",
  });
};

// ------------------- 2. Login User -------------------

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: // Add logic to handle remember me
  const { email, password, remember, metaData } = req.body;
  const {
    platform,
    userAgent,
    browser,
    language,
    deviceFingerprint,
    timezoneOffset,
  } = metaData;
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Sometimes x-forwarded-for contains multiple IPs in a comma-separated list, take the first one
  if (Array.isArray(ip)) {
    ip = ip[0];
  }
  validateField(["email", "password", "platform", "userAgent", "browser"], {
    ...metaData,
    ...req.body,
  });
  //validating email
  if (!validateEmail(email)) {
    throw new AppError("Invalid Email!", 400);
  }

  //finding user
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  if (existingUser.loginProvider != "EMAIL") {
    throw new AppError(
      `Already loggedin with ${existingUser.loginProvider.toLowerCase()}`,
      400
    );
  }
  // Check accountStatus & Check lockoutUntil
  if (
    existingUser.accountStatus === "INACTIVE" ||
    existingUser.accountStatus == "SUSPENDED"
  ) {
    const resetMessage = await sendForgetPasswordEmail(email);
    if (resetMessage.status != "success") {
      throw new AppError("Server Error", 500);
    }

    return res.status(403).json({
      status: "failed",
      message: "Account Suspended Reset password!",
    });
  }

  // Resend Email to verify email (resend)
  if (existingUser.accountStatus == "PENDING") {
    const verifyEmail = await fetch(
      `${process.env.BASE_URL}/api/auth/resend-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          body: JSON.stringify({ email: email }),
        },
      }
    );
    if (!verifyEmail.ok) {
      throw new AppError("Server Error", 500);
    }
    return res.status(401).json({
      status: "error",
      message: "Verification email sent",
    });
  }

  // Check for lockout status
  if (
    existingUser.lockoutUntil &&
    existingUser.lockoutUntil.getTime() > Date.now()
  ) {
    return res.status(403).json({
      status: "failed",
      message: "Try again in 15 minutes",
    });
  }
  //Compare password
  const iscorrect = await comparePasswords(password, existingUser.password);

  if (!iscorrect) {
    if (existingUser.failedLoginAttempts < 10) {
      await User.findOneAndUpdate(
        { email },
        {
          failedLoginAttempts: existingUser.failedLoginAttempts + 1,
        }
      );
    } else if (existingUser.failedLoginAttempts <= 20) {
      await User.findOneAndUpdate(
        { email },
        {
          failedLoginAttempts: existingUser.failedLoginAttempts + 1,
          lockoutUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        }
      );
    } else {
      // for greater then 10 and less than 20
      await User.findOneAndUpdate(
        { email },
        {
          failedLoginAttempts: existingUser.failedLoginAttempts + 1,
          accountStatus: "SUSPENDED",
          lockoutUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
        }
      );
    }

    return res.status(400).json({
      status: "error",
      message: "Incorrect password!",
    });
  }

  // Create unique sessionId refreshToken, accessToken from email and sessionId
  const sessionId = generateUniqueId();
  const payload = {
    sessionId: sessionId,
    email: email,
  };
  const refreshToken = generateToken(
    { ...refreshTokenPayload, ...payload },
    process.env.JWT_TOKEN_SECRET,
    60 * 24 * 7
  ); // 7 day
  const accessToken = generateToken(
    { ...accessTokenPayload, ...payload },
    process.env.JWT_TOKEN_SECRET,
    60 * 24
  ); // 1 day

  const newSession = new Session({
    userId: existingUser._id, // Reference the user _id
    sessionId: sessionId,
    refreshToken: refreshToken, // Replace with actual logic to generate a refresh token
    accessToken: accessToken, // Replace with actual logic to generate an access token
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set expiration time (e.g., 1 hour from now)
    lastActiveAt: new Date(),
    isRevoked: false,
    metadata: {
      platform: platform,
      userAgent: userAgent,
      browser: browser,
      ip: ip || null,
      deviceFingerprint: deviceFingerprint || null,
      timezoneOffset: timezoneOffset || null,
      language: language || null,
    },
  });

  // Save the session to the database
  const savedSession = await newSession.save();

  if (!savedSession) {
    throw new AppError("Failed to create session", 500);
  }

  // Add this session's _id to the user's sessionIds array
  existingUser.sessionIds.push(savedSession._id as mongoose.Types.ObjectId); // Push the new session's _id
  existingUser.lockoutUntil = undefined;

  existingUser.failedLoginAttempts = 0;

  await existingUser.save();

  if (!savedSession) {
    throw new AppError("Failed to update user", 500);
  }

  //sending token in authorization token
  res.setHeader(
    "Authorization",
    `Bearer ${refreshToken},Bearer ${accessToken}`
  );

  res.status(200).json({
    status: "success",
    data: {
      sessionId: sessionId,
      tokens: { refreshToken, accessToken },
    },
  });
};

// ------------------- 3. ResetPassword -------------------
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const resetMessage = await sendForgetPasswordEmail(email);

  if (resetMessage.status != "success") {
    throw new AppError("Server Error", 500);
  }

  res.json({
    status: "success",
    message: "Password reset email sent",
  });
};

export const checkresetPasswordToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  if (!token) {
    throw new AppError("Resource not found", 400);
  }
  const { email, type } = decodeToken(token, process.env.RESET_PASSWORD_SECRET);
  if (type != resetPasswordPayload.type || !validateEmail(email)) {
    throw new AppError("Invalid token or email", 500);
  }

  const existingUser = await User.findOne({
    email: email,
    resetPasswordToken: token,
  });
  if (!existingUser) {
    throw new AppError("Token expired", 400);
  }

  return res.status(200).json({
    status: "success",
    message: "Token verified",
  });
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // throw new AppError('Password incorr', 500);
  const { password, allLogout } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token || !password) {
    throw new AppError("Resource not found", 400);
  }

  const { email, type } = decodeToken(token, process.env.RESET_PASSWORD_SECRET);

  if (type != resetPasswordPayload.type || !validateEmail(email)) {
    throw new AppError("Invalid token or email", 500);
  }

  //Checking if user exists
  const existingUser = await User.findOne({
    email: email,
    resetPasswordToken: token,
  });
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  if (existingUser.loginProvider != "EMAIL") {
    throw new AppError(
      `Already loggedin with ${existingUser.loginProvider.toLowerCase()}`,
      400
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { email: email, resetPasswordToken: token },
    {
      accountStatus: "ACTIVE",
      resetPasswordToken: null,
      lastPasswordChange: new Date(),
      updatedAt: new Date(),
      resetPasswordExpires: null,
      password: password,
    }
  );

  if (!updatedUser) {
    return next();
  }
  if (allLogout === "checked") {
    await Session.deleteMany({
      userId: updatedUser._id, // Use the updated user's _id
    });

    existingUser.sessionIds = [];
    await existingUser.save();
  }
  await passwordChangeEmail(email, updatedUser.firstName);

  res.status(200).json({
    status: "success",
  });
};

export const suspendAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  if (!token) {
    throw new AppError("Resource not found", 400);
  }
  const { type, email } = decodeToken(
    token,
    process.env.SUSPENDED_ACCOUNT_SECRET
  );

  if (!email || type != suspendAccountPayload.type) {
    throw new AppError("Resource not found", 400);
  }
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      accountStatus: "SUSPENDED",
    }
  );

  if (!updatedUser) {
    throw new AppError("Error Updating user", 500);
  }
  await Session.deleteMany({
    userId: updatedUser._id, // Use the updated user's _id
  });

  res.status(200).send("Account Suspended");
};

// ------------------- 4. Logout -------------------
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new AppError("Invalid request", 404);
  }

  const { email, sessionId, type } = decodeToken(
    token,
    process.env.JWT_TOKEN_SECRET
  );

  if (
    !email ||
    !sessionId ||
    !validateEmail(email) ||
    type != refreshTokenPayload.type
  ) {
    throw new AppError("Invalid request", 404);
  }

  // Delete the session
  await Session.deleteOne({
    sessionId: sessionId,
  });

  res.status(200).json({
    status: "success",
  });
};
