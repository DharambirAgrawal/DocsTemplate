
import { cookies } from "next/headers"; // Ensure 'cookies' import is correct
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Read the authorization header
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization header missing",
        },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Authorization header format",
        },
        { status: 400 }
      );
    }

    // Validate token against the secret
    if (token !== process.env.JWT_TOKEN_SECRET) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Parse JSON body from the request
    const { name, value, options = {} } = await request.json();

    if (!name || !value) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing "name" or "value" in request body',
        },
        { status: 400 }
      );
    }

    // Set default expiration time if it's not provided in options
    const expiresAt = new Date(Date.now() + (options.expires || 3600 * 1000)); // Default: 1 hour

    // Create a response using NextResponse
    const response = NextResponse.json({
      success: true,
      message: "Cookie set successfully",
    });

    // Use the built-in cookie helper to set the cookie
    response.cookies.set({
      name,
      value,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Only secure in production
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
      maxAge: options.maxAge || 86400, // 1 day default
    });
    const res = await fetch(`${process.env.CLIENT_BASE_URL}/api/cookies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "set-cookie": `hello=world; HttpOnly; SameSite=lax; Path=/; Max-Age=86400; Expires=${expiresAt.toUTCString()}`,
        },
    });

    console.log(response.cookies)

    return response;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the request",
      },
      { status: 500 }
    );
  }
}


export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Authorization header missing",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } } // 401 Unauthorized
      );
    }

    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid Authorization header format",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } } // 400 Bad Request
      );
    }

    // Validate token against the secret
    if (token !== process.env.JWT_TOKEN_SECRET) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json" } } // 401 Unauthorized
      );
    }
    // Parse JSON body from the request
    const { name } = await request.json();
    if (!name) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing "name" or "value" in request body',
        }),
        { status: 400, headers: { "Content-Type": "application/json" } } // 400 Bad Request
      );
    }

    const cookieStore = await cookies(); // Get cookie store
    const cookie = cookieStore.get(name);
    return Response.json({ success: true, cookie: cookie });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while processing the request",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } } // 500 Internal Server Error
    );
  }
}


export async function DELETE(request: NextRequest) {
    
        const cookieStore = await cookies(); // Get cookie store
       const cookie = cookieStore.getAll();
       console.log(cookie)
       const expiresAt = new Date(Date.now() + ( 3600 * 1000)); // Default: 1 hour
       cookieStore.set('hello', "world", {
        httpOnly: true, // Can't be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
        expires: expiresAt , // Expiration date
        sameSite: "lax", // Allow cookies to be sent in cross-site requests, but with some restrictions
        path: "/", // Available on all paths of the site
        maxAge: 24 * 3600, // 1 day
      });
      console.log('...........')
      const cookie1 = cookieStore.getAll();
       console.log(cookie1)
  
       return Response.json({ success: true, cookie: cookie });
}


// export async function POST(request: NextRequest) {
//     try {
//       // Read the authorization header
//       const authHeader = request.headers.get("Authorization");
  
//       if (!authHeader) {
//         return new Response(
//           JSON.stringify({
//             success: false,
//             message: "Authorization header missing",
//           }),
//           { status: 401, headers: { "Content-Type": "application/json" } } // 401 Unauthorized
//         );
//       }
  
//       const token = authHeader?.split("Bearer ")[1];
  
//       if (!token) {
//         return new Response(
//           JSON.stringify({
//             success: false,
//             message: "Invalid Authorization header format",
//           }),
//           { status: 400, headers: { "Content-Type": "application/json" } } // 400 Bad Request
//         );
//       }
  
//       // Validate token against the secret
//       if (token !== process.env.JWT_TOKEN_SECRET) {
//         return new Response(
//           JSON.stringify({ success: false, message: "Invalid token" }),
//           { status: 401, headers: { "Content-Type": "application/json" } } // 401 Unauthorized
//         );
//       }
//       // Parse JSON body from the request
//       const { name, value, options = {} } = await request.json();
  
//       if (!name || !value) {
//         return new Response(
//           JSON.stringify({
//             success: false,
//             message: 'Missing "name" or "value" in request body',
//           }),
//           { status: 400, headers: { "Content-Type": "application/json" } } // 400 Bad Request
//         );
//       }
  
//       // Get cookie store
//       const cookieStore = await cookies();
  
//       // Set default expiration time if it's not provided in options
//       const expiresAt = new Date(Date.now() + (options.expires || 24*3600 * 1000)); // Default: 1 hour
//       // console.log('....................')
//       //     console.log('Setting cookie:', name, value, options);
//       //     console.log('....................')
  
//       // Set cookie with the provided options or default options
//       cookieStore.set(name, value, {
//         httpOnly: true, // Can't be accessed via JavaScript
//         secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
//         expires: expiresAt, // Expiration date
//         sameSite: "lax", // Allow cookies to be sent in cross-site requests, but with some restrictions
//         path: "/", // Available on all paths of the site
//         maxAge: 24 * 3600, // 1 day
//         ...options, // Allow additional options to be passed (e.g., domain, maxAge)
//       });
  
    
  
//       // If everything is good, return success message
//       return new Response(
//         JSON.stringify({ success: true, message: "Hello World" }),
//         { status: 200, headers: { "Content-Type": "application/json", 
//           "Set-Cookie": `hello=world; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400; Expires=${expiresAt.toUTCString()}` }
//           } // 200 OK
//       );
//     } catch (error) {
//       console.error("Error processing request:", error);
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "An error occurred while processing the request",
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } } // 500 Internal Server Error
//       );
//     }
//   }
  