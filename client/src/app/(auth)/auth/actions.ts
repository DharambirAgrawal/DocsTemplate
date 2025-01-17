"use server";
import { redirect } from "next/navigation";
import { handleServerError } from "@/lib/error-handler";
import { AppError, ServerActionResponse } from "@/types/errors";
import { validateEmail, validatePassword } from "@/lib/utils";
import { setCookie } from "@/lib/cookies";
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

export async function signupAction(formData: FormData): Promise<
  ServerActionResponse<{
    success: boolean;
  }>
> {
  try {
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData.get("passwordConfirmation")?.toString().trim();
    const subscribe = formData.get("subscribe")?.toString().trim();
    if (password !== confirmPassword) {
      throw new AppError(
        "Password and Confirm Password do not match",
        400,
        "VALIDATION_ERROR"
      );
    }
    if (!firstName || !lastName || !email || !password) {
      throw new AppError("All fields are required", 400, "VALIDATION_ERROR");
    }
    if (!validateEmail(email) || !validatePassword(password)) {
      throw new AppError("Invalid Email", 400, "VALIDATION_ERROR");
    }

    const res = await fetch(`${process.env.SERVER_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        subscribe: subscribe === "checked"? "checked": "unchecked",
      }),
    });
    if(!res.ok){
      if(res.status === 400 || res.status === 404 ){
        const data = await res.json();
        throw new AppError(data.message, res.status);
      }else{
        throw new AppError("Something went wrong. Please try again later", 500, "SERVER_ERROR");
      }
    }
    const data = await res.json();
    await setCookie("email", email, { expires: new Date(Date.now() +  3600 * 1000), path:"/auth/verify-email" });
    
    return {
      success: true,
      message:data.message
    };
  } catch (error) {
    return handleServerError(error);
  }
}


export const resendEmailVerificationAction = async (email:string): Promise<
  ServerActionResponse<{
    success: boolean;
  }>> => {
    try {
      if (!email || !validateEmail(email)) {
        throw new AppError("Email is required", 400, "VALIDATION_ERROR");
      }
      const res = await fetch(`${process.env.SERVER_BASE_URL}/api/auth/resend-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if(!res.ok){
        if(res.status === 400 || res.status === 404 ){
          const data = await res.json();
          throw new AppError(data.message, res.status);
        }else{
          throw new AppError("Something went wrong. Please try again later", 500, "SERVER_ERROR");
        }
      }
      const data = await res.json();

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      return handleServerError(error);
    }
  }

export async function signinAction(formData: FormData): Promise<
  ServerActionResponse<{
    success: boolean;
  }>
> {
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

export async function forgetPasswordAction(formData: FormData): Promise<
  ServerActionResponse<{
    success: boolean;
  }>
> {
  try {
    const email = formData.get("email")?.toString().trim();
    await new Promise((resolve) => setTimeout(resolve, 10000));

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
