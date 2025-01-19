import DefaultLayout from "../../../components/DefaultLayout";
import InputField from "@/components/ui/InputTextBox";
import { lock } from "@/utils/icons";
import { resetPasswordAction } from "../../actions";
import { TickIcon } from "@/utils/icons";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  if (!params || !token) {
    return notFound();
  }
  const resetPassword = await fetch(
    `${process.env.SERVER_BASE_URL}/api/auth/reset-password/${token}`
  );

  if (!resetPassword.ok) {
    return notFound()
  }
  return (
    <DefaultLayout
      authPage="resetpassword"
      authAction={resetPasswordAction}
      google={false}
      remember={false}
      buttonText="Reset Password"
      value={token}
    >
      <InputField
        label="Password"
        name="password"
        type="password"
        icon={lock}
        placeholder="Enter your password"
        required={true}
      />
      <InputField
        label="Confirm Password"
        name="passwordConfirmation"
        type="password"
        icon={lock}
        required={true}
        placeholder="Enter your password"
      />
      <label
        htmlFor="remember"
        className="flex mb-2 cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
      >
        <input
          type="checkbox"
          name="allLogout"
          value="checked"
          id="remember"
          className="peer sr-only"
        />
        <span className="mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5">
          <TickIcon />
        </span>
        Logout from all devices
      </label>
    </DefaultLayout>
  );
}
