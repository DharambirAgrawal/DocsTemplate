// src/server.ts
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import express from "express"; 
import { logger } from "./utils/logger";
import cookieParser from "cookie-parser";
import { connectDB } from "./services/MongoDBService";
import routes from "./routes";
const app = express();


connectDB()

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

routes(app);


export default app;
