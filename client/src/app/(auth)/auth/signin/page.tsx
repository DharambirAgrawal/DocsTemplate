import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import { Metadata } from "next";
import SigninWithPassword from "../../components/SigninWithPassword";

export const metadata: Metadata = {
  title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};

const SignIn: React.FC = () => {
  return (
    <DefaultLayout authPage="signin">
    <SigninWithPassword />
    </DefaultLayout>
  );
};

export default SignIn;
