// src/server.ts
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cookieSession from "cookie-session";
dotenv.config();
import express from "express";
import { logger } from "./utils/logger";
import cookieParser from "cookie-parser";
import { connectDB } from "./services/MongoDBService";
import routes from "./routes";
const app = express();

connectDB();



// Middleware to initialize passport and handle session
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })

);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);



// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req: any, res: any) => {
      if (!req.user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
  
      // Send tokens as response
      res.cookie("refreshToken", req.user.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
  
      res.json({
        accessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken, // Optional (can be stored in cookies)
      });
    }
  );
  app.post("/auth/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });
  
    try {
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
      const session = await Session.findOne({ userId: decoded.userId, refreshToken, isRevoked: false });
  
      if (!session) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
      }
  
      // Generate a new access token
      const newAccessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.JWT_SECRET!, {
        expiresIn: "15m",
      });
  
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
  });
  

  
  const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
  
  // Usage
  app.get("/api/protected", authenticateJWT, (req, res) => {
    res.json({ message: "Protected content" });
  });
  






routes(app);

export default app;
