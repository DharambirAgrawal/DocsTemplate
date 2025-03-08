import { Request, Response } from "express";
import Course from "../../models/courses/course";
import { AppError } from "../../errors/AppError";
import CourseContent from "../../models/courses/content";

export const uploadCourseContent = async (req: Request, res: Response) => {
  const { slug } = req.params; // Course identifier
  const content = req.body; // Content data (group or section)
  const role = (req as any).role; // User role
  const { type } = req.query as { type: "group" | "content" };
  if (role !== "ADMIN" && role !== "AUTHOR") {
    throw new AppError("Not Authorized to upload the content", 400);
  }

  let course;

  if (type === "group") {
    // Find the course by slug
    course = await Course.findOne({ slug });
    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const contentGroup = {
      order: 0, // Default order
      title: content.title, // Title from request
      sections: [], // New group has no sections initially
    };
    if (course.contentGroups.length == 0) {
      contentGroup.order = 1; // First content group gets order 1
    } else {
      const highestOrder = Math.max(
        ...course.contentGroups.map((group) => group.order)
      );
      contentGroup.order = highestOrder + 1; // Set order to next available number
    }

    // Validate that the title is provided
    if (!contentGroup.title) {
      throw new AppError("Title is required", 400);
    }

    // Add the new group to the course
    course.contentGroups.push(contentGroup);

    // Save the course
    await course.save();
  } else if (type === "content") {
    // Create new content (section)
    if (!content.title || !content.content || !content.id || !slug) {
      throw new AppError("Aa fields are required", 400);
    }
    course = await Course.findOne(
      { "contentGroups._id": content.id },
      { "contentGroups.$": 1 }
    ).populate({
      path: "contentGroups.sections", // Populate sections within each content group
      model: "CourseContent", // The model to use for the sections
    });
    if (!course) {
      throw new AppError("Course not found", 404);
    }
    const contentGroup = course.contentGroups[0]; // Extract the matched content group
    const contentData = {
      title: content.title,
      content: content.content,
      metaData: {
        metaTitle: content.metaData.metaTitle,
        metaDescription: content.metaData.metaDescription,
        metaKeywords: content.metaData.metaKeywords,
      },
      order: 1, // Default order
    };
    if (contentGroup.sections.length == 0) {
      contentGroup.order = 1; // First content group gets order 1
    } else {
      const highestOrder = Math.max(
        ...contentGroup.sections.map((section: any) => section.order)
      );

      contentData.order = highestOrder + 1; // Assign the new section the next order number
    }

    const newContent = new CourseContent(contentData);

    // Save the slug for the new section
    await newContent.saveSlug();
    await newContent.save();
    // Add the new section to the content group
    const updateGroup = await Course.updateOne(
      { "contentGroups._id": content.id },
      { $push: { "contentGroups.$.sections": newContent._id } }
    );
    if (!updateGroup) {
      throw new AppError("Failed to update content group", 500);
    }
  } else {
    throw new AppError("Invalid content type", 400);
  }

  return res.status(200).json({
    success: true,
    data: course,
  });
};

export const deleteContent = async (req: Request, res: Response) => {
  const role = (req as any).role;
  const id = req.params.id; // Content ID to delete

  // Ensure that the user has permission to delete
  if (role !== "ADMIN" && role !== "AUTHOR") {
    throw new AppError("Not Authorized to delete the content", 400);
  }

  // Step 1: Find and delete the content section
  const content = await CourseContent.findByIdAndDelete(id);
  if (!content) {
    throw new AppError("Content not found", 404);
  }

  // Step 2: Update contentGroups to remove the deleted content's ID and adjust order
  const course = await Course.findOne(
    { "contentGroups.sections": id },
    { "contentGroups.$": 1 }
  ).populate({
    path: "contentGroups.sections", // Populate sections within each content group
    model: "CourseContent", // The model to use for the sections
  });
  if (!course) {
    throw new AppError("Course not found", 404);
  }

  // console.log(course.contentGroups[0].sections);

  // Iterate over each content group and remove the deleted content's ID

  // Step 3: Return success response
  res.status(200).json({
    success: true,
    message: "Content deleted",
  });
};

export const updateCourseContent = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, content, metaData, slug } = req.body;
  const role = (req as any).role;
  if (role !== "ADMIN" && role !== "AUTHOR") {
    throw new AppError("Not Authorized to update the content", 400);
  }

  if (!id || !title || !content || !slug || !metaData) {
    throw new AppError("All fields are required", 400);
  }
  const course = await CourseContent.findByIdAndUpdate(
    id,
    {
      title,
      content,
      metaData: {
        metaTitle: metaData.metaTitle,
        metaDescription: metaData.metaDescription,
        metaKeywords: metaData.metaKeywords,
      },
    },
    { new: true }
  );
  if (!course) {
    throw new AppError("Course not found", 404);
  }
  return res.status(200).json({
    success: true,
    data: course,
  });
};

export const updateContentOrder = async (req: Request, res: Response) => {
  const content = req.body;
  const role = (req as any).role;
  if (role !== "ADMIN" && role !== "AUTHOR") {
    throw new AppError("Not Authorized to update the content", 400);
  }
  if (!content || !content.length) {
    throw new AppError("Content is required", 400);
  }
  for (const item of content) {
    const { id, order } = item;
    if (!id || !order) {
      throw new AppError("Id and order are required", 400);
    }
    await CourseContent.findByIdAndUpdate(id, {
      order,
    });
  }
  res.status(200).json({
    success: true,
    message: "Content order updated successfully",
  });
};
