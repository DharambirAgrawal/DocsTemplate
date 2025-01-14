import { APP_NAME, APP_ROUTE } from "../../data.js";
export const SUBSCRIPTION_MESSAGE = (token) => {
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
                            <a href="${APP_ROUTE}" style="background-color: #007bff; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Visit Our Blog</a>
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
                        To unsubscribe, <a href="${APP_ROUTE}/api/unsubscribe/${token}" style="color: #007bff; text-decoration: none;">click here</a></p>
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
