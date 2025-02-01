"use server";
import { asyncErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
import { revalidatePath } from 'next/cache'
export const uploadImageAction = asyncErrorHandler( async (formData: any, folder: string) => {
    const data = await fetchWithTokenRefresh(
      `/api/media/upload-image?folder=${folder}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!data.success) {
      throw new AppError(data.message || "Error Uploading image");
    }else{
      return {
        success: true,
        data: data.data,
      };
    }
});

export const getImagesAction =  asyncErrorHandler(async (folder: string) => {
    const data = await fetchWithTokenRefresh(
      `/api/media/images?folder=${folder}`,
      {
        method: "GET",
      }
    );
    if (!data.success) {
      throw new AppError(data.message || "Error getting image");
    }else{
      return {
        success: true,
        data: data.data,
      };
    }
});

export const deleteImagesAction = asyncErrorHandler(async (publicId: string) => {
    const data = await fetchWithTokenRefresh(`/api/media/delete-image`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

  if (!data.success) {
    throw new AppError(data.message || "Error deleting image");
  }else{
    revalidatePath('/dashboard/images/gallery')
    return {
      success: true,
      data: data.data,
    };
  }
});

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
    }else{
    revalidatePath('/dashboard/images/gallery')
      return {
        success: true,
        data: data.data,
      };
    }
})
