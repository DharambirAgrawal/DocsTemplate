import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors/AppError';
import { validateEmail,validatePassword } from '../../utils/utils';
import { decodeToken } from '../../utils/jwtUtils';
import { catchAsync } from '../../errors/catchAsync';
import User from '../../models/auth/user.model';
import { SendEmailVerificationEmail } from './auth.helper';
import { verifyEmailPayload } from '../../config/tokenPayload';

/**
 * Registers a new user.
 * 
 * @param {Request} req - The request object containing the user data.
 * @param {Response} res - The response object to send back the result.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @throws {AppError} - Throws an error if validation or user creation fails.
 */
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName,lastName, email, password } = req.body;

  // Validate input fields
  if (!firstName || !lastName || !email || !password) {
    throw new AppError('Resource not found', 400);
  }

  // Validate email format
  if (!validateEmail(email)) {
    throw new AppError('Invalid Email!', 400);
  }

  // Validate password strength
  if (!validatePassword(password)) {
    throw new AppError('Invalid Password!', 400);
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError('User already Exists', 400);
  }
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password
  });

    if (!newUser) {
        throw new AppError('Server Error, Try again!', 500);
    }

  res.status(200).json({
    status: 'success',
    message: 'User registered successfully',
  });
 await SendEmailVerificationEmail({email})
});

/**
 * Verifies the email based on the provided token.
 * 
 * @param {Request} req - The request object containing the verification token in the URL params.
 * @param {Response} res - The response object to render the success message.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @throws {AppError} - Throws an error if the token is invalid or verification fails.
 */
export const verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.params;

  // Validate token
  if (!token) {
    throw new AppError('Resource not found', 400);
  }

  // Decode the token to get the email and type
  const { email, type } = decodeToken(token, process.env.VERIFY_EMAIL_SECRET || '');

  if (!email || type !== verifyEmailPayload.type) {
    throw new AppError('Server Error, Try again!', 500);
  }

const updatedUser=await User.findOneAndUpdate({ email,verificationToken: token },{
    isEmailVerified: true,
    verificationToken: null,
    accountStatus: "ACTIVE",
})

  if (!updatedUser) {
    throw new AppError('Server Error, Try again!', 500);
  }

 res.status(200).json({
    status: 'success',
    message: 'Email verified successfully',
  });
});

export const resendEmailVerification = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    throw new AppError('Resource not found', 400);
  }


  // Check if the user exists
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError('User does not exist', 400);
  }

  // Check if the email is already verified
  if (existingUser.isEmailVerified) {
    throw new AppError('Email is already verified', 400);
  }

  // Send the verification email
  await SendEmailVerificationEmail({ email });

  res.status(200).json({
    status: 'success',
    message: 'Verification email sent successfully',
  });
});