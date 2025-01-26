import { verifyAccessToken } from "../auth/auth.middleware";
import { AppError } from "../../errors/AppError";
import { Request, Response, NextFunction } from "express";
import Author from "../../models/blog/AuthorModel";

export const verifyAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  if (!accessToken || accessToken == undefined) {
    throw new AppError("Invalid request", 401);
  }

  const userId = await verifyAccessToken(accessToken);
  if (!userId) {
    throw new AppError("Invalid request", 401);
  }

  const author = await Author.findOne({ userId: userId });

  if (!author) {
    throw new AppError("Invalid request", 404);
  }

  (req as any).author = author._id;
  next();
};
