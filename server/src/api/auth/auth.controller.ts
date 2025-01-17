import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import {
  validateEmail,
  validatePassword,
  validateField,
} from "../../utils/utils";
import { decodeToken } from "../../utils/jwtUtils";
import { catchAsync } from "../../errors/catchAsync";
import User from "../../models/auth/user.model";
import {
  SendEmailVerificationEmail,
  subscribetoNewsletter,
} from "./auth.helper";
import { verifyEmailPayload } from "../../config/tokenPayload";
import Newsletter from "../../models/user/NewsLetter";

// ------------------- 1. Register User -------------------
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  }
);

export const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  }
);

export const resendEmailVerification = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    // Check if the email is already verified
    if (existingUser.isEmailVerified) {
      throw new AppError("Email is already verified", 400);
    }

    // Send the verification email
    if(existingNewsletter && existingNewsletter.status == "PENDING"){
    await SendEmailVerificationEmail({ email ,subscribe: 'true'});
    }else{
      await SendEmailVerificationEmail({ email ,subscribe: 'false'});
    }
    res.status(200).json({
      status: "success",
      message: "Verification email sent successfully",
    });
  }
);

// ------------------- 2. Login User -------------------
