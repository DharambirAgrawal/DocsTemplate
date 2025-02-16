import Tag from "../../models/blog/TagModel";
import { Request, Response } from "express";

export const getTags = async (req: Request, res: Response) => {
  const tags = await Tag.find({}).sort({ name: 1 }).select("-_id -__v -posts");
  if (!tags) {
    throw new Error("No tags found");
  }
  return res.status(200).json({
    success: true,
    data: tags,
  });
};
