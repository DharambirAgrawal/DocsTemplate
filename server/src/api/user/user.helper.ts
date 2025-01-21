import { sendEmail } from "../../services/emailService";
import { SUBSCRIPTION_MESSAGE } from "../../utils/EmailMessages";
import { AppError } from "../../errors/AppError";
import { validateEmail } from "../../utils/utils";
import { generateToken } from "../../utils/jwtUtils";
import { unsubscribeNewsletterPayload } from "../../config/tokenPayload";
import Newsletter, { SubscribeStatusType } from "../../models/user/NewsLetter";

export const subscribetoNewsletter = async ({
  email,
  subscribe,
  status,
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

  if (existingUser && existingUser.status == "ACTIVE") {
    return {
        status: "success",
        message: "Already subscribed to newsletter",
    }
  }

  let subscribeUser;
  const Unsubscribetoken = generateToken(
    payload,
    process.env.JWT_TOKEN_SECRET,
    60 * 24 * 365 * 5
  );
  if (existingUser) {
    subscribeUser = await Newsletter.findOneAndUpdate(
      { email },
      {
        unsubscribeToken: Unsubscribetoken,
        status: subscribe ? status : "INACTIVE",
      }
    );
  } else {
    subscribeUser = await Newsletter.create({
      email,
      unsubscribeToken: Unsubscribetoken,
      status: subscribe ? status : "INACTIVE",
    });
  }

  const link = `${process.env.BASE_URL}/user/unsubscribe?token=${Unsubscribetoken}`;
  if (subscribe) {
    await sendEmail({
      TO: email,
      message: SUBSCRIPTION_MESSAGE(link),
    });
  }
  if (!subscribeUser) {
    return {
      status: "error",
    };
  }

  return {
    status: "success",
    message: "Subscribed to newsletter",
  };
};
