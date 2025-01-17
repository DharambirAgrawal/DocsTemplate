import { sendEmail } from "../../services/emailService";
import {
  VERIFY_EMAIL_MESSAGE,
  SUBSCRIPTION_MESSAGE,
} from "../../utils/EmailMessages";
import { AppError } from "../../errors/AppError";
import { validateEmail } from "../../utils/utils";
import { generateToken } from "../../utils/jwtUtils";
import { verifyEmailPayload ,unsubscribeNewsletterPayload} from "../../config/tokenPayload";
import User from "../../models/auth/user.model";
import Newsletter,{SubscribeStatusType } from "../../models/user/NewsLetter";

export const SendEmailVerificationEmail = async ({
  email,
  subscribe
}: {
  email: string;
  subscribe:"true" | "false" | "null";
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

export const subscribetoNewsletter = async ({
  email,
  subscribe,
  status
}: {
  email: string;
  subscribe: boolean;
  status: SubscribeStatusType;
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
    ...unsubscribeNewsletterPayload,
    email: email,
  };

  const existingUser = await Newsletter.findOne({ email });

  if( existingUser && existingUser.status == "ACTIVE" ){
    return
  }

  let subscribeUser;
  const Unsubscribetoken = generateToken(payload, process.env.JWT_TOKEN_SECRET, 60*24*365*5);
  if (existingUser) {
    subscribeUser = await Newsletter.findOneAndUpdate(
      { email },
      {  
        unsubscribeToken: Unsubscribetoken,
      status: subscribe? status: "INACTIVE",
      }
    );
  } else {
    subscribeUser = await Newsletter.create({
      email,
      unsubscribeToken: Unsubscribetoken,
      status: subscribe? status: "INACTIVE",
    });
  }
  if (subscribe) {
    await sendEmail({
      TO: email,
      message: SUBSCRIPTION_MESSAGE(Unsubscribetoken),
    });
  }
  if (!subscribeUser) {
    return {
      status: "error",
    };
  }

  return {
    status: "success",
    token: Unsubscribetoken,
  };
};
