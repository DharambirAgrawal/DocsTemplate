import { Request, Response } from "express";
import Course from "../../models/courses/course";
import Profile from "../../models/user/ProfileModel";
import { AppError } from "../../errors/AppError";
import CourseContent from "../../models/courses/content";

export const getPublicCourses = async (req: Request, res: Response) => {
  const courses = await Course.find({
    status: "PUBLISHED",
  }).select("title slug description duration level category metaData -_id");
  res.status(200).json({
    success: true,
    data: courses,
  });
};

export const getPublicCourse = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const { type } = req.query as { type: "content" | "slug" | "metaData" };
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
      "title slug content metaData createdAt updatedAt"
    );
  } else if (type === "metaData") {
    if (!slug) {
      throw new AppError("Slug is required", 400);
    }
    data = await Course.findOne({
      slug,
      status: "PUBLISHED",
    })
      .select(
        "slug -_id title metaData description category authorId createdAt updatedAt duration level contentGroups"
      )
      .populate({
        path: "authorId",
        select: "bio userId",
      })
      .populate({
        path: "contentGroups.sections", // Populate sections within each content group
        model: "CourseContent", // The model to use for the sections
        select: "metaData -_id",
      })
      .exec();
    if (!data) {
      throw new AppError("Course not found", 404);
    }
    const courseKeywords = data.contentGroups
      .map((course) => {
        // Get the slugs of the course content
        const contentkeywords = course.sections
          .reduce((slugs: string[], group: any) => {
            if (group && group.metaData && group.metaData.metaKeywords) {
              // Add the metaKeywords to the array
              slugs.push(...group.metaData.metaKeywords);
            }
            return slugs;
          }, [] as string[])
          .flat();

        return contentkeywords;
      })
      .flat();

    const profile = await Profile.findOne({
      userId: (data.authorId as any)[0].userId,
    }).select("firstName lastName email image -_id");
    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    data = {
      ...data.toObject(),
      authorId: { ...profile.toObject(), bio: (data.authorId as any)[0].bio },
      Keywords: courseKeywords,
    };
    delete data?.contentGroups;
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

export const getAllCourses = async (req: Request, res: Response) => {
  const { type } = req.query as { type: "navigation" | "metaData" };
  let data;
  if (type === "navigation") {
    const courses = await Course.find().populate({
      path: "contentGroups.sections", // Populating content groups sections (course content)
      select: "slug", // Only select the 'slug' field of the course content
    });

    // Map through courses to structure the response
    const courseSlugs = courses.map((course) => {
      // Get the slugs of the course content
      const contentSlugs = course.contentGroups.reduce(
        (slugs: string[], group: any) => {
          group.sections.forEach((section: any) => {
            if (section && section.slug) {
              slugs.push(section.slug); // Add content slug to array
            }
          });
          return slugs;
        },
        [] as string[]
      );

      return {
        slug: course.slug,
        children: contentSlugs,
      };
    });
    data = courseSlugs;
  } else if (type === "metaData") {
    data = await Course.find({ status: "PUBLISHED" }).select(
      "title slug metaData -_id"
    );
  } else {
    throw new AppError("Invalid type", 400);
  }
  if (!data) {
    throw new AppError("Courses not found", 404);
  }

  return res.status(200).json({
    success: true,
    data: data,
  });
};
