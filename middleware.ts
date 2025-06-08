import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const tinybirdCredentials = request.cookies.get("tinybird-credentials");
  const isAuthPage = request.nextUrl.pathname === "/";

  // If accessing protected routes without credentials, redirect to auth page
  if (!tinybirdCredentials && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If accessing auth page with credentials, redirect to dashboard
  if (tinybirdCredentials && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
