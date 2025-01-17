import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string, options: any = {}) {
    const cookieStore = await cookies();  // Get cookie store
  
    // Set the default expiration time (1 hour from now) if it's not provided in options
    const expiresAt = options.expires || new Date(Date.now() + 3600 * 1000); // 1 hour from now
  
    // Set cookie with the given options, or default options if not specified
    cookieStore.set(name, value, {
      httpOnly: true,      // Can't be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
      expires: expiresAt, // Expiration date
      sameSite: 'lax',     // Allow cookies to be sent in cross-site requests, but with some restrictions
      path: '/',           // Available on all paths of the site
      ...options           // Allow additional options to be passed (e.g., domain, maxAge)
    });
  }
  
  
  export async function getCookie(name: string) {
    const cookieStore = await cookies();  // Get cookie store
    return cookieStore.get(name);
  }