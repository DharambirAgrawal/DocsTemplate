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

export const getCourse = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { content } = req.query;
  const role = (req as any).role;

  if (role != "ADMIN" && role != "AUTHOR") {
    throw new AppError("Not Authorized to get the post", 400);
  }
  const course = await Course.findOne({ slug }).select("-__v -_id");
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    data: course,
  });
};

export const editCourseContent = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const content = req.body;
  const role = (req as any).role;
  const { type } = req.query as { type: "group" | "content" };

  if (role !== "ADMIN" && role !== "AUTHOR") {
    throw new AppError("Not Authorized to edit the content", 400);
  }

  let course;

  if (type === "group") {
    // Get the existing course with the provided slug
    course = await Course.findOne({ slug });
    const contentGroup = {
      order: 0,
      title: "",
      sections: [],
    };

    if (!course) {
      throw new AppError("Course not found", 404);
    }
    // Check if `content` (new group) is missing an order, assign next available order if necessary
    if (content) {
      // If contentGroups is empty, assign the order as 1, else calculate next available order
      if (course.contentGroups === null) {
        contentGroup.order = 1; // First content group gets order 1
      } else {
        // Find the highest existing order value in contentGroups
        const highestOrder = course.contentGroups.reduce((maxOrder, group) => {
          return group.order > maxOrder ? group.order : maxOrder;
        }, 0);

        // Set the new content group's order to the next available number
        contentGroup.order = highestOrder + 1;
      }
    }
    if (!content.title) {
      throw new AppError("Title is required", 400);
    }
    contentGroup.title = content.title;

    // Add the new content group to the contentGroups array
    course.contentGroups.push(contentGroup);

    // Save the updated course
    await course.save();
  } else {
    const section = {
      title: "",
      content: "",
      slug: "",
      order: 0,
      metaData: {
        metaTitle: "",
        metaDescription: "",
        metaKeywords: [],
      },
    };

    // Get the existing course with the provided slug
    course = await Course.findOne(
      {
        "contentGroups._id": content.id,
      },
      { "contentGroups.$": 1 } // This ensures only the matched contentGroup is returned
    ).exec();

    if (!course) {
      throw new Error("Course not found");
    }

    // Extract the matched content group from the course document
    const contentGroup = course.contentGroups[0];
    // Check if `content` (new group) is missing an order, assign next available order if necessary
    if (contentGroup) {
      // If contentGroups is empty, assign the order as 1, else calculate next available order
      if (contentGroup.sections === null) {
        contentGroup.order = 1; // First content group gets order 1
      } else {
        // Find the highest existing order value in contentGroups
        const highestOrder = course.contentGroups.reduce((maxOrder, group) => {
          return group.order > maxOrder ? group.order : maxOrder;
        }, 0);

        // Set the new content group's order to the next available number
        contentGroup.order = highestOrder + 1;
      }
    }
    if (!content.title) {
      throw new AppError("Title is required", 400);
    }
    section.title = content.title;
    section.content = content.content;
    section.metaData = {
      metaTitle: content.metaData.metaTitle,
      metaDescription: content.metaData.metaDescription,
      metaKeywords: content.metaData.metaKeywords,
    };

    // Add the new content group to the contentGroups array

    // Save the updated course
    await course.save();
  }

  if (!course) {
    throw new AppError("Course not found", 404);
  }

  return res.status(200).json({
    success: true,
    data: course,
  });
};
