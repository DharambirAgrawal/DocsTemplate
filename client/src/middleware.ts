import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  // Get the sessionId cookie


// console.log(cookie)
const allCookies = request.cookies.getAll()
// console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
