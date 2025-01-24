"use server";
import { handleServerError } from "@/lib/error-handler";
import { AppError } from "@/types/errors";
import { validateEmail, validatePassword } from "@/lib/utils";
import { setCookie,removeCookie } from "@/lib/cookies";

export const googleLoginAction = async (data: any) => {
  try {
    const { refreshToken, accessToken, status, message, sessionId } = data;
    if (status === "error" || !refreshToken || !accessToken || !sessionId) {
      return handleServerError(new AppError(message, 500, "SERVER_ERROR"));
    }
    await removeCookie('',true);
    // Call the setCookie function
    await setCookie("refreshToken", refreshToken, {
      expires: 7 * 24 * 3600 * 1000,
      maxAge: 7* 24 * 3600
    }); // 7 days
    await setCookie("accessToken", accessToken, { expires: 24 * 3600 * 1000, maxAge: 24 * 3600}); // 1 day
    await setCookie("sessionId", sessionId, { expires: 24 * 3600 * 1000 , maxAge: 24 * 3600}); // 1 day
    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    return handleServerError(error);
  }
};

export async function signupAction(formData: FormData) {
  try {
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData
      .get("passwordConfirmation")
      ?.toString()
      .trim();
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

    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          subscribe: subscribe === "checked" ? "checked" : "unchecked",
        }),
      }
    );
    if (!res.ok) {
      if (
        res.status === 400 ||
        res.status === 404 ||
        res.status === 401 ||
        res.status === 403
      ) {
        const data = await res.json();
        throw new AppError(data.message, res.status);
      } else {
        throw new AppError(
          "Something went wrong. Please try again later",
          500,
          "SERVER_ERROR"
        );
      }
    }
    const data = await res.json();
    await setCookie("email", email, {
      expires: new Date(Date.now() + 3600 * 1000),
      path: "/auth/verify-email",
    });

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return handleServerError(error);
  }
}

export const resendEmailVerificationAction = async (email: string) => {
  try {
    if (!email || !validateEmail(email)) {
      throw new AppError("Email is required", 400, "VALIDATION_ERROR");
    }
    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/auth/resend-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (!res.ok) {
      if (
        res.status === 400 ||
        res.status === 404 ||
        res.status === 401 ||
        res.status === 403
      ) {
        const data = await res.json();
        throw new AppError(data.message, res.status);
      } else {
        throw new AppError(
          "Something went wrong. Please try again later",
          500,
          "SERVER_ERROR"
        );
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
};

export async function signinAction(formData: FormData) {
  try {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const remember = formData.get("remember")?.toString().trim()
      ? "checked"
      : "unchecked";
    const platform = formData.get("platform")?.toString().trim();
    const deviceFingerprint = formData
      .get("deviceFingerprint")
      ?.toString()
      .trim();
    const userAgent = formData.get("userAgent")?.toString().trim();
    const browser = formData.get("browser")?.toString().trim();
    const language = formData.get("language")?.toString().trim();
    const timezoneOffset = formData.get("timezoneOffset")?.toString().trim();
    if (!email || !password || !remember) {
      throw new AppError(
        "Email and Password are required",
        400,
        "VALIDATION_ERROR"
      );
    }
    if (!validateEmail(email)) {
      throw new AppError("Invalid Email", 400, "VALIDATION_ERROR");
    }
    const res = await fetch(`${process.env.SERVER_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        metaData: {
          platform,
          deviceFingerprint,
          userAgent,
          browser,
          language,
          timezoneOffset: timezoneOffset ? parseInt(timezoneOffset) : 0,
        },
      }),
    });
    if (!res.ok) {
      if (
        res.status === 400 ||
        res.status === 404 ||
        res.status === 401 ||
        res.status === 403
      ) {
        const data = await res.json();
        throw new AppError(data.message, res.status);
      } else {
        throw new AppError(
          "Something went wrong. Please try again later",
          500,
          "SERVER_ERROR"
        );
      }
    }
    const data = await res.json();
    const cookie_string = res.headers.get('set-cookie');
    const sess = res.headers.get('sessionId');  // Access the custom header
    const sessionId = sess ? sess.split(' ')[1] : null;  // Remove "Bearer" and get the session ID
    if(!cookie_string || !sessionId){
      throw new AppError("Cookie not found", 500, "SERVER_ERROR");
    }
    const accessToken = cookie_string.match(/access_token=([^;]+)/);
    const refreshToken = cookie_string.match(/refresh_token=([^;]+)/);
    if(!accessToken || !refreshToken){
      throw new AppError("Token not found", 500, "SERVER_ERROR");
    }
 
        // Call the setCookie function
        await removeCookie('',true);
        await setCookie("refreshToken", refreshToken[1], {
          expires: 7 * 24 * 3600 * 1000,
          maxAge: 7* 24 * 3600
        }); // 7 days
        await setCookie("accessToken", accessToken[1], { expires: 24 * 3600 * 1000, maxAge: 24 * 3600}); // 1 day
        await setCookie("sessionId", sessionId, { expires: 24 * 3600 * 1000 , maxAge: 24 * 3600}); // 1 day

    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return handleServerError(error);
  }
}

export async function forgetPasswordAction(formData: FormData) {
  try {
    const email = formData.get("email")?.toString().trim();
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    if (!email) {
      throw new AppError("Email is required", 400, "VALIDATION_ERROR");
    }

    if (!validateEmail(email)) {
      throw new AppError("Invalid Email", 400, "VALIDATION_ERROR");
    }
    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/auth/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    if (!res.ok) {
      if (
        res.status === 400 ||
        res.status === 404 ||
        res.status === 401 ||
        res.status === 403
      ) {
        const data = await res.json();
        throw new AppError(data.message, res.status);
      } else {
        throw new AppError(
          "Something went wrong. Please try again later",
          500,
          "SERVER_ERROR"
        );
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

export const resetPasswordAction = async (formData: FormData) => {
  try {
    const password = formData.get("password")?.toString().trim();
    const confirmPassword = formData
      .get("passwordConfirmation")
      ?.toString()
      .trim();
    const token = formData.get("token")?.toString().trim();
    const allLogout = formData.get("allLogout")?.toString().trim();
    console.log(formData);
    if (!password || !confirmPassword || !token) {
      throw new AppError("All fields are required", 400, "VALIDATION_ERROR");
    }
    if (password !== confirmPassword) {
      throw new AppError(
        "Password and Confirm Password do not match",
        400,
        "VALIDATION_ERROR"
      );
    }
    if (!validatePassword(password)) {
      throw new AppError("Invalid Password", 400, "VALIDATION_ERROR");
    }

    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password,
          allLogout: allLogout === "checked" ? "checked" : "unchecked",
        }),
      }
    );
    if (!res.ok) {
      if (
        res.status === 400 ||
        res.status === 404 ||
        res.status === 401 ||
        res.status === 403
      ) {
        const data = await res.json();
        throw new AppError(data.message, res.status);
      } else {
        throw new AppError(
          "Something went wrong. Please try again later",
          500,
          "SERVER_ERROR"
        );
      }
    }

    return {
      success: true,
      message: "Password reset successfully",
    };
  } catch (error) {
    return handleServerError(error);
  }
};
