import express from "express";
import { catchAsync } from "../../errors/catchAsync";
import { subscribeToNewsletter } from "./newsletter.controller";
import { constactUs } from "./additional.controller";
import { getProfile } from "./profile.controller";
import { verifyAccessTokenMiddleware } from "../auth/auth.middleware";
const UserRouter = express.Router();

export const userRouter = UserRouter.post(
  "/newsletter/subscribe",
  catchAsync(subscribeToNewsletter)
)
  .post("/contact-us", catchAsync(constactUs))
  .get("/profile", verifyAccessTokenMiddleware, catchAsync(getProfile));
