import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/signin", "/auth/signout", "/auth/error"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check for authentication token in cookies
  const sessionToken = req.cookies.get("next-auth.session-token");
  const secureSessionToken = req.cookies.get(
    "__Secure-next-auth.session-token"
  );
  const csrfToken = req.cookies.get("__Host-next-auth.csrf-token");

  // Also check for JWT token cookies
  const jwtToken = req.cookies.get("next-auth.jwt-token");
  const secureJwtToken = req.cookies.get("__Secure-next-auth.jwt-token");

  // Check if any auth-related cookies exist
  const isLoggedIn = !!(
    sessionToken ||
    secureSessionToken ||
    csrfToken ||
    jwtToken ||
    secureJwtToken
  );

  // Debug logging (always log for troubleshooting)
  console.log("Middleware Debug:", {
    pathname,
    isPublicRoute,
    sessionToken: !!sessionToken,
    secureSessionToken: !!secureSessionToken,
    csrfToken: !!csrfToken,
    jwtToken: !!jwtToken,
    secureJwtToken: !!secureJwtToken,
    isLoggedIn,
    sessionTokenValue: sessionToken?.value ? "exists" : "null",
    secureSessionTokenValue: secureSessionToken?.value ? "exists" : "null",
    jwtTokenValue: jwtToken?.value ? "exists" : "null",
    secureJwtTokenValue: secureJwtToken?.value ? "exists" : "null",
  });

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If the user is logged in and trying to access auth pages, redirect to home
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
