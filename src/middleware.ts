import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/signin", "/auth/signout", "/auth/error"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Simple cookie-based validation for now
  const sessionToken = req.cookies.get("next-auth.session-token");
  const secureSessionToken = req.cookies.get(
    "__Secure-next-auth.session-token"
  );

  const isLoggedIn = !!(
    (sessionToken && sessionToken.value && sessionToken.value !== "null") ||
    (secureSessionToken &&
      secureSessionToken.value &&
      secureSessionToken.value !== "null")
  );

  // Debug logging
  console.log("Middleware Debug:", {
    pathname,
    isPublicRoute,
    isLoggedIn,
    sessionToken: sessionToken?.value || "null",
    secureSessionToken: secureSessionToken?.value || "null",
  });

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    console.log("User not logged in, redirecting to signin");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If the user is logged in and trying to access signin page, redirect to home
  if (isLoggedIn && pathname === "/auth/signin") {
    console.log("User logged in, redirecting to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (OAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
