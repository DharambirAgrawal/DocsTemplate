// server.ts
import dotenv from "dotenv";
import app from "./app"; // Assuming you have app.ts or app.js
import { Server } from "http";

// Load environment variables from .env file
dotenv.config();

// Get the PORT value from the environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and log the running status
const server: Server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on: http://localhost:${PORT}`
  );
});

// Handle uncaught exceptions (errors that are not caught by any try/catch block)
process.on("uncaughtException", (err: Error) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1); // Exit the process with an error code
});

// Handle unhandled promise rejections (promise rejections that aren't handled)
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1); // Exit after closing the server gracefully
  });
});

// Graceful shutdown when SIGTERM is received (e.g., when the app is terminated)
// process.on("SIGTERM", () => {
//   console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
//   server.close(() => {
//     console.log("💥 Process terminated!");
//   });
// });
