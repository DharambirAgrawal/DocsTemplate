// src/server.ts
import cors from "cors";
import dotenv from "dotenv";
import { passportInitialize } from "./services/passportService";
import { passportMiddleware } from "./middlewares/passportMiddleware";
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
app.use(cors({
  credentials: true, // Allow sending cookies along with the request
}));
app.use(logger);
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
passportInitialize(app);
app.use(passportMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

routes(app);

export default app;
