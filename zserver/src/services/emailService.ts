import nodemailer, { SendMailOptions } from "nodemailer";
import { AppError } from "../errors/AppError.js";
import asyncHandler from "express-async-handler";
import { configNodeMailer } from "../config/config.js";

// Define the transporter using the config
const transporter = nodemailer.createTransport(configNodeMailer);

// Define the interface for the message parameter
interface Message {
  subject: string;
  html: string;
}

// Define the function that sends the email
export const sendEmail = asyncHandler(async (TO: string, message: Message): Promise<void> => {
  console.log(configNodeMailer);

  // Define the mail options using the SendMailOptions interface
  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: TO, // List of recipients
    subject: message.subject, // Subject line
    html: message.html, // HTML content
  };

  // Send email and handle the promise
  await new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(new AppError("Error sending Email!", 500)); // Reject the promise with the error
      } else {
        console.log("Email sent: " + info.response);
        resolve(); // Resolve the promise on success
      }
    });
  });
});
