// utils/errors/ValidationError.ts
import { AppError } from "./AppError";
export class ValidationError extends AppError {
    public readonly errors: string[];
    public readonly isValidationError: boolean;
  
    constructor(errors: string[]) {
      super('Validation Error', 400);
      this.errors = errors;
      this.isValidationError = true;
    }
  }
  