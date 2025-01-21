import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import { decodeToken } from "../../utils/jwtUtils";
import { subscribetoNewsletter } from "./user.helper";
import { unsubscribeNewsletterPayload } from "../../config/tokenPayload";
import Newsletter from "../../models/user/NewsLetter";

export const subscribeToNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body

  const subscribe = await subscribetoNewsletter({
    email,
    subscribe: true,
    status: "ACTIVE",
  });
  if (subscribe?.status != "success") {
    throw new AppError("Error while subscribing to newsletter", 400);
  }
  return res.status(200).json({
    status: "success",
    message: subscribe.message,
  });
};

export const unsubscribeToNewsletter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;

  if (!token) {
    throw new AppError("Invalid token", 400);
  }
  const { email, type } = decodeToken(
    token as string,
    process.env.JWT_TOKEN_SECRET
  ) as any;

  if (type != unsubscribeNewsletterPayload.type) {
    throw new AppError("Invalid token", 400);
  }

  const unSubscribe = await Newsletter.findOneAndUpdate(
    { email: email, unsubscribeToken: token as string },
    {
      status: "INACTIVE",
      unsubscribeToken: null,
    }
  );
  if (!unSubscribe) {
    throw new AppError("Error while unsubscribing to newsletter", 400);
  }

  return res.status(200).json({
    status: "success",
    message: "Unsubscribed to newsletter successfully",
  });
};
