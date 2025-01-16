'use client'
import DefaultLayout from "../../components/DefaultLayout";
import SignUpWithPassword from "../../components/SignUpWithPassword";
export default function SignUp() {
    return (
      <DefaultLayout authPage="signup">
        <SignUpWithPassword />
      </DefaultLayout>
    );
  }
  