import express from "express";
import { register,resendEmailVerification,verifyEmail } from "./auth.controller";

const AuthRouter = express.Router();



export const authRouter = AuthRouter
.post("/register", register)
.get("/register/:token", verifyEmail)
.post("/resend/email", resendEmailVerification)
// .post("/login",loginMiddleware,login)
// .post("/forgetpassword",forgotPassword )  
// .get("/resetpassword/:token",resetPasswordUi)   //static file for reset password
// .post("/reset/password",resetPassword)
// .get("/suspend/user/:token",suspendAccount)
// .get("/logout",logout)

