"use server";
import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
import { revalidatePath } from "next/cache";

export const publishCourse = asyncErrorHandler(async (formData: any) => {
  //   const title = formData.title;
  //   const description = formData.description;
  //   const duration = formData.duration;
  //   const level = formData.level;
  //   const category = formData.category;
  //   const tags = formData.tags;
  //   const seoTitle = formData.seoTitle;
  //   const seoDescrition = formData.seoDescription;
  //   const seoKeywords = formData.seoKeywords;
  const status = formData.status;
  let requiredFields = ["title"]; // Only title is required if not publishing
  if (status === "publish") {
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

  const missingFields = requiredFields.filter((field) => !formData[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  let data;
  if (status === "draft") {
    data = await fetchWithTokenRefresh("/api/course/publish?publish=false", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } else {
    //TODO: validate fiels before sending to server
    data = await fetchWithTokenRefresh("/api/course/publish?publish=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  if (!data.success) {
    throw new AppError(data.message || "Course not created", 400);
  } else {
    revalidatePath("/dashboard/course/view");
    revalidatePath("/dashboard/course/upload");
    return data;
  }
});

export const getCourses = asyncErrorHandler(async () => {
  const data = await fetchWithTokenRefresh("/api/course/courses", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.success) {
    throw new AppError(data.message || "Courses not found", 400);
  } else {
    return {
      data: data.data,
      success: data.success,
    };
  }
});

export const deleteCourseAction = asyncErrorHandler(async (slug: string) => {
  console.log("deleting...");
  const data = await fetchWithTokenRefresh(`/api/course/course/${slug}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.success) {
    throw new AppError(data.message || "Course not deleted", 400);
  } else {
    return {
      data: data.data,
      success: data.success,
    };
  }
});

export const updateCourseAction = asyncErrorHandler(async (formData: any) => {
  const requiredFields = [
    "title",
    "description",
    "duration",
    "level",
    "category",
    "tags",
    "seoTitle",
    "seoDescription",
    "slug",
    "seoKeywords",
  ];
  const slug = formData.slug;
  const missingFields = requiredFields.filter((field) => !formData[field]);
  if (missingFields.length > 0) {
    throw new AppError(
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  const data = await fetchWithTokenRefresh(`/api/course/update?slug=${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!data.success) {
    throw new AppError(data.message || "Course not updated", 400);
  } else {
    return {
      data: data.data,
      success: data.success,
    };
  }
});

export const getCourseAction = asyncErrorHandler(async (slug: string) => {
  if (!slug) {
    throw new AppError("Slug is required", 400);
  }
  const data = await fetchWithTokenRefresh(`/api/course/course/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!data.success) {
    throw new AppError(data.message || "Course not found", 400);
  } else {
    return {
      data: data.data,
      success: data.success,
    };
  }
});

export const updateCourseContentAction = asyncErrorHandler(
  async (formData: any, type: string) => {
    if (type == "group") {
      const requiredFields = ["slug", "title"];
      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        throw new AppError(
          `Missing required fields: ${missingFields.join(", ")}`,
          400
        );
      }
    } else {
      const requiredFields = ["content", "title", "id"];
      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        throw new AppError(
          `Missing required fields: ${missingFields.join(", ")}`,
          400
        );
      }
    }

    const data = await fetchWithTokenRefresh(
      `/api/course/publishcontent/${formData.slug}?type=${type}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!data.success) {
      throw new AppError(data.message || "Course not updated", 400);
    } else {
      revalidatePath(
        `(dashboard)/dashboard/course/upload/${formData.slug}`,
        "page"
      );
      revalidatePath(`/dashboard/course/upload/${formData.slug}`);

      return {
        data: data.data,
        success: data.success,
      };
    }
  }
);
