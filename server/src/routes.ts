import multer from "multer";
import { Application, Request, Response, NextFunction } from "express";
import { AppError } from "./errors/AppError";
import { errorHandler } from "./middlewares/ErrorHandler";
import { testRouter } from "./api/test/testRoutes";
import { blogRouter } from "./api/blog/blog.routes";
const upload = multer({}); // Middleware for handling file uploads

// Define routes function with proper typing for Express app
const routes = (app: Application): void => {
  // Example route using the upload middleware
  app.use("/api/test", testRouter); 
  app.use("/api/blog", upload.any(), blogRouter);
  // app.use("/api/public/blog", publicBlogRouter);
  
  // app.use("/api/auth", authRouter);
  // app.use("/api/public/meta", metaDataRouter);
  // app.use("/api/public", publicRouter);

  // Catch-all for undefined routes with AppError
  app.all("*", (req: Request, res: Response, next: NextFunction): void => {
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  });

  // Use the error handler middleware
  app.use(errorHandler);
};

export default routes;