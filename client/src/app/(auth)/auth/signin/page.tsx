import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Metadata } from "next";
import { signinAction } from "../../components/actions";
import InputField from "@/components/ui/InputTextBox";
import { lock, email } from "@/utils/icons";

export const metadata: Metadata = {
  title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};

const SignIn: React.FC = () => {
  return (
    <DefaultLayout
      authPage="signin"
      authAction={signinAction}
      buttonText="Sign In"
    >
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        icon={email}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        icon={lock}
      />
    </DefaultLayout>
  );
};

export default SignIn;
