import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define role types with hierarchy
export type UserRole = "USER" | "AUTHOR" | "ADMIN";

// Interface for JWT payload
interface JWTPayload {
  role: UserRole;
  userId: string;
  exp: number;
}

const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];
const REDIRECT_URL = "/dashboard/home";
// Define role-based route permissions
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  USER: [
    "/dashboard/home",
    "/dashboard/profile",
    "/dashboard/calendar",
    "/dashboard/images/upload",
    "/dashboard/images/gallery",
    "/dashboard/users",
    "/dashboard/posts/view",
    "/dashboard/posts/upload",
    "/dashboard/settings",
  ],
  AUTHOR: [
    "/dashboard/home",
    "/dashboard/profile",
    "/dashboard/create-post",
    "/dashboard/posts/upload",
    "/dashboard/posts/view",
    "/dashboard/images/upload",
    "/dashboard/images/gallery",
    "/dashboard/my-posts",
  ],
  ADMIN: [
    "/dashboard/home",
    "/dashboard/profile",
    "/dashboard/calendar",
    "/dashboard/images/upload",
    "/dashboard/images/gallery",
    "/dashboard/users",
    "/dashboard/posts/view",
    "/dashboard/posts/upload",
    "/dashboard/settings",
  ],
};

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();

  // If the route is an auth route, check if the user is logged in already.
  if (AUTH_ROUTES.includes(path)) {
    if (!refreshToken) {
      return NextResponse.next();
    }
    try {
      // Attempt to validate the refresh token
      const res = await fetch(`${process.env.SERVER_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      const data = await res.json();
    
      if (data.status === "success") {
 
        // If refresh token is valid, redirect to the dashboard
        return NextResponse.redirect(new URL(REDIRECT_URL, request.url));
      }
    } catch (error) {
      console.error("Error validating refresh token:", error);
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // If the path starts with /dashboard and no access token is present, redirect to login
  if (path.startsWith("/dashboard")) {
    try {
      const getAccessToken = await fetch(
        `${process.env.SERVER_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        }
      );

      if (!getAccessToken.ok) {
        throw new Error("Failed to fetch access token");
      }
      const data = await getAccessToken.json();
      const cookie_string = getAccessToken.headers.get("set-cookie");

      if (!cookie_string) {
        throw new Error("No Set-Cookie header in response");
      }
      const accessToken = cookie_string.match(/access_token=([^;]+)/);
      if (!accessToken) {
        throw new Error("No access token in Set-Cookie header");
      }
      const { role } = data.data as { role: UserRole };
      response.cookies.set({
        name: "ROLE",
        value: role,
        path: "/",
        maxAge: 24 * 3600,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Only secure in production
        sameSite: "lax",
      });
      response.cookies.set({
        name: "accessToken",
        value: accessToken[1],
        path: "/",
        maxAge: 24 * 3600,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Only secure in production
        sameSite: "lax",
      });

//handling roles and prermessions
      const allowedRoutes = ROLE_PERMISSIONS[role] || [];

      if (!allowedRoutes.includes(path)) {
        return NextResponse.rewrite(new URL('/404', request.url));
    
      }
      return NextResponse.next();
    } catch (error) {
      console.error("Error validating access token:", error);
      const response = NextResponse.redirect(
        new URL("/auth/signin", request.url)
      );
      response.cookies.delete("refreshToken");
      return response;
    }
    // Here you can optionally verify the access token or check for user roles, if necessary.
  }

  // If we reached here, it means the user is unauthenticated and trying to access a protected route.
  return NextResponse.redirect(new URL("/auth/signin", request.url));
}

// Configure routes to be protected
export const config = {
  matcher: [
    "/auth/:path*", // Authentication routes
    "/dashboard/:path*", // Dashboard routes with role-based protection
  ],
};
