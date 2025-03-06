import { Request, Response } from "express";
import Course from "../../models/courses/course";
import { AppError } from "../../errors/AppError";
import CourseContent from "../../models/courses/content";

export const getPublicCourses = async (req: Request, res: Response) => {
  const courses = await Course.find({
    status: "PUBLISHED",
  }).select("title slug description duration level category metaData");
  res.status(200).json({
    success: true,
    data: courses,
  });
};

export const getPublicCourse = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { type } = req.query as { type: "content" | "slug" };
  let data;

  if (type === "slug") {
    data = await Course.findOne({
      slug,
      status: "PUBLISHED",
    })
      .select("slug -_id contentGroups")
      .populate({
        path: "contentGroups.sections", // Populate sections within each content group
        model: "CourseContent", // The model to use for the sections
        select: "slug -_id order title",
      });
    data = data?.contentGroups;
  } else if (type == "content") {
    if (!slug) {
      throw new AppError("Slug is required", 400);
    }
    data = await CourseContent.findOne({ slug }).select(
      "title slug content metaData"
    );
  } else {
    throw new AppError("Invalid type", 400);
  }

  if (!data) {
    throw new AppError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    data: data,
  });
};
