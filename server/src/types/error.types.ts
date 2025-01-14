
export interface IAppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    metadata?: Record<string, any>;
  }