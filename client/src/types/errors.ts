// types/errors.ts
  export type ServerActionResponse<T = any> = {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
      message: string;
      code?: string;
    };
  };

  export class AppError extends Error {
    constructor(
      message: string,
      public statusCode: number = 400,
      public code?: string
    ) {
      super(message);
      this.name = 'AppError';
    }
  }