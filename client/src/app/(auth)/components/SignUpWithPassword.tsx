"use client";
import { showToast } from "@/features/ToastNotification";
import { signupAction } from "../auth/actions";

export default function SignUpWithPassword() {
  return (
    
      <form
        className="space-y-6"
        action={async (formData) => {
          const res = await signupAction(formData);
          showToast("success", "Signin Success");
        }}
      >
        {/* First Name */}
        <div>
          <label
            htmlFor="FirstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="FirstName"
            name="firstName"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="LastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="LastName"
            name="lastName"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="email"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="password"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Confirmation */}
        <div>
          <label
            htmlFor="PasswordConfirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="PasswordConfirmation"
            name="passwordConfirmation"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Marketing Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="MarketingAccept"
            name="accept"
            className="mr-2 rounded-sm"
          />
          <span className="text-sm text-gray-600">
            I want to receive emails about events, product updates, and company
            announcements.
          </span>
        </div>

        {/* Terms and Conditions */}
        <div className="text-sm text-gray-500">
          By creating an account, you agree to our
          <a href="#" className="text-blue-600 hover:underline">
            {" "}
            Terms and Conditions
          </a>{" "}
          and
          <a href="#" className="text-blue-600 hover:underline">
            {" "}
            Privacy Policy
          </a>
          .
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create an Account
          </button>
        </div>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <a href="#" className="text-blue-600 hover:underline">
            {" "}
            Log in
          </a>
          .
        </p>
      </form>
  );
}
