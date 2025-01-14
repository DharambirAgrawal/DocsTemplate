import dotenv from "dotenv";
dotenv.config();
export const configCloudinary = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
};

const configNodeMailer = {
  service: process.env.NODE_ENV === "production" ? "zoho" : "gmail", // Set service based on environment
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ignore certificate errors (if any)
  },
};

// For Zoho in development environment, set Zoho's SMTP settings
if (process.env.NODE_ENV === "production") {
  configNodeMailer.host = "smtp.zoho.com"; // Zoho SMTP server
  configNodeMailer.port = 465; // Use SSL port for Zoho (use 587 for TLS if needed)
  configNodeMailer.secure = true; // Use secure connection for SSL (true for port 465)
}

export { configNodeMailer };
