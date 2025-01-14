// src/server.js
// import dotenv from "dotenv";
import cors from "cors";
// dotenv.config();
import express from "express";
import { errorHandler, AppError } from "./src/errors/index.js";
import { logger } from "./src/utils/logger.js";
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";

// Load environment variables

const app = express();

//connect DB
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

// Middleware
// app.use(cors({
//   origin: 'https://your-nextjs-app.com', // Allow only your front-end domain
//   credentials: true,  // Allow cookies to be sent
// }));

import multer from "multer";
const upload = multer({}); //midddleware for handeling file
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//routes
import { authRouter } from "./src/routes/authRoutes.js";
import { postRouter } from "./src/routes/dashboardRoutes.js";
import {
  publicBlogRouter,
  publicRouter,
  metaDataRouter,
} from "./src/routes/publicRoutes.js";
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: `Server is running` });
});
app.use("/api/auth", authRouter);
app.use("/api/dashboard", upload.any(), postRouter);
app.use("/api/public/blog", publicBlogRouter);
app.use("/api/public/meta", metaDataRouter);
app.use("/api/public", publicRouter);

app.all("*", (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

// Global error handling middleware (should be last)
app.use(errorHandler);

export default app;
