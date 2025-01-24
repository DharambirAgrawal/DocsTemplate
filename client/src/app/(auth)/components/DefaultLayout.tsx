"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ButtonUI } from "@/components/ui/ButtonUi";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import GoogleSigninButton from "./GoogleSigninButton";
import Image from "next/image";
import { Container } from "@/components/Container";
import { showToast } from "@/features/ToastNotification/useToast";
import { TickIcon } from "@/utils/icons";
type AuthPageType = "signin" | "signup" | "forgotpassword" | "resetpassword";

interface DefaultLayoutProps {
  children: React.ReactNode;
  google?: boolean;
  remember?: boolean;
  forgetPassword?: boolean;
  authPage: AuthPageType; // Determine which page layout to show
  buttonText?: string; // Custom text for the button
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // Allow additional button props (like onClick, className, etc.)
  authAction: (formData: any) => Promise<any>;
  value?: any;
}
interface UserData {
  platform: string;
  userAgent: string;
  browser: string;
  language: string;
  timezoneOffset: number;
  deviceFingerprint: string;
}

export default function DefaultLayout({
  children,
  google = true,
  remember = true,
  forgetPassword = true,
  authPage,
  buttonText = "Sign In", // Default text for the button
  buttonProps = {}, // Default to empty object to allow other button props
  authAction,
  value,
}: DefaultLayoutProps) {
  const router = useRouter();
  const renderHeading = () => {
    switch (authPage) {
      case "signup":
        return {
          title: "Create an Account",
          subtitle: "Sign up to get started",
        };
      case "forgotpassword":
        return {
          title: "Forgot Password?",
          subtitle: "Enter your email to reset",
        };
      case "resetpassword":
        return {
          title: "Reset Password",
          subtitle: "Enter your new password",
        };
      case "signin":
      default:
        return { title: "Welcome Back!", subtitle: "Sign in to your account" };
    }
  };

  const renderLinks = () => {
    switch (authPage) {
      case "signup":
        return (
          <p>
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        );
      case "forgotpassword":
        return (
          <p>
            Remember your password?{" "}
            <Link href="/auth/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        );
        case "resetpassword":
          return (
            <p>
              Remember your password?{" "}
              <Link href="/auth/signin" className="text-primary">
                Sign In
              </Link>
            </p>
          );
      case "signin":
      default:
        return (
          <p>
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-primary">
              Sign Up
            </Link>
          </p>
        );
    }
  };

  const [userData, setUserData] = useState<UserData>({
    platform: "",
    userAgent: "",
    browser: "",
    language: "",
    timezoneOffset: 0,
    deviceFingerprint: "",
  });
  // Helper function to determine browser
  const getBrowser = (userAgent: string): string => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown";
  };

  useEffect(() => {
    // Get client-side data
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    const browser = getBrowser(userAgent);
    const language = navigator.language || navigator.languages[0];
    const timezoneOffset = new Date().getTimezoneOffset();
    const deviceFingerprint = `${userAgent}-${platform}-${language}`;

    // Fetch IP from API
    const fetchIp = async () => {
      setUserData({
        platform,
        userAgent,
        browser,
        language,
        timezoneOffset,
        deviceFingerprint,
      });
    };

    fetchIp();
  }, []);
  return (
    <>
      <Container>
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex flex-wrap ">
            <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
              <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
                <Link className="mb-10 inline-block" href="/">
                  <Image
                    className="hidden dark:block"
                    src={"/images/logo/logo.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                  <Image
                    className="dark:hidden"
                    src={"/images/logo/logo-dark.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                </Link>
                <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                  {renderHeading().subtitle}
                </p>

                <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                  {renderHeading().title}
                </h1>

                <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                  Please sign in to your account by completing the necessary
                  fields below
                </p>

                <div className="mt-31">
                  <Image
                    src={"/images/grids/grid-02.svg"}
                    alt="Logo"
                    width={405}
                    height={325}
                    className="mx-auto dark:opacity-30"
                  />
                </div>
              </div>
            </div>

            <div className="w-full xl:w-1/2">
              <form
                className="w-full p-4 sm:p-12.5 xl:p-15"
                action={async (formData) => {
                  if (authPage === "signin") {
                    formData.append(
                      "deviceFingerprint",
                      userData.deviceFingerprint
                    );
                    formData.append("platform", userData.platform);
                    formData.append("userAgent", userData.userAgent);
                    formData.append("browser", userData.browser);
                    formData.append("language", userData.language);
                    formData.append(
                      "timezoneOffset",
                      userData.timezoneOffset.toString()
                    );
                  } else if (authPage === "resetpassword") {
                    formData.append("token", value || "");
                  }
                  const res = await authAction(formData);
                  if (res.success) {
                    showToast("success", res.message || "Success");
                    if (authPage === "signup") {
                      router.push("/auth/verify-email");
                    }else if (authPage === "signin"){
                      router.push("/dashboard/home");
                    }
                  } else {
                    showToast(
                      "error",
                      res.error.message || "Something went wrong"
                    );
                  }
                }}
              >
                {google && (
                  <>
                    <GoogleSigninButton
                      text={authPage === "signin" ? "Sign In" : "Sign Up"}
                      disabled={false}
                    />
                    <div className="my-6 flex items-center justify-center">
                      <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                      <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                        Or {authPage === "signin" ? "sign in" : "sign up"} with
                        email
                      </div>
                      <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                    </div>
                  </>
                )}
                {children}
                {authPage === "signin" && (
                  <div className="my-6 flex justify-between">
                    {remember && (
                      <label
                        htmlFor="remember"
                        className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
                      >
                        <input
                          type="checkbox"
                          name="remember"
                          value="checked"
                          id="remember"
                          className="peer sr-only"
                        />
                        <span className="mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5">
                          <TickIcon />
                        </span>
                        Remember me
                      </label>
                    )}
                    {forgetPassword && (
                      <Link
                        href="/auth/forgot-password"
                        className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
                      >
                        Forgot Password?
                      </Link>
                    )}
                  </div>
                )}

                <div className="mb-4.5">
                  <ButtonUI
                    children={buttonText}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                    type="submit"
                    size="lg"
                    variant="default"
                    {...buttonProps} // Spread additional button props
                  />
                </div>
                {authPage === "signup" && (
                  <div className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <Link href="#" className="text-blue-600 hover:underline">
                      {" "}
                      Terms and Conditions
                    </Link>{" "}
                    and
                    <Link href="#" className="text-blue-600 hover:underline">
                      {" "}
                      Privacy Policy
                    </Link>
                    .
                  </div>
                )}
                <div className="mt-6 text-center">{renderLinks()}</div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
