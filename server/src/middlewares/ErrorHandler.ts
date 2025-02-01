// middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { DatabaseError } from '../errors/DatabaseError';
import { ValidationError } from '../errors/ValidationError';
interface ErrorResponse {
  status: string;
  message: string;
  metadata?: Record<string, any>;
  stack?: string;
  errors?: string[];
  success: boolean;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Handle Mongoose Errors
  if (err.name === 'MongooseError' || err.name === 'ValidationError' || err.name === 'CastError') {
    err = DatabaseError.handleMongooseError(err);
  }

  const statusCode = (err as AppError).statusCode || 500;
  const status = (err as AppError).status || 'error';
  const isOperational = (err as AppError).isOperational || false;

  const errorResponse: ErrorResponse = {
    status,
    success: false,
    message: err.message,
  };

  // Add additional information for development environment
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    errorResponse.stack = err.stack;
    if ((err as DatabaseError).metadata) {
      errorResponse.metadata = (err as DatabaseError).metadata;
    }
    if ((err as ValidationError).errors) {
      errorResponse.errors = (err as ValidationError).errors;
    }
  } else {
    // Production error handling
    if (!isOperational) {
      errorResponse.message = 'Something went wrong!';
    }
    if(statusCode === 500) {
      errorResponse.message = 'Internal Server Error';
    }
  }

  res.status(statusCode).json(errorResponse);
};
