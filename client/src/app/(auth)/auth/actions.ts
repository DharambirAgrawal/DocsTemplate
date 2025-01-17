"use server";
import { redirect } from "next/navigation";

import { handleServerError } from "@/lib/error-handler";
import { AppError, ServerActionResponse } from "@/types/errors";
export const googleLoginAction = async () => {
  redirect(
    "https://upgraded-space-meme-gv67xr5w9572wvx9-8080.app.github.dev/api/auth/google"
  );
  console.log("google login");
  // const res = await fetch('https://upgraded-space-meme-gv67xr5w9572wvx9-8080.app.github.dev/api/auth/google', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   console.log(res)
  //   const data = await res.json();
  //   console.log(data)
};
export async function signinAction  (formData: FormData): Promise<ServerActionResponse<{
    success: boolean;
}>> {
  // {
  //     email: 'dffg@gmail.com',
  //     password: 'rtyrty',
  //     remember: 'checked'
  //   }
  console.log(formData);
  return {
    success: true,   
  };
}

export async function signupAction(formData: FormData): Promise<
  ServerActionResponse<{
    success: boolean;
  }>
> {
  // {
  //     firstName: 'fddfgfd',
  //     lastName: 'dfgdf',
  //     email: 'dfgd@gmail.com',
  //     password: 'rtw34',
  //     passwordConfirmation: 'fdsdf',
  //     accept: 'on'
  //   }
  console.log(formData);
  return {
    success: true,
   
  }
}

export async function forgetPasswordAction(formData: FormData): Promise<
  ServerActionResponse<{
    success: boolean;
  }>
> {
  try {
    const email = formData.get("email")?.toString().trim();
    await new Promise(resolve => setTimeout(resolve, 10000));

    if (!email) {
      throw new AppError("Email is required", 400, "VALIDATION_ERROR");
    }

    return {
      success: true,
     
    };
  } catch (error) {
    return handleServerError(error);
  }
}
