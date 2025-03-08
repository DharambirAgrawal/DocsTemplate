import { APP_NAME, APP_YEAR, EMAIL } from "./data";

export const VERIFY_EMAIL_MESSAGE = ({ link }: { link: string }) => {
  return {
    subject: "🎉 One quick step to get started!",
    html: `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
  
            body {
              font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #fafafa;
              margin: 0;
              padding: 20px;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
  
            .email-wrapper {
              background-color: #fafafa;
              padding: 20px;
            }
  
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
            }
  
            .email-header {
              background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
              padding: 48px 40px;
              text-align: center;
            }
  
            .logo {
              margin-bottom: 24px;
            }
  
            .header-title {
              color: #ffffff;
              font-size: 28px;
              font-weight: 700;
              margin: 0;
              letter-spacing: -0.5px;
              line-height: 1.3;
            }
  
            .header-subtitle {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
              margin-top: 12px;
              font-weight: 500;
            }
  
            .email-content {
              padding: 48px 40px;
            }
  
            .greeting {
              font-size: 22px;
              font-weight: 600;
              color: #18181b;
              margin-bottom: 20px;
            }
  
            .message {
              color: #3f3f46;
              font-size: 16px;
              line-height: 1.7;
              margin-bottom: 32px;
            }
  
            .verification-code {
              background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%);
              border-radius: 16px;
              padding: 32px;
              text-align: center;
              margin-bottom: 32px;
              border: 1px solid rgba(124, 58, 237, 0.1);
            }
  
            .code {
              font-family: 'SF Mono', 'Roboto Mono', monospace;
              font-size: 36px;
              font-weight: 700;
              color: #7c3aed;
              letter-spacing: 6px;
              margin: 0;
              text-shadow: 0px 1px 2px rgba(124, 58, 237, 0.1);
            }
  
            .code-label {
              font-size: 14px;
              color: #6b7280;
              margin-top: 12px;
              font-weight: 500;
            }
  
            .expiry-notice {
              background-color: #fef2f2;
              border: 1px solid rgba(239, 68, 68, 0.1);
              padding: 16px 20px;
              border-radius: 12px;
              margin-bottom: 32px;
              display: flex;
              align-items: center;
              gap: 12px;
            }
  
            .expiry-icon {
              color: #ef4444;
              font-size: 20px;
            }
  
            .expiry-text {
              color: #991b1b;
              font-size: 14px;
              margin: 0;
              font-weight: 500;
            }
  
            .help-section {
              background-color: #f8fafc;
              border-radius: 12px;
              padding: 20px;
              margin-bottom: 32px;
            }
  
            .help-title {
              font-size: 16px;
              font-weight: 600;
              color: #0f172a;
              margin-bottom: 8px;
            }
  
            .help-text {
              color: #475569;
              font-size: 14px;
              line-height: 1.6;
            }
  
            .support-link {
              color: #7c3aed;
              text-decoration: none;
              font-weight: 600;
              transition: color 0.15s ease;
            }
  
            .support-link:hover {
              color: #6d28d9;
            }
  
            .email-footer {
              background-color: #f8fafc;
              padding: 32px 40px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
  
            .social-links {
              margin-bottom: 24px;
              display: flex;
              justify-content: center;
              gap: 16px;
            }
  
            .social-link {
              color: #64748b;
              text-decoration: none;
              font-size: 14px;
              font-weight: 500;
            }
  
            .footer-text {
              color: #94a3b8;
              font-size: 14px;
              margin-bottom: 16px;
              font-weight: 500;
            }
  
            .footer-links {
              color: #64748b;
              font-size: 14px;
            }
  
            .footer-link {
              color: #64748b;
              text-decoration: none;
              margin: 0 8px;
              font-weight: 500;
              transition: color 0.15s ease;
            }
  
            .footer-link:hover {
              color: #7c3aed;
            }
  
            .address {
              color: #94a3b8;
              font-size: 13px;
              margin-top: 24px;
              line-height: 1.5;
            }
  
            @media only screen and (max-width: 600px) {
              .email-header {
                padding: 40px 24px;
              }
  
              .email-content {
                padding: 40px 24px;
              }
  
              .header-title {
                font-size: 24px;
              }
  
              .greeting {
                font-size: 20px;
              }
  
              .code {
                font-size: 32px;
                letter-spacing: 4px;
              }
            }
  
            /* Button Style */
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #7c3aed;
              color: white;
              font-size: 16px;
              font-weight: 600;
              text-align: center;
              text-decoration: none;
              border-radius: 8px;
              margin-top: 20px;
              transition: background-color 0.3s;
            }
  
            .button:hover {
              background-color: #6d28d9;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-container">
              <div class="email-header">
                <div class="logo">
                  <!-- Modern minimalist logo -->
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="12" fill="white" fill-opacity="0.1"/>
                    <path d="M24 12L35.2583 17.5V28.5L24 34L12.7417 28.5V17.5L24 12Z" stroke="white" stroke-width="2.5"/>
                  </svg>
                </div>
                <h1 class="header-title">Almost there! 🚀</h1>
                <p class="header-subtitle">Let's verify your email to get you started</p>
              </div>
  
              <div class="email-content">
                <h2 class="greeting">Hey there! 👋</h2>
                <p class="message">
                  Exciting to have you on board! To keep your account secure and get you up and running, we just need to make sure this email address belongs to you.
                </p>
  
                <div class="verification-code">
                  <a href="${link}" class="button">Verify Your Email</a>
                </div>
  
                <div class="expiry-notice">
                  <span class="expiry-icon">⏰</span>
                  <p class="expiry-text">
                    This code expires in 15 minutes for your security.
                  </p>
                </div>
  
                <div class="help-section">
                  <h3 class="help-title">Need help?</h3>
                  <p class="help-text">
                    If you're having trouble or didn't request this email, please let us know at <a href="mailto:help@yourapp.com" class="support-link">help@yourapp.com</a>. We're always here to help!
                  </p>
                </div>
              </div>
  
              <div class="email-footer">
                <div class="social-links">
                  <a href="https://twitter.com/yourapp" class="social-link">Twitter</a>
                  <a href="https://instagram.com/yourapp" class="social-link">Instagram</a>
                  <a href="https://linkedin.com/company/yourapp" class="social-link">LinkedIn</a>
                </div>
                
                <p class="footer-text">© ${new Date().getFullYear()} YourApp. All rights reserved.</p>
                
                <div class="footer-links">
                  <a href="https://yourapp.com/privacy" class="footer-link">Privacy</a>
                  <span style="color: #cbd5e1">•</span>
                  <a href="https://yourapp.com/terms" class="footer-link">Terms</a>
                  <span style="color: #cbd5e1">•</span>
                  <a href="https://yourapp.com/preferences" class="footer-link">Preferences</a>
                </div>
  
                <p class="address">
                  YourApp Inc. • 123 Startup Street • San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
  };
};

export const FORGET_PASSWORD_MESSAGE = ({
  link,
  name,
}: {
  link: string;
  name: string;
}) => {
  return {
    subject: "Reset Password",
    html: `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.15);
              overflow: hidden;
          }
          .email-header {
              background-color: #4caf50;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
          }
          .email-body h1 {
              font-size: 24px;
              margin-bottom: 10px;
          }
          .reset-button {
              display: inline-block;
              margin: 20px 0;
              padding: 10px 20px;
              background-color: #4caf50;
              color: #ffffff;
              text-decoration: none;
              font-weight: bold;
              border-radius: 5px;
          }
          .reset-button:hover {
              background-color: #45a049;
          }
          .email-footer {
              text-align: center;
              font-size: 12px;
              color: #999999;
              padding: 10px 20px;
          }
          .email-footer a {
              color: #4caf50;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Password Reset Request</h1>
          </div>
          <div class="email-body">
              <p>Hi ${name},</p>
              <p>We received a request to reset your password. If you made this request, please click the button below to reset your password:</p>
              <a href="${link}" class="reset-button">Reset My Password</a>
              <p>If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.</p>
              <p>Thank you, <br>The ${APP_NAME} Team</p>
          </div>
          <div class="email-footer">
              <p>If you're having trouble clicking the button, copy and paste the following link into your browser:</p>
              <p><a href="${link}">${link}</a></p>
              <p>&copy; ${APP_YEAR} ${APP_NAME}. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `,
  };
};

export const PASSWORD_CHANGE_SUCCESSFUL_MESSAGE = ({
  link,
  name,
}: {
  link: string;
  name: string;
}) => {
  return {
    subject: "Password Changed!",
    html: `
      <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Changed Successfully</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
              overflow: hidden;
          }
          .email-header {
              background-color: #4caf50;
              color: #ffffff;
              padding: 20px;
              text-align: center;
          }
          .email-body {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
          }
          .email-body h1 {
              font-size: 24px;
              margin-bottom: 10px;
          }
          .cta-button {
              display: inline-block;
              margin: 20px 0;
              padding: 10px 20px;
              background-color: #4caf50;
              color: #ffffff;
              text-decoration: none;
              font-weight: bold;
              border-radius: 5px;
          }
          .cta-button:hover {
              background-color: #45a049;
          }
          .email-footer {
              text-align: center;
              font-size: 12px;
              color: #999999;
              padding: 10px 20px;
          }
          .email-footer a {
              color: #e53935;
              text-decoration: none;
              font-weight: bold;
          }
          .email-footer a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>Password Changed Successfully</h1>
          </div>
          <div class="email-body">
              <p>Hi ${name},</p>
              <p>Your password was successfully changed. If you made this change, no further action is needed.</p>
              <p>If you did not request this change, please click the link below to secure your account by suspending it temporarily:</p>
              <a href="${link}" class="cta-button">Suspend My Account</a>
              <p>We recommend reviewing your account activity and ensuring your account security settings are up-to-date.</p>
              <p>Thank you, <br>The ${APP_NAME} Team</p>
          </div>
          <div class="email-footer">
              <p>If you're having trouble clicking the button, copy and paste the following link into your browser:</p>
              <p><a href="${link}">${link}</a></p>
              <p>&copy; {{year}} ${APP_NAME}. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
      `,
  };
};

export const SUBSCRIPTION_MESSAGE = (link: string) => {
  return {
    subject: `Welcome to ${APP_NAME}! 🎉 Your Subscription is Confirmed`,
    html: `
      <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Blog!</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
              <td style="padding: 0;">
                  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                      <!-- Header -->
                      <div style="background: #ffffff; border-radius: 8px; padding: 40px 20px; margin-bottom: 20px; text-align: center;">
                          <h1 style="color: #333333; margin: 0; font-size: 24px; margin-bottom: 10px;">Welcome to Our Community! 🎉</h1>
                          <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0;">Thank you for subscribing to our blog</p>
                      </div>
  
                      <!-- Main Content -->
                      <div style="background: #ffffff; border-radius: 8px; padding: 40px 20px; margin-bottom: 20px;">
                          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">Hi there,</p>
                          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">We're thrilled to have you join our community! Your subscription has been confirmed, and you're now all set to receive our latest blog posts, exclusive content, and updates directly in your inbox.</p>
                          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">Here's what you can expect:</p>
                          <ul style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0; padding-left: 20px;">
                              <li style="margin-bottom: 10px;">Weekly newsletters with our best content</li>
                              <li style="margin-bottom: 10px;">Exclusive subscriber-only articles</li>
                              <li style="margin-bottom: 10px;">Early access to new features and content</li>
                          </ul>
                          
                          <!-- CTA Button -->
                          <div style="text-align: center; margin: 30px 0;">
                              <a href="${process.env.CLIENT_BASE_URL}" style="background-color: #007bff; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Visit Our Blog</a>
                          </div>
  
                          <p style="color: #333333; font-size: 16px; line-height: 1.5; margin: 0;">Best regards,<br>[Your Name]<br>Blog Owner</p>
                      </div>
  
                      <!-- Footer -->
                      <div style="text-align: center; padding: 20px;">
                          <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">Follow us on social media:</p>
                          <div style="margin-bottom: 20px;">
                              <a href="#" style="color: #007bff; text-decoration: none; margin: 0 10px;">Twitter</a>
                              <a href="#" style="color: #007bff; text-decoration: none; margin: 0 10px;">Facebook</a>
                              <a href="#" style="color: #007bff; text-decoration: none; margin: 0 10px;">Instagram</a>
                          </div>
                          <p style="color: #666666; font-size: 12px; margin: 0;">You received this email because you subscribed to our blog.<br>
                          To unsubscribe, <a href="${link}" style="color: #007bff; text-decoration: none;">click here</a></p>
                      </div>
                  </div>
              </td>
          </tr>
      </table>
  </body>
  </html>
      `,
  };
};

export const CONTACT_US_MESSAGE = ({}: {}) => {
  return {
    subject: `Thank You for Contacting Us`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Us</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
                  overflow: hidden;
              }
              .email-header {
                  background-color: #4caf50;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
              }
              .email-body {
                  padding: 20px;
                  color: #333333;
                  line-height: 1.6;
              }
              .email-body h1 {
                  font-size: 24px;
                  margin-bottom: 10px;
              }
              .email-body p {
                  margin: 10px 0;
              }
              .email-footer {
                  text-align: center;
                  font-size: 12px;
                  color: #999999;
                  padding: 10px 20px;
              }
              .email-footer a {
                  color: #4caf50;
                  text-decoration: none;
              }
              .email-footer a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">
                  <h1>Thank You for Reaching Out!</h1>
              </div>
              <div class="email-body">
                  <p>Hi there,</p>
                  <p>Thank you for contacting us. We’ve received your message and our team will get back to you as soon as possible. Your feedback is important to us, and we’re here to assist you with anything you need.</p>
                  <p>If you have any urgent questions, don’t hesitate to reach out to us directly at <a href="mailto:${EMAIL}" class="support-link">${EMAIL}</a>.</p>
              </div>
              <div class="email-footer">
                  <p>If you're having trouble clicking the link, copy and paste the following email address into your email client:</p>
                  <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
                  <p>&copy; ${new Date().getFullYear()} YourApp. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };
};

export const CONTACT_US_COPY_EMAIL = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  return {
    subject: `New Contact Us Submission from ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Us Message</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
                  overflow: hidden;
              }
              .email-header {
                  background-color: #4caf50;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
              }
              .email-body {
                  padding: 20px;
                  color: #333333;
                  line-height: 1.6;
              }
              .email-body h1 {
                  font-size: 24px;
                  margin-bottom: 10px;
              }
              .email-body p {
                  margin: 10px 0;
              }
              .email-footer {
                  text-align: center;
                  font-size: 12px;
                  color: #999999;
                  padding: 10px 20px;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">
                  <h1>New Contact Us Submission</h1>
              </div>
              <div class="email-body">
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
              </div>
              <div class="email-footer">
                  <p>&copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };
};
