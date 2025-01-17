import DefaultLayout from "../../components/DefaultLayout";
import { signupAction } from "../actions";
import InputField from "@/components/ui/InputTextBox";
import { lock, email } from "@/utils/icons";
import { TickIcon } from "@/utils/icons";
export default function SignUp() {
  return (
    
      <DefaultLayout
        authPage="signup"
        authAction={signupAction}
        buttonText="Sign Up"
        google={true}
      >
        {/* First Name */}
        <InputField
          label="FirstName"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
        />
        <InputField
          label="LastName"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
        />
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

        <InputField
          label="Password Confirmation"
          name="passwordConfirmation"
          type="password"
          placeholder="Confirm your password"
          icon={lock}
        />

        {/* Marketing Checkbox */}
        <label
          htmlFor="remember"
          className="flex pb-2 cursor-pointer text-sm select-none items-center font-satoshi font-medium text-dark dark:text-white"
        >
          <input
            type="checkbox"
            name="subscribe"
            value="checked"
            id="remember"
            className="peer sr-only"
          />
          <span className="mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5">
         <TickIcon />
          </span>
          I want to receive emails about events, product updates, and company
          announcements.
        </label>
      </DefaultLayout>
    
  );
}
