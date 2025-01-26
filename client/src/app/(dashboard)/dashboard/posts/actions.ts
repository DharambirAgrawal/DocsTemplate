"use server";
import { handleServerError } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { setCookie, removeCookie, getCookie } from "@/lib/cookies";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
export const publishPost = async (formData: any) => {
  console.log(formData);
  try {
    const data = await fetchWithTokenRefresh("/api/blog/publish?publish=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:  JSON.stringify(formData),
    });
    console.log(data);
    return {
      success: true,
      // data: data,
    };
  } catch (error) {
    handleServerError(error);
  }
};
