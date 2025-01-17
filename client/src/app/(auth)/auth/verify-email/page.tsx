import { getCookie } from "@/lib/cookies";
import { resendEmailVerificationAction } from "../actions";
import { notFound } from "next/navigation";
import VerifyEmail from "../../components/verify-email";
export default async function AuthVerifyEmailPage() {
  const email = await getCookie("email");

  if (email && email.name === "email") {
    return (
      <VerifyEmail email={email.value}/>
    );
  } else {
    notFound();
  }
}
