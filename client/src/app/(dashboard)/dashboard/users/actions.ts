"use server";
import { asyncErrorHandler } from "@/lib/error-handler";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
import { AppError } from "@/types/errors";
export const getUsers = asyncErrorHandler(async () => {
  const data = await fetchWithTokenRefresh("/api/auth/users?sort=none");
  if (!data.success) {
    throw new AppError(data.message || "Error getting users ");
  } else {
    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  }
});

export const updateUser = asyncErrorHandler(
  async (formData: any, userId: string) => {
    const role = formData.get("role")?.toString().trim();
    const isEmailVerified = formData.get("isEmailVerified")?.toString().trim();
    const status = formData.get("status")?.toString().trim();
    if (!role || !isEmailVerified || !status) {
      throw new AppError("All fields are required", 400, "VALIDATION_ERROR");
    }
    const data = await fetchWithTokenRefresh(
      `/api/auth/update-user/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          isEmailVerified: isEmailVerified === "Yes" ? true : false,
          status,
        }),
      }
    );
    if (!data.success) {
      throw new AppError(data.message || "Error updating image");
    } else {
      return {
        success: true,
        message: "User updated successfully",
        data: {
          role,
          isEmailVerified,
          status,
        },
      };
    }
  }
);
