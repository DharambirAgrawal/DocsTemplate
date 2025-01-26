import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../errors/catchAsync";
import { AppError } from "../../errors/AppError";
import {generateToken, decodeToken } from "../../utils/jwtUtils";
import { accessTokenPayload, refreshTokenPayload } from "../../config/tokenPayload";
import Session from "../../models/auth/sesssion.model";


export const verifyRefreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken || refreshToken == undefined) {
      return next();
    }
    const { type, sessionId, email } = await decodeToken(
      refreshToken,
      process.env.JWT_TOKEN_SECRET
    );
    if (type != refreshTokenPayload.type) {
      throw new AppError("Invalid request", 404);
    }
    const session = await Session.findOne({ sessionId }).populate("userId"); // Populate the user data from the `userId` field in the session

    if (!session) {
      throw new AppError("Session not found", 404);
    }
    if (
      session.userId.email != email ||
      session.userId.accountStatus != "ACTIVE" ||
      session.isRevoked ||
      session.expiresAt <= new Date() ||
      !session.userId.isEmailVerified
    ) {
      await session.deleteOne();
      throw new AppError("Invalid request", 404);
    }
    //    console.log(email,role,type);
    let accessToken= session.accessToken

    try{
      const { type, sessionId, email } = await decodeToken(
        accessToken,
        process.env.JWT_TOKEN_SECRET
      );
      if (type != accessTokenPayload.type || sessionId != session.sessionId || email != session.userId.email) {
        throw new AppError("Invalid request", 404);
      }
    }catch(err){
      const payload = {
        sessionId: sessionId,
        email: email,
      };
      accessToken = generateToken(
        { ...accessTokenPayload, ...payload },
        process.env.JWT_TOKEN_SECRET,
        60 * 24
      ); // 1 days
      session.accessToken = accessToken;
      await session.save();
    }

    res.cookie("access_token", accessToken, {
      httpOnly: true, // Prevents access to the cookie via JavaScript
      secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 1000 * 60 * 60 * 24 * 7, // Set the max age for the refresh token (e.g., 30 days)
    });
    
    return res.json({
      status: "success",
      data: {
        email,
        role: session.userId.role,
      },
    });
  }
);

export const verifyAccessToken = 
  async (accessToken: string) => {
   
    const { type, sessionId, email } = await decodeToken(
      accessToken,
      process.env.JWT_TOKEN_SECRET
    );
    if (type != accessTokenPayload.type) {
      throw new AppError("Invalid request", 401);
    }
    const session = await Session.findOne({ sessionId }).populate("userId"); // Populate the user data from the `userId` field in the session

    if (!session) {
      throw new AppError("Session not found", 404);
    }
    if (
      session.userId.email != email ||
      session.userId.accountStatus != "ACTIVE" ||
      session.isRevoked ||
      session.expiresAt <= new Date() ||
      !session.userId.isEmailVerified
    ) {
      await session.deleteOne();
      throw new AppError("Invalid request", 404);
    }
    
    return session.userId;
  }

