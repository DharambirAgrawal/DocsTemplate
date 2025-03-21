import { sendEmail } from "../../services/emailService";
import {
  VERIFY_EMAIL_MESSAGE,
  FORGET_PASSWORD_MESSAGE,
  PASSWORD_CHANGE_SUCCESSFUL_MESSAGE,
} from "../../utils/EmailMessages";
import { AppError } from "../../errors/AppError";
import { validateEmail } from "../../utils/utils";
import { generateToken ,decodeToken} from "../../utils/jwtUtils";
import Session from "../../models/auth/sesssion.model";
import {
  verifyEmailPayload,
  resetPasswordPayload,
  suspendAccountPayload,
  accessTokenPayload
} from "../../config/tokenPayload";
import User from "../../models/auth/user.model";


export const SendEmailVerificationEmail = async ({
  email,
  subscribe,
}: {
  email: string;
  subscribe: "true" | "false" | "null";
}) => {
  if (!email) {
    throw new AppError("Resource not found", 400);
  }

  //validating email
  if (!validateEmail(email)) {
    throw new AppError("Invalid Email!", 400);
  }

  //Checking if user exists
  const payload = {
    ...verifyEmailPayload,
    email: email,
    subscribe: subscribe,
  };
  const token = generateToken(payload, process.env.VERIFY_EMAIL_SECRET, 15);

  const updateUser = await User.findOneAndUpdate(
    { email },
    {
      verificationToken: token,
      isVerified: false,
    }
  );

  const link = `${process.env.BASE_URL}/api/auth/register/${token}`;
  await sendEmail({ TO: email, message: VERIFY_EMAIL_MESSAGE({ link: link }) });

  console.log(link);
  if (!updateUser) {
    throw new AppError("Server Error Try again!", 500);
  }

  return {
    status: "success",
    message: "Verification email sent successfully",
  };
};


export const sendForgetPasswordEmail = async (email: string) => {
  if (!email) {
    throw new AppError("Resource not found", 400);
  }

  //validating email
  if (!validateEmail(email)) {
    throw new AppError("Invalid Email!", 400);
  }

  //Checking if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  if(user.loginProvider != "EMAIL"){
    throw new AppError(`Already loggedin with ${user.loginProvider.toLowerCase()}`, 400);
  }

  const payload = {
    ...resetPasswordPayload,
    email: email,
  };
  const forgetPasswordToken = generateToken(
    payload,
    process.env.RESET_PASSWORD_SECRET,
    10
  ); //expires in 10min
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      resetPasswordToken: forgetPasswordToken,
      resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000),
    }
  );

  if (!updatedUser) {
    throw new AppError("User not found!", 404);
  }

  const link = `${process.env.CLIENT_BASE_URL}/auth/forgot-password/${forgetPasswordToken}`;

  await sendEmail({
    TO: email,
    message: FORGET_PASSWORD_MESSAGE({
      link: link,
      name: updatedUser.firstName,
    }),
  });

  return {
    status: "success",
    message: "Password reset link sent successfully",
  };
};

export const passwordChangeEmail = async (email: string, name: string) => {
  const payload = {
    ...suspendAccountPayload,
    email: email,
  };
  const suspendToken = generateToken(
    payload,
    process.env.SUSPENDED_ACCOUNT_SECRET,
    60 * 2
  );

  const link = `${process.env.BASE_URL}/api/auth/suspend-account/${suspendToken}`;

  await sendEmail({
    TO: email,
    message: PASSWORD_CHANGE_SUCCESSFUL_MESSAGE({ link: link, name: name }),
  });
  return {
    status: "success",
    message: "Password changed successfully",
  };
};


export const verifyAccessToken = async (accessToken: string) => {

  try {
    const { } =  decodeToken(
      accessToken,
      process.env.JWT_TOKEN_SECRET
    );
    
  } catch (err) {
    return {
      status: "error",
      message: "Invalid token",
    }
  }
   const { type, sessionId, email } = await decodeToken(
    accessToken,
    process.env.JWT_TOKEN_SECRET
  );
  if (type != accessTokenPayload.type) {
    throw new AppError("Invalid request", 401);
  }
  const session = await Session.findOne({ sessionId }).populate("userId"); // Populate the user data from the `userId` field in the session

  if (!session) {
    throw new AppError("Session not found", 404);
  }
  if (
    session.userId.email != email ||
    session.userId.accountStatus != "ACTIVE" ||
    session.isRevoked ||
    session.expiresAt <= new Date() ||
    !session.userId.isEmailVerified
  ) {
    await session.deleteOne();
    throw new AppError("Invalid request", 404);
  }

  return {
    status: "success",
    userId: session.userId.userId,
    email: session.userId.email,
    role: session.userId.role,
  }
};