import mongoose from "mongoose";
import { configMongoDB } from "../config/config";
// Define a function to connect to MongoDB with TypeScript
export const connectDB = (): void => {
  const mongoUri = configMongoDB.uri;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("CONNECTED TO MONGODB");
    })
    .catch((err: any) => {
      console.error("MongoDB connection error:", err);
    });
};
