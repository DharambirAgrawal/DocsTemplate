import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";
import { getCookie } from "./lib/cookies";

export async function middleware(request: NextRequest) {
  // Get the cookies from the request
  const accessToken = await getCookie("access_token");
  const refreshToken = await getCookie("refresh_token");
  // console.log('Access Token:', accessToken);
  // console.log('Refresh Token:', refreshToken);
  const cookies = parse(request.headers.get("cookie") || "");
  console.log(cookies);
  console.log(accessToken);
  console.log(refreshToken);
  console.log("........................");
  let cookie = request.cookies.get("access_token");
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

  // Get the sessionId from the Authorization header (if available)
  const authHeader = request.headers.get("Authorization");
  let sessionId = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    sessionId = authHeader.substring(7); // Remove "Bearer " prefix
  }
  console.log("authHeader:", authHeader);
  console.log("sessionId:", sessionId);

  //   console.log('Access Token:', accessToken);
  //   console.log('Refresh Token:', refreshToken);
  //   console.log('Session ID:', sessionId);

const res= await fetch(`${process.env.SERVER_BASE_URL}/api/test/server`);
const header= res.headers.get("Authorization");
console.log(header)
// console.log(res)



  // Optionally, you can handle authentication or other logic here

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: "/auth/:path*",
};
