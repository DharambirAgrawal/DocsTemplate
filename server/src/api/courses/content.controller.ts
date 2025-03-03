import { Request, Response } from "express";
import Course from "../../models/courses/course";
import { AppError } from "../../errors/AppError";
import CourseContent from "../../models/courses/content";
import mongoose from "mongoose";

// export const editCourseContent = async (req: Request, res: Response) => {
//   const { slug } = req.params;
//   const content = req.body;
//   const role = (req as any).role;
//   const { type } = req.query as { type: "group" | "content" };

//   if (role !== "ADMIN" && role !== "AUTHOR") {
//     throw new AppError("Not Authorized to edit the content", 400);
//   }

//   let course;

//   if (type === "group") {
//     // Get the existing course with the provided slug
//     course = await Course.findOne({ slug });
//     const contentGroup = {
//       order: 0,
//       title: "",
//       sections: [],
//     };

//     if (!course) {
//       throw new AppError("Course not found", 404);
//     }
//     // Check if `content` (new group) is missing an order, assign next available order if necessary
//     if (content) {
//       // If contentGroups is empty, assign the order as 1, else calculate next available order
//       if (course.contentGroups === null) {
//         contentGroup.order = 1; // First content group gets order 1
//       } else {
//         // Find the highest existing order value in contentGroups
//         const highestOrder = course.contentGroups.reduce((maxOrder, group) => {
//           return group.order > maxOrder ? group.order : maxOrder;
//         }, 0);

//         // Set the new content group's order to the next available number
//         contentGroup.order = highestOrder + 1;
//       }
//     }
//     if (!content.title) {
//       throw new AppError("Title is required", 400);
//     }
//     contentGroup.title = content.title;

//     // Add the new content group to the contentGroups array
//     course.contentGroups.push(contentGroup);

//     // Save the updated course
//     await course.save();
//   } else {
//     const section = {
//       title: "",
//       content: "",
//       slug: "",
//       order: 0,
//       metaData: {
//         metaTitle: "",
//         metaDescription: "",
//         metaKeywords: [],
//       },
//     };

//     const newContent = new CourseContent({
//       title: content.title,
//       content: content.content,
//       metaData: {
//         metaTitle: content.metaData.metaTitle,
//         metaDescription: content.metaData.metaDescription,
//         metaKeywords: content.metaData.metaKeywords,
//       },
//     });
//     newContent.saveSlug();
//     newContent.save();
//     // Get the existing course with the provided slug
//     course = await Course.findOne(
//       {
//         "contentGroups._id": content.id,
//       },
//       { "contentGroups.$": 1 } // This ensures only the matched contentGroup is returned
//     ).exec();

//     if (!course) {
//       throw new Error("Course not found");
//     }

//     // Extract the matched content group from the course document
//     const contentGroup = course.contentGroups[0];
//     // Check if `content` (new group) is missing an order, assign next available order if necessary
//     if (contentGroup) {
//       // If contentGroups is empty, assign the order as 1, else calculate next available order
//       if (contentGroup.sections === null) {
//         contentGroup.order = 1; // First content group gets order 1
//       } else {
//         // Find the highest existing order value in contentGroups
//         const highestOrder = course.contentGroups.reduce((maxOrder, group) => {
//           return group.order > maxOrder ? group.order : maxOrder;
//         }, 0);

//         // Set the new content group's order to the next available number
//         contentGroup.order = highestOrder + 1;
//       }
//     }
//     if (!content.title) {
//       throw new AppError("Title is required", 400);
//     }

//     await course.save();
//   }

//   if (!course) {
//     throw new AppError("Course not found", 404);
//   }

//   return res.status(200).json({
//     success: true,
//     data: course,
//   });
// };

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
    console.log("Content ID:", content.id);
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
