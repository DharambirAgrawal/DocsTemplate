import { Request, Response } from "express";
import Course from "../../models/courses/course";
import { AppError } from "../../errors/AppError";

export const saveOrPublishCourse = async (req: Request, res: Response) => {
  const {
    title,
    description,
    duration,
    level,
    category,
    tags,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = req.body;
  const author = (req as any).author;
  const { publish } = req.query;
  let requiredFields = ["title"]; // Only title is required if not publishing
  if (publish === "true") {
    // Add all other fields as required when publishing
    requiredFields = [
      "title",
      "description",
      "duration",
      "level",
      "category",
      "tags",
      "seoTitle",
      "seoDescription",
      "seoKeywords",
    ];
  }

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  // If the course exists, update it, else create a new one

  // Create a new course
  const newCourse = new Course({
    title,
    description,
    duration,
    level,
    category,
    authorId: [author._id],
    status: publish === "true" ? "PUBLISHED" : "DRAFT",
    metaData: {
      tags,
      seoTitle,
      seoDescription,
      seoKeywords,
    },
  });

  await newCourse.saveSlug();
  await newCourse.save(); // Save new course

  if (!newCourse) {
    throw new AppError("Course not created", 400);
  }

  return res.status(201).json({
    success: true,
    data: {
      slug: newCourse.slug,
    },
  });
};

export const getCourses = async (req: Request, res: Response) => {
  const role = (req as any).role;

  if (role != "ADMIN" && role != "AUTHOR") {
    throw new AppError("Not Authorized to get the posts", 400);
  }
  const courses = await Course.find({
    status: "PUBLISHED",
  })
    .select("-__v -contentGroups -_id")
    .sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    data: courses,
  });
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const role = (req as any).role;

  if (role != "ADMIN") {
    throw new AppError("Not Authorized to delete the post", 400);
  }
  const course = await Course.findOneAndDelete({ slug });
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    data: "Course deleted successfully",
  });
};

export const updateCourse = async (req: Request, res: Response) => {
  const {
    title,
    description,
    duration,
    level,
    category,
    tags,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = req.body;
  const { slug } = req.query;
  const role = (req as any).role;

  if (role != "ADMIN" && role != "AUTHOR") {
    throw new AppError("Not Authorized to update the post", 400);
  }
  const requiredFields = [
    "title",
    "description",
    "duration",
    "level",
    "category",
    "tags",
    "seoTitle",
    "seoDescription",
    "seoKeywords",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  const course = await Course.findOneAndUpdate(
    { slug },
    {
      title,
      description,
      duration,
      level,
      category,
      metaData: {
        tags,
        seoTitle,
        seoDescription,
        seoKeywords,
      },
    },
    {
      new: true,
    }
  );
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    data: "Course updated successfully",
  });
};
