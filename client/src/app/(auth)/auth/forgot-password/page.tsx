import { forgetPasswordAction } from "../../components/actions";
import DefaultLayout from "../../components/DefaultLayout";
import InputField from "@/components/ui/InputTextBox";
import { email } from "@/utils/icons";

export default function ForgetPassword() {
  return (
    <DefaultLayout
      authPage="forgotpassword"
      authAction={forgetPasswordAction}
      google={false}
      remember={false}
      buttonText="Send Reset Link"
    >
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        icon={email}
      />
    </DefaultLayout>
  );
}
