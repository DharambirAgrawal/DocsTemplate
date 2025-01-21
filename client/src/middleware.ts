import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { getCookie } from './lib/cookies';

export async function middleware(req) {
  // Get the cookies from the request
  const accessToken= await getCookie('access_token');
    const refreshToken = await  getCookie('refresh_token');  
    // console.log('Access Token:', accessToken);
    // console.log('Refresh Token:', refreshToken);
    const cookies = parse(req.headers.get('cookie') || '');
console.log(cookies)


  // Get the sessionId from the Authorization header (if available)
  const authHeader = req.headers.get('Authorization');
  let sessionId = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    sessionId = authHeader.substring(7); // Remove "Bearer " prefix
  }
  console.log('authHeader:', authHeader)
  console.log('sessionId:', sessionId);

//   console.log('Access Token:', accessToken);
//   console.log('Refresh Token:', refreshToken);
//   console.log('Session ID:', sessionId);

  // Optionally, you can handle authentication or other logic here

  // Allow the request to continue
  return NextResponse.next();
}
