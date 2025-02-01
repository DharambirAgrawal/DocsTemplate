import { ServerActionResponse } from "@/types/errors";
import { AppError } from "@/types/errors";

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Please sign in to continue",
  FORBIDDEN: "You don't have permission to perform this action",
  NOT_FOUND: "The requested resource was not found",
  VALIDATION: "Please check your input and try again",
  SERVER_ERROR: "Something went wrong. Please try again later",
  NETWORK_ERROR: "Connection error. Please check your internet connection",
} as const;

// Server-side error handler
export async function handleServerError(error: unknown): Promise<ServerActionResponse> {
  console.error('Server Action Error:', error);

  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
      },
    };
  }

  if (error instanceof Error) {
    if (error.name === 'ValidationError') {
      return {
        success: false,
        error: {
          message: ERROR_MESSAGES.VALIDATION,
          code: 'VALIDATION_ERROR',
        },
      };
    }

    if (error.message.includes('Authentication')) {
      return {
        success: false,
        error: {
          message: ERROR_MESSAGES.UNAUTHORIZED,
          code: 'UNAUTHORIZED',
        },
      };
    }
  }

  return {
    success: false,
    error: {
      message: ERROR_MESSAGES.SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
    },
  };
}


export function asyncErrorHandler<T extends (...args: any[]) => Promise<ServerActionResponse>>(fn: T) {
  return async function (...args: Parameters<T>): Promise<ServerActionResponse> {
    try {
      const response = await fn(...args);
      return response;
    } catch (error) {
      return handleServerError(error);
    }
  };
}

