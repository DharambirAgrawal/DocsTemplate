// src/server.ts
import cors from "cors";
import express, { Request, Response, NextFunction } from "express"; // Adding types for express
import { errorHandler, AppError } from "./src/errors/index"; // Removed .js as the file is likely a TS file
import { logger } from "./src/utils/logger"; // Removed .js as the file is likely a TS file
import cookieParser from "cookie-parser";

const app = express();

// Connect DB


// Middleware
// app.use(cors({
//   origin: 'https://your-nextjs-app.com', // Allow only your front-end domain
//   credentials: true,  // Allow cookies to be sent
// }));

import multer from "multer";
const upload = multer({}); // Middleware for handling file uploads

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
import { authRouter } from "./src/routes/authRoutes"; // Removed .js as the file is likely a TS file
import { postRouter } from "./src/routes/dashboardRoutes"; // Removed .js as the file is likely a TS file
import {
  publicBlogRouter,
  publicRouter,
  metaDataRouter,
} from "./src/routes/publicRoutes"; // Removed .js as the file is likely a TS file

app.get("/api/health", (req: Request, res: Response): Response => {
  return res.status(200).json({ message: `Server is running` });
});

app.use("/api/auth", authRouter);
app.use("/api/dashboard", upload.any(), postRouter);
app.use("/api/public/blog", publicBlogRouter);
app.use("/api/public/meta", metaDataRouter);
app.use("/api/public", publicRouter);

app.all("*", (req: Request, res: Response, next: NextFunction): void => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

// Global error handling middleware (should be last)
app.use(errorHandler);

export default app;
