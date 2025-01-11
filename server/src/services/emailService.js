// Import nodemailer
import nodemailer from "nodemailer";
import { AppError } from "../errors/AppError.js";
import asyncHandler from "express-async-handler";
import { configNodeMailer } from "../config/config.js";
const transporter = nodemailer.createTransport(configNodeMailer);

// Define email options

export const sendEmail = asyncHandler(async (TO, message) => {
  console.log(configNodeMailer);
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: TO, // List of recipients
    subject: message.subject, // Subject line
    html: message.html,
  };

  // Send email
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(new AppError("Error sending Email!", 500)); // Reject the promise with the error
      } else {
        console.log("Email sent: " + info.response);
        resolve(info); // Resolve the promise on success
      }
    });
  });
});
