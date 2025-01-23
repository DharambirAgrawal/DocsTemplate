import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
export const testServer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.cookie("access_token", "access----------1------2-3", {
    // httpOnly: true, // Prevents access to the cookie via JavaScript
    secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
    sameSite: "none", // Prevents CSRF attacks
    maxAge: 1000 * 60 * 60 * 24 * 1, // Set the max age for the refresh token (e.g., 30 days)
  });

  // Set refresh token cookie
  res.cookie("refresh_token", "Refrehh-------------------1------1", {
    // httpOnly: true, // Prevents access to the cookie via JavaScript
    secure: process.env.NODE_ENV === "PRODUCTION", // Only send over HTTPS in production
    sameSite: "none", // Prevents CSRF attacks
    maxAge: 1000 * 60 * 60 * 24 * 7, // Set the max age for the refresh token (e.g., 30 days)
  });
  res.header("Authorization", `Bearer ''sessionocvbo12323423948723948`);
    res.status(200).json({
      message: "Server is up and running",
    });
  
}