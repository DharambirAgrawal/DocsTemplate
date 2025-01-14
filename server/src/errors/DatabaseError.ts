// utils/errors/DatabaseError.ts
import { Error as MongooseError } from 'mongoose';
import { AppError } from './AppError';

export class DatabaseError extends AppError {
  public readonly isDatabaseError: boolean;

  constructor(
    message: string,
    metadata?: Record<string, any>,
    statusCode: number = 500
  ) {
    super(message || 'Database Error', statusCode, metadata);
    this.isDatabaseError = true;
  }

  static handleMongooseError(error: any): DatabaseError {
    if (error instanceof MongooseError.ValidationError) {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return new DatabaseError('Validation Error', {
        errors: validationErrors,
      }, 400);
    }

    if (error instanceof MongooseError.CastError) {
      return new DatabaseError(`Invalid ${error.path}: ${error.value}`, {
        path: error.path,
        value: error.value,
      }, 400);
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return new DatabaseError(`Duplicate field value: ${field}`, {
        field,
        value: error.keyValue[field],
      }, 400);
    }

    return new DatabaseError('Database Error', {
      originalError: error.message,
    });
  }
}