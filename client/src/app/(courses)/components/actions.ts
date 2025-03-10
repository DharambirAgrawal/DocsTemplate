"use server";

import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";

export const getCourseAction = asyncErrorHandler(
  async (
    type: "content" | "slug" | "metaData",
    slug: string,
    contentSlug?: string
  ) => {
    if (!slug) {
      throw new AppError("Slug is required", 400);
    }
    let url = `${process.env.SERVER_BASE_URL}/api/course/public/${slug}?type=${type}`;

    if (type === "content" && !contentSlug) {
      throw new AppError("Content slug is required for content type", 400);
    }

    if (type === "content" && contentSlug) {
      url += `&contentSlug=${contentSlug}`;
    }
    const res = await fetch(url, {
      method: "GET",
      next: {
        tags: ["coursecontent"],
      },
    });
    if (!res.ok) {
      throw new AppError(res.statusText || "Course not found", 400);
    }
    const data = await res.json();

    return {
      data: data.data,
      success: res.ok,
    };
  }
);

export const getCoursesAction = asyncErrorHandler(async () => {
  const res = await fetch(
    `${process.env.SERVER_BASE_URL}/api/course/public/courses`,
    {
      method: "GET",
      next: {
        tags: ["coursecontent"],
      },
    }
  );
  if (!res.ok) {
    throw new AppError(res.statusText || "Courses not found", 400);
  }
  const data = await res.json();

  return {
    data: data.data,
    success: res.ok,
  };
});

export const getAllCoursesAction = asyncErrorHandler(
  async (type: "navigation" | "metaData") => {
    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/course/public/courses/all?type=${type}`,
      {
        method: "GET",
        next: {
          tags: ["coursecontent"],
        },
      }
    );
    if (!res.ok) {
      throw new AppError(res.statusText || "Courses not found", 400);
    }
    const data = await res.json();

    return {
      data: data.data,
      success: res.ok,
    };
  }
);
