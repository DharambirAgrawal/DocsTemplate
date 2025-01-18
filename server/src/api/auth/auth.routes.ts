import express from "express";
import passport from "passport";
import { catchAsync } from "../../errors/catchAsync";
import { register,resendEmailVerification,verifyEmail,forgotPassword,login,logout,resetPassword,suspendAccount } from "./auth.controller";
import { googleLogin } from "./google.controller";
const AuthRouter = express.Router();


export const authRouter = AuthRouter
.get("/google",catchAsync( passport.authenticate('google', { scope: ['profile', 'email'] })))
.get("/google/callback",catchAsync( passport.authenticate("google", { failureRedirect: "/" })),catchAsync(googleLogin) )

.post("/register", catchAsync(register))
.get("/register/:token", catchAsync(verifyEmail))
.post("/resend-email", catchAsync(resendEmailVerification))
.post("/login",catchAsync(login))
.post("/forgetpassword",catchAsync(forgotPassword) )  
// .get("/resetpassword/:token",resetPasswordUi)   //static file for reset password
.post("/reset/password",catchAsync(resetPassword))
.get("/suspend/:token",catchAsync(suspendAccount))
.get("/logout",catchAsync(logout))