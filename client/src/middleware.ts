import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from 'next/headers'
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  // Get the sessionId cookie
  const cookie = await cookieStore.getAll()
console.log(cookie)
const allCookies = request.cookies.getAll()
console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
