import { Request, Response, NextFunction } from 'express';

// Define the logger middleware with proper types
export const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Request made to ${req.path}`);
  next();
};
