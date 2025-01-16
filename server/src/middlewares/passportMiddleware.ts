import { Request, Response, NextFunction } from "express";

// The passport middleware that ensures session has regenerate and save methods
export const passportMiddleware = (request: Request, response: Response, next: NextFunction) => {
  if (request.session) {
    // If regenerate method does not exist, define it
    if (!request.session.regenerate) {
      request.session.regenerate = (cb: () => void) => {
        // You can add custom logic here for session regeneration if needed
        cb();
      };
    }

    // If save method does not exist, define it
    if (!request.session.save) {
      request.session.save = (cb: () => void) => {
        // You can add custom logic here for session saving if needed
        cb();
      };
    }
  }

  next();
};
