"use server";

import { validateEmail } from "@/lib/utils";

export const contactAction = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email") as string;
  const message = formData.get("message");

  if (!name || !email || !message) {
    return;
  }

  if (!validateEmail(email)) {
    return;
  }
  try {
    // Send email logic here
    const res = await fetch(
      `${process.env.SERVER_BASE_URL}/api/user/contact-us`,
      {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
  } catch (e) {
    console.log(e);
  }

  return;
};
