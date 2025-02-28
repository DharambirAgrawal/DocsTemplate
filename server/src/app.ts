// // src/server.ts
// import cors from "cors";
// import multer from "multer";

// import dotenv from "dotenv";
// import { passportInitialize } from "./services/passportService";
// import { passportMiddleware } from "./middlewares/passportMiddleware";
// import cookieSession from "cookie-session";
// dotenv.config();
// import express from "express";
// import { logger } from "./utils/logger";
// import cookieParser from "cookie-parser";
// import { connectDB } from "./services/MongoDBService";
// import routes from "./routes";
// const app = express();
// const storage = multer.memoryStorage();
// connectDB();

// // Middleware to initialize passport and handle session
// app.use(cors({
//   credentials: true, // Allow sending cookies along with the request

// }));
// app.use(logger);
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["key1", "key2"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );
// passportInitialize(app);
// app.use(passportMiddleware);

// export const upload = multer({
//   limits: {
//     fileSize: 30 * 1024 * 1024, // 10 MB (adjust as needed)
//   },
//   storage: storage,
// });
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// routes(app);

// export default app;
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { passportInitialize } from "./services/passportService";
import { passportMiddleware } from "./middlewares/passportMiddleware";
import cookieSession from "cookie-session";
import express from "express";
import { logger } from "./utils/logger";
import cookieParser from "cookie-parser";
import { connectDB } from "./services/MongoDBService";
import routes from "./routes";
import "./services/updateSessions";

dotenv.config();

const app = express();
connectDB();

// Configure multer storage (in-memory storage in this case)
export const upload = multer({});

// Middleware to initialize passport and handle session
app.use(
  cors({
    credentials: true, // Allow sending cookies along with the request
  })
);
app.use(logger);
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

passportInitialize(app);
app.use(passportMiddleware);

// Multer should be first to handle file uploads

// Now handle URL-encoded and JSON body parsing
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing form data (if needed)

// Other middlewares
app.use(cookieParser());

// Define routes after middleware configuration
routes(app);

export default app;
