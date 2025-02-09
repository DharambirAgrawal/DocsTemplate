import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import { subscribeToNewsletter } from "./newsletter.controller";

const UserRouter = express.Router();

export const userRouter = UserRouter.post(
  "/newsletter/subscribe",
  catchAsync(subscribeToNewsletter)
);
