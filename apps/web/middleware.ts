import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public paths that don't require authentication
const publicPaths = ["/login", "/signup", "/", "session"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.includes(pathname);

  // Get the token from cookies
  const token = request.cookies.get("auth-token")?.value;

  // @FIXME: add redirect if user does not exist
  // If the path is public and user is authenticated, redirect to home
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  //
  // // If the path is not public and user is not authenticated, redirect to login
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
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
