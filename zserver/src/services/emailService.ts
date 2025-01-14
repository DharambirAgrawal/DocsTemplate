import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { AppError } from '../errors/AppError';
import { catchAsync } from '../errors/catchAsync';
import { configNodeMailer } from '../config/config';

// Define the transporter using the config
const transporter = nodemailer.createTransport(configNodeMailer);

// Define the interface for the message parameter
interface Message {
  subject: string;
  html: string;
}
interface SendEmailProps {
  TO: string;
  message: Message;
}


/**
 * Sends an email with the provided message details.
 * 
 * @param {string} TO - The recipient email address.
 * @param {Message} message - The message content (subject and HTML body).
 * @returns {Promise<void>} - A promise that resolves when the email is successfully sent.
 */
export const sendEmail = async ({TO, message}:SendEmailProps): Promise<void> => {
  // Define the mail options using the SendMailOptions interface
  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: TO, // List of recipients
    subject: message.subject, // Subject line
    html: message.html, // HTML content
  };

  // Send email and handle the promise
  await new Promise<void>((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info: SentMessageInfo) => {
      if (error) {
        reject(new AppError('Error sending Email!', 500)); // Reject the promise with the error
      } else {
        console.log('Email sent: ' + info.response);
        resolve(); // Resolve the promise on success
      }
    });
  });
}
