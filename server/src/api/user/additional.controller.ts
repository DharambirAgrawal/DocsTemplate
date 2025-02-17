import { Request, Response } from "express";
import { validateEmail } from "../../utils/utils";
import { EMAIL } from "../../utils/data";
import {
  CONTACT_US_MESSAGE,
  CONTACT_US_COPY_EMAIL,
} from "../../utils/EmailMessages";
import { sendEmail } from "../../services/emailService";

export const constactUs = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }
  await sendEmail({ TO: email, message: CONTACT_US_MESSAGE({}) });
  await sendEmail({
    TO: EMAIL,
    message: CONTACT_US_COPY_EMAIL({ name, email, message }),
  });
  // Send email logic here
  return res.status(200).json({ message: "Message sent successfully" });
};
