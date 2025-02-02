import type { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const url = request.nextUrl

  console.log(url)

  console.log(request.body)
  return Response.json({ message: 'Hello World' })
}