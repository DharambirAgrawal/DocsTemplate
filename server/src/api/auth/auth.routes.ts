import express from "express";
import passport from "passport";
import { register,resendEmailVerification,verifyEmail } from "./auth.controller";
import { googleLogin } from "./google.controller";
const AuthRouter = express.Router();


export const authRouter = AuthRouter
.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))
.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),googleLogin )

.post("/register", register)
.get("/register/:token", verifyEmail)
.post("/resend-email", resendEmailVerification)
// .post("/login",loginMiddleware,login)
// .post("/forgetpassword",forgotPassword )  
// .get("/resetpassword/:token",resetPasswordUi)   //static file for reset password
// .post("/reset/password",resetPassword)
// .get("/suspend/user/:token",suspendAccount)
// .get("/logout",logout)