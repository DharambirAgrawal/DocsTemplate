import { cookies } from "next/headers";

export async function setCookie(
  name: string,
  value: string,
  options: any = {}
) {
  const cookieStore = await cookies();
  const expiresAt = new Date(
    Date.now() + (options.expires || 24 * 3600 * 1000)
  ); // Default: 1 hour
  // console.log('....................')
  //     console.log('Setting cookie:', name, value, options);
  //     console.log('....................')

  // Set cookie with the provided options or default options
  cookieStore.set(name, value, {
    httpOnly: true, // Can't be accessed via JavaScript
    secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
    expires: expiresAt, // Expiration date
    sameSite: "lax", // Allow cookies to be sent in cross-site requests, but with some restrictions
    path: "/", // Available on all paths of the site
    maxAge: 24 * 3600, // 1 day
    ...options, // Allow additional options to be passed (e.g., domain, maxAge)
  });

  // const res = await fetch(`${process.env.CLIENT_BASE_URL}/api/cookies`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${process.env.JWT_TOKEN_SECRET}`, // Add Authorization header
  //   },
  //   body: JSON.stringify({
  //     name,
  //     value,
  //     options
  //   })
  // });

  // console.log(res)

  // if(!res.ok){
  //   throw new Error("Error setting cookie");
  // }
}

export async function getCookie(name: string) {
  const cookieStore = await cookies(); // Get cookie store
  return cookieStore.get(name);
  // const res = await fetch(`${process.env.CLIENT_BASE_URL}/api/cookies`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.JWT_TOKEN_SECRET}`, // Add Authorization header
  //   },
  //   body: JSON.stringify({
  //     name,
  //   }),
  // });

  // if (!res.ok) {
  //   throw new Error("Error setting cookie");
  // }
  // const data = await res.json();
  // return data.cookie;
}

export async function removeCookie(name: string, all: boolean = false) {
  const cookieStore = await cookies(); // Get cookie store
  if (all) {
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    }); // Delete all cookies
    return;
  }
  const hasCookie = cookieStore.has(name);
  if (hasCookie) {
    cookieStore.delete(name);
  }
}
