"use server";
import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
import { revalidatePath } from "next/cache";
export const uploadImageAction = asyncErrorHandler(
  async (formData: any, folder: string) => {
    const data = await fetchWithTokenRefresh(
      `/api/media/upload-image?folder=${folder}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!data.success) {
      throw new AppError(data.message || "Error Uploading image");
    } else {
      return {
        success: true,
        data: data.data,
      };
    }
  }
);

export const getImagesAction = asyncErrorHandler(async (filters) => {
  const queryParams = new URLSearchParams();

  // Helper function to safely add params
  const addParam = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        queryParams.append(key, value.join(","));
      } else if (value instanceof Date) {
        queryParams.append(key, value.toISOString());
      } else {
        queryParams.append(key, String(value));
      }
    }
  };

  // Add all possible filter parameters
  const { page = 1, limit = 10, folder = "BLOG" } = filters;

  // Add pagination params
  addParam("page", page);
  addParam("limit", limit);
  addParam("folder", folder);

  // Add sorting params

  // Build the URL with query parameters
  const url = `/api/media/images?${queryParams.toString()}`;

  // Make the request with error handling

  const data = await fetchWithTokenRefresh(url, {
    method: "GET",
  });
  if (!data.success) {
    throw new AppError(data.message || "Error getting image");
  } else {
    return {
      success: true,
      data: data.data,
      pagination: {
        currentPage: data.pagination?.currentPage || 1,
        totalPages: data.pagination?.totalPages || 1,
        totalItems: data.pagination?.totalItems || 0,
      },
    };
  }
});

export const deleteImagesAction = asyncErrorHandler(
  async (publicId: string) => {
    const data = await fetchWithTokenRefresh(`/api/media/delete-image`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!data.success) {
      throw new AppError(data.message || "Error deleting image");
    } else {
      revalidatePath("/dashboard/images/gallery");
      return {
        success: true,
        data: data.data,
      };
    }
  }
);

export const updateImageAction = asyncErrorHandler(async (formData: any) => {
  // todo: implement validation for formData
  const data = await fetchWithTokenRefresh(`/api/media/update-image`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!data.success) {
    throw new AppError(data.message || "Error updating image");
  } else {
    revalidatePath("/dashboard/images/gallery");
    return {
      success: true,
      data: data.data,
    };
  }
});
