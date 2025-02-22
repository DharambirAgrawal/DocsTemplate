"use server";
import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
export const getProfile = asyncErrorHandler(async () => {
  const data = await fetchWithTokenRefresh(`/api/user/profile`, {
    method: "GET",
  });
  if (!data.success) {
    throw new AppError(data.message || "Error Uploading image");
  } else {
    return {
      success: true,
      data: data.data,
    };
  }
});
