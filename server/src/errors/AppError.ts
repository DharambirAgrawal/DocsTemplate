// utils/errors/AppError.ts
import { IAppError } from "../types/error.types";
export class AppError extends Error implements IAppError {
    public readonly statusCode: number;
    public readonly status: string;
    public readonly isOperational: boolean;
    public readonly metadata?: Record<string, any>;
  
    constructor(message: string, statusCode: number, metadata?: Record<string, any>) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      this.metadata = metadata;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }