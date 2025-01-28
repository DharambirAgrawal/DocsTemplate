"use server";
import { handleServerError } from "@/lib/error-handler";
import { fetchWithTokenRefresh } from "@/utils/fetchUtil";
import { AppError } from "@/types/errors";
export const getUsers = async () => {
  const response = await fetchWithTokenRefresh("/api/auth/users?sort=none");

  console.log(response);
  return response.data;
};

export const updateUser = async (formData: any, userId: string) => {
  try {
    console.log(formData);

    const role =  formData.get("role")?.toString().trim();
    const isEmailVerified = formData.get("isEmailVerified")?.toString().trim();
    const status = formData.get("status")?.toString().trim();
    if (!role || !isEmailVerified || !status ) {
      throw new AppError("All fields are required", 400, "VALIDATION_ERROR");
    }
    const res = await fetchWithTokenRefresh(`/api/auth/update-user/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            role,
            isEmailVerified: isEmailVerified === "Yes" ? true : false,
            status,
        }),
    });
    if(res.status== "success"){
        return {
            success: true,
            message: "User updated successfully",
            data:{
                role,
                isEmailVerified,
                status,
            }
          };
    }else{
        throw new AppError(res.error?.message || "Something went wrong", 400);
    }
    
  } catch (error) {
    return handleServerError(error);
  }
};
