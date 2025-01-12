import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
export const testServer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({
      message: "Server is up and running",
    });
  
}