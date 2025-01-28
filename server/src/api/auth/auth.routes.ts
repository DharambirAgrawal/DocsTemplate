import express from "express";
import passport from "passport";
import { catchAsync } from "../../errors/catchAsync";
import { register,resendEmailVerification,verifyEmail,forgotPassword,login,logout,resetPassword,suspendAccount,checkresetPasswordToken } from "./auth.controller";
import { googleRegister } from "./google.controller";
import { verifyRefreshTokenMiddleware,verifyAccessTokenMiddleware } from "./auth.middleware";
import { getUser, updateUser } from "./admin.controller";
const AuthRouter = express.Router();


export const authRouter = AuthRouter
.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))
.get("/google/callback",passport.authenticate("google", { failureRedirect: "/" }),googleRegister )

.post("/register", catchAsync(register))
.get("/register/:token", catchAsync(verifyEmail))

.post("/login",verifyRefreshTokenMiddleware,catchAsync(login))

.post("/resend-email", catchAsync(resendEmailVerification))
.post("/forget-password",catchAsync(forgotPassword) )  
.post("/reset-password",catchAsync(resetPassword))
.get("/reset-password/:token",catchAsync(checkresetPasswordToken))   //static file for reset password

.get("/suspend-account/:token",catchAsync(suspendAccount))
.get("/logout",catchAsync(logout))

.get("/get-access-token", verifyRefreshTokenMiddleware)

// Admin routes

.get("/users",verifyAccessTokenMiddleware ,catchAsync( getUser))
.post("/update-user/:userId",verifyAccessTokenMiddleware,catchAsync( updateUser))

