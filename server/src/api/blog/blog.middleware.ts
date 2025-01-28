import { verifyAccessToken } from "../auth/auth.helper";
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
//   TODO: Also check for user role only author can publish 

  const {userId, role, status }= await verifyAccessToken(accessToken);
  
  if(status == "error"){
    throw new AppError("Invalid request", 401);
  }

  if(role != "AUTHOR"){
    throw new AppError("Not Authorize to publish", 400);
  }

  const author = await Author.findOne({ userId: userId });

  if (!author) {
    throw new AppError("Invalid request", 404);
  }

  (req as any).author = author._id;
  next();
};
