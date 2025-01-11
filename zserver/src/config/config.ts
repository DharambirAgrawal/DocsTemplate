// Define types for the configuration objects
interface CloudinaryConfig {
  cloud_name: string | undefined;
  api_key: string | undefined;
  api_secret: string | undefined;
}

interface NodemailerConfig {
  service: string;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
  tls: {
    rejectUnauthorized: boolean;
  };
  host?: string;
  port?: number;
  secure?: boolean;
}

// Cloudinary configuration object
const configCloudinary: CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
};

// Nodemailer configuration object
const configNodeMailer: NodemailerConfig = {
  service: process.env.NODE_ENV === "production" ? "zoho" : "gmail", // Set service based on environment
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Ignore certificate errors (if any)
  },
};

// For Zoho in production environment, set Zoho's SMTP settings
if (process.env.NODE_ENV === "production") {
  configNodeMailer.host = "smtp.zoho.com"; // Zoho SMTP server
  configNodeMailer.port = 465; // Use SSL port for Zoho (use 587 for TLS if needed)
  configNodeMailer.secure = true; // Use secure connection for SSL (true for port 465)
}

export { configNodeMailer, configCloudinary };
