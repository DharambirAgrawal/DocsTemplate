import { Request, Response } from "express";
import Course from "../../models/courses/course";
import { AppError } from "../../errors/AppError";
import CourseContent from "../../models/courses/content";

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
  const { type, groupId } = req.query as {
    type: "group" | "course";
    groupId?: string;
  };

  // Check if the user has the "ADMIN" role and is allowed to delete content
  if (role !== "ADMIN" && type === "course") {
    throw new AppError("Not Authorized to delete the content", 400);
  }
  if (role !== "AUTHOR" && role !== "ADMIN") {
    throw new AppError("Not Authorized to delete the course", 400);
  }

  // Find the course by slug
  const course = await Course.findOne({ slug });
  if (!course) {
    throw new AppError("Course not found", 404);
  }

  if (type === "course") {
    // If type is "course", delete the entire course and its content
    // Find all the CourseContent IDs that are referenced in the course
    const contentIds = course.contentGroups.flatMap((group) => group.sections);

    // Delete all related CourseContent documents
    if (contentIds.length > 0) {
      await CourseContent.deleteMany({
        _id: { $in: contentIds },
      });
    }

    // Delete the course itself using deleteOne
    await Course.deleteOne({ _id: course._id });

    return res.status(200).json({
      success: true,
      data: "Course and related content deleted successfully",
    });
  } else if (type === "group") {
    // If type is "group", delete the specific content group and its content
    if (!groupId) {
      throw new AppError("Group ID is required", 400);
    }
    console.log("course", course);
    // Find the content group by ID
    const contentGroup = course.contentGroups.find(
      (group) => (group as any)._id.toString() === groupId
    );
    if (!contentGroup) {
      throw new AppError("Content group not found", 404);
    }

    // Delete all related CourseContent documents for this group
    const contentIds = contentGroup.sections;

    if (contentIds.length > 0) {
      await CourseContent.deleteMany({
        _id: { $in: contentIds },
      });
    }

    // Remove the content group from the course
    course.contentGroups = course.contentGroups.filter(
      (group) => (group as any)._id.toString() !== groupId
    );
    course.contentGroups.forEach((group, index) => {
      (group as any).order = index + 1; // Reassign order starting from 1
    });

    await course.save();

    return res.status(200).json({
      success: true,
      data: "Content group and related content deleted successfully",
    });
  }

  // If an invalid type is provided, return an error
  throw new AppError("Invalid deletion type specified", 400);
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

export const getCourse = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const role = (req as any).role;

  if (role != "ADMIN" && role != "AUTHOR") {
    throw new AppError("Not Authorized to get the post", 400);
  }
  const course = await Course.findOne({ slug }).select("-__v -_id").populate({
    path: "contentGroups.sections", // Populate sections within each content group
    model: "CourseContent", // The model to use for the sections
  });
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    data: course,
  });
};

export const updateGroup = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { slug } = req.query;
  const role = (req as any).role;

  if (role != "ADMIN" && role != "AUTHOR") {
    throw new AppError("Not Authorized to update the post", 400);
  }
  const requiredFields = ["title", "description"];
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
      $set: {
        "contentGroups.$[group].title": title,
        "contentGroups.$[group].description": description,
      },
    },
    {
      arrayFilters: [{ "group.title": title }],
      new: true,
    }
  );
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    data: "Group updated successfully",
  });
};
