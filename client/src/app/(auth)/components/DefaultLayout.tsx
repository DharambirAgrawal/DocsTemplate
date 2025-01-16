import Link from "next/link";
import React from "react";
import GoogleSigninButton from "./GoogleSigninButton";
import Image from "next/image";
import { Container } from "@/components/Container";

type AuthPageType = "signin" | "signup" | "forgotpassword";

interface DefaultLayoutProps {
  children: React.ReactNode;
  google?: boolean;
  remember?: boolean;
  forgetPassword?: boolean;
  authPage: AuthPageType; // Determine which page layout to show
  buttonText?: string; // Custom text for the button
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // Allow additional button props (like onClick, className, etc.)
}

export default function DefaultLayout({
  children,
  google = true,
  remember = true,
  forgetPassword = true,
  authPage,
  buttonText = "Sign In", // Default text for the button
  buttonProps = {}, // Default to empty object to allow other button props
}: DefaultLayoutProps) {
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

  return (
    <Container>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
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
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              {google && authPage !== "signup" && (
                <>
                  <GoogleSigninButton
                    text={authPage === "signin" ? "Sign In" : "Sign Up"}
                  />
                  <div className="my-6 flex items-center justify-center">
                    <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
                    <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
                      Or sign in with email
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
                    <span
                      className="mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5"
                    >
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
                          fill="currentColor"
                        />
                      </svg>
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
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                  {...buttonProps} // Spread additional button props
                >
                  {buttonText} {/* Button text */}
                </button>
              </div>
              <div className="mt-6 text-center">{renderLinks()}</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
