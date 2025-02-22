import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import Profile from "../../models/user/ProfileModel";
export const getProfile = async (req: Request, res: Response) => {
  const role = (req as any).role;
  const userId = (req as any).userId;
  console.log(userId);

  const profile = await Profile.findOne({ userId: userId }).select(
    "firstName lastName email image bio -_id"
  );
  if (!profile) {
    throw new AppError("Not Authorized to get the posts", 400);
  }
  return res.json({
    success: true,
    data: profile,
  });
};
