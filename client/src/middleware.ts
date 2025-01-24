// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // export async function middleware(request: NextRequest) {
// //   // Get the sessionId cookie

// // // console.log(cookie)
// // const allCookies = request.cookies.getAll()
// // // console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/auth/:path*", "/dashboard/:path*"],
// // };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Define role types with hierarchy
// export type UserRole = "user" | "author" | "admin";

// // Interface for JWT payload
// interface JWTPayload {
//   role: UserRole;
//   userId: string;
//   exp: number;
// }
// const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];
// const REDIRECT_URL = "/dashboard/home";
// // Define role-based route permissions
// const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
//   user: ["/dashboard/home", "/dashboard/profile"],
//   author: [
//     "/dashboard/home",
//     "/dashboard/profile",
//     "/dashboard/create-post",
//     "/dashboard/my-posts",
//   ],
//   admin: [
//     "/dashboard/home",
//     "/dashboard/profile",
//     "/dashboard/create-post",
//     "/dashboard/my-posts",
//     "/dashboard/user-management",
//     "/dashboard/analytics",
//   ],
// };

// export async function middleware(request: NextRequest) {
//   // Extract the token from cookies
//   const refreshToken = request.cookies.get("refreshToken")?.value;
//   const accessToken = request.cookies.get("accessToken")?.value;

//   // Get the current path
//   const path = request.nextUrl.pathname;
//   // Define public routes
//   if (AUTH_ROUTES.includes(path) && refreshToken) {
//     // If user is already logged in and tries to access login, redirect to dashboard
//     try {
//       // Verify the token to get the role
//       const res = await fetch(`${process.env.SERVER_BASE_URL}/api/auth/login`, {
//         method: "POST",
//         headers: {
//           Cookie: `refreshToken=${refreshToken}`,
//         },
//       });

//       const data = await res.json();
//       if (data.status === "success") {
//         // Redirect to dashboard
//         return NextResponse.redirect(new URL(REDIRECT_URL, request.url));
//       }
//       return 
//       // return NextResponse.redirect(new URL("/dashboard/home", request.url));
//     } catch (error) {
//       console.log(error)
//       // If token is invalid, clear the cookie and stay on login page
//       const response = NextResponse.next();
//       response.cookies.delete("refreshToken");
//       return response;
//     }
//   }
//   // If no token exists, redirect to login for protected routes
//   if (path.startsWith("/dashboard") && accessToken) {
    
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/auth/signin", request.url));

//   // Verify the JWT token
//   try {
//     // Check if the current route is allowed for the user's role
//   } catch (error) {
//     // If token verification fails, redirect to login and clear invalid token
//     const response = NextResponse.redirect(new URL("/login", request.url));
//     response.cookies.delete("authToken");
//     return response;
//   }
// }

// // Configure routes to be protected
// export const config = {
//   matcher: [
//     // Authentication routes
//     "/auth/:path*",

//     // Dashboard routes with role-based protection
//     "/dashboard/:path*",
//   ],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define role types with hierarchy
export type UserRole = "user" | "author" | "admin";

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
  user: ["/dashboard/home", "/dashboard/profile"],
  author: [
    "/dashboard/home",
    "/dashboard/profile",
    "/dashboard/create-post",
    "/dashboard/my-posts",
  ],
  admin: [
    "/dashboard/home",
    "/dashboard/profile",
    "/dashboard/create-post",
    "/dashboard/my-posts",
    "/dashboard/user-management",
    "/dashboard/analytics",
  ],
};

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  // If the route is an auth route, check if the user is logged in already.
  if (AUTH_ROUTES.includes(path) ) {
    if(!refreshToken){
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
      // If refresh token is invalid or expired, clear it and stay on login page
      const response = NextResponse.next();
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  // If the path starts with /dashboard and no access token is present, redirect to login
  if (path.startsWith("/dashboard")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    // Here you can optionally verify the access token or check for user roles, if necessary.
    try {
      // Perform token verification here (JWT decoding or a call to a verification endpoint)
      // For now, assuming the access token is valid and proceeding with the flow.
      return NextResponse.next();
    } catch (error) {
      console.error("Error verifying access token:", error);
      // In case of invalid access token, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/auth/signin", request.url));
      response.cookies.delete("accessToken");
      return response;
    }
  }

  // If we reached here, it means the user is unauthenticated and trying to access a protected route.
  return NextResponse.redirect(new URL("/auth/signin", request.url));
}

// Configure routes to be protected
export const config = {
  matcher: [
    "/auth/:path*",   // Authentication routes
    "/dashboard/:path*",  // Dashboard routes with role-based protection
  ],
};
