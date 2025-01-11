import asyncHandler from "express-async-handler";
import { AppError } from "../errors/AppError.js";
import { validateEmail } from "../utils/utils.js";
import { SUBSCRIPTION_MESSAGE } from "../messages/emailMessage.js";
import { sendEmail } from "../services/emailService.js";
import { prisma } from "../../app.js";
import { SUBSCRIPTION_PAYLOAD } from "../utils/payload.js";
import { decodeToken, generateToken } from "../utils/jwtUtils.js";

export const subscribeUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError("Resource not found", 400);
  }
  if (!validateEmail(email)) {
    throw new AppError("Please enter valid email", 400);
  }

  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      email: email,
    },
  });

  if (existingSubscription && existingSubscription.status === "ACTIVE") {
    throw new AppError("User already subscribed", 400);
  }

  if (existingSubscription && existingSubscription.status === "INACTIVE") {
    const unSubscribeToken = generateToken(
      SUBSCRIPTION_PAYLOAD(email),
      process.env.JWT_TOKEN_SECRET,
      null
    );
    const updatedSubscription = await prisma.subscription.update({
      where: {
        id: existingSubscription.id,
      },
      data: {
        status: "ACTIVE",
        unsubscribeToken: unSubscribeToken,
      },
    });
    if (!updatedSubscription) {
      throw new AppError("Error subscribing user", 500);
    }
    await sendEmail(email, SUBSCRIPTION_MESSAGE(unSubscribeToken));
    res.status(200).json({ message: "Subscribed successfully" });
  }
  const unSubscribeToken = generateToken(
    SUBSCRIPTION_PAYLOAD(email),
    process.env.JWT_TOKEN_SECRET,
    null
  );
  const subscription = await prisma.subscription.create({
    data: {
      email: email,
      status: "ACTIVE",
      unsubscribeToken: unSubscribeToken,
    },
  });
  if (!subscription) {
    throw new AppError("Error subscribing user", 500);
  }

  await sendEmail(email, SUBSCRIPTION_MESSAGE(unSubscribeToken));

  res.status(200).json({ message: "Subscribed successfully" });
});

// TODO: Implement the usSubscribeUser controller function to subscribe a user to the newsletter using the SendGrid API. The function should send a POST request to the SendGrid API with the user's email address and return a success message if the subscription is successful. If the subscription fails, the function should return an error message.
export const unSubscribeUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) {
    throw new AppError("Resource not found", 400);
  }
  const { email } = decodeToken(token, process.env.JWT_TOKEN_SECRET);
  const subscription = await prisma.subscription.findFirst({
    where: {
      email: email,
      unsubscribeToken: token,
    },
  });
  if (!subscription) {
    throw new AppError("Invalid token", 400);
  }
  const updatedSubscription = await prisma.subscription.update({
    where: {
      id: subscription.id,
    },
    data: {
      status: "INACTIVE",
      unsubscribeToken: null,
    },
  });
  if (!updatedSubscription) {
    throw new AppError("Error unsubscribing user", 500);
  }
  res.status(200).json({ message: "Unsubscribed successfully" });
});
