"use client";
import { useState, useEffect } from "react";
import { resendEmailVerificationAction } from "../../auth/actions";
import { showToast } from "@/features/ToastNotification/useToast";
import Link from "next/link";
export default function VerifyEmail({ email }: { email: string }) {
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);
  
  useEffect(() => {
    // Check if the cooldown has expired on page load (you can get this data from the backend)
    const lastSentAt = localStorage.getItem("lastVerificationSentAt");
    const cooldownPeriod = 2 * 60 * 1000; // 5 minutes

    if (lastSentAt) {
      const timePassed = Date.now() - parseInt(lastSentAt);
      if (timePassed < cooldownPeriod) {
        setCanResend(false);
        setCountdown(Math.ceil((cooldownPeriod - timePassed) / 1000)); // show remaining time in seconds
      }
    }

    // Start a countdown timer if cooldown is active
    let timer: NodeJS.Timeout;
    if (!canResend && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup the timer on component unmount
  }, [canResend, countdown]);

  const handleResendEmail = async () => {
    const res = await resendEmailVerificationAction(email);

    if (res.success) {
      showToast("success", res.message || "Verification email sent.");
      // Store the timestamp of when the email was sent
      localStorage.setItem("lastVerificationSentAt", Date.now().toString());
      setCanResend(false);
      setCountdown(2 * 60); // 2 minutes cooldown
    } else {
        localStorage.setItem("lastVerificationSentAt", Date.now().toString());
        setCanResend(false);
        setCountdown(2 * 60); // 2 minutes cooldown
      showToast("error", res.error?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full space-y-6">
        <h1 className="text-3xl font-semibold text-center text-indigo-700">
          Verify Your Email
        </h1>
        <p className="text-lg text-gray-600 text-center">
          We’ve sent a verification email to{" "}
          <span className="font-semibold text-indigo-600">{email}</span>.
        </p>

        <p className="text-gray-500 mt-4 text-center">
          Please check your inbox and click on the verification link to activate your account.
        </p>

        <p className="text-gray-500 mt-2 text-center">
          Didn’t receive the email? You can{" "}
          <button
            disabled={!canResend}
            onClick={handleResendEmail}
            className={`text-indigo-600 font-semibold hover:underline ${!canResend ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            resend it here.
          </button>
        </p>

        {countdown > 0 && !canResend && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Please wait {countdown} seconds before trying again.
          </p>
        )}

        {/* Go to Login Button */}
        <div className="text-center">
          <Link
            className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out"
            href="/auth/login"
          >
            Go to Login
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            If you don’t see the email in your inbox, please check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
}
