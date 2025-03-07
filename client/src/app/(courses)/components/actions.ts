"use server";

import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";

export const getCourseAction = asyncErrorHandler(
  async (type: "content" | "slug" | "metaData", slug: string) => {
    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/course/public/${slug}?type=${type}`,
      {
        method: "GET",
      }
    );
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
