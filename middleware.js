// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ['/application/:path*'],
//   // matcher: ["/((?!register|api|about).*)"],
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();
  // check session
  console.log("session", session);
  console.log("url", url);
  // Check if the user is trying to access the main page or about page while logged in
  if (session && (url.pathname === '/' || url.pathname === '/about')) {
    url.pathname = '/application/today'; // Redirect to the dashboard or another appropriate page
    return NextResponse.redirect(url);
  }

  // If the user is not logged in and trying to access application routes, redirect to login
  if (!session && url.pathname.startsWith('/application')) {
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/application/:path*'],
  matcher: ['/', '/about', '/application/:path*'],
};
