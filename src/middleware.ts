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
  const secureCsrfToken = req.cookies.get("__Secure-next-auth.csrf-token");

  // Also check for JWT token cookies
  const jwtToken = req.cookies.get("next-auth.jwt-token");
  const secureJwtToken = req.cookies.get("__Secure-next-auth.jwt-token");

  // Check for the actual JWT token that NextAuth uses
  const authToken = req.cookies.get("next-auth.auth-token");
  const secureAuthToken = req.cookies.get("__Secure-next-auth.auth-token");

  // Check for any cookie that contains "next-auth" (fallback)
  const allCookies = req.cookies.getAll();
  const hasNextAuthCookie = allCookies.some(
    (cookie) =>
      cookie.name.includes("next-auth") &&
      cookie.value &&
      cookie.value.length > 10 &&
      cookie.value !== "null"
  );

  // Check if any auth-related cookies exist and have valid values
  const isLoggedIn = !!(
    (sessionToken && sessionToken.value && sessionToken.value !== "null") ||
    (secureSessionToken &&
      secureSessionToken.value &&
      secureSessionToken.value !== "null") ||
    (csrfToken && csrfToken.value && csrfToken.value !== "null") ||
    (secureCsrfToken &&
      secureCsrfToken.value &&
      secureCsrfToken.value !== "null") ||
    (jwtToken && jwtToken.value && jwtToken.value !== "null") ||
    (secureJwtToken &&
      secureJwtToken.value &&
      secureJwtToken.value !== "null") ||
    (authToken && authToken.value && authToken.value !== "null") ||
    (secureAuthToken &&
      secureAuthToken.value &&
      secureAuthToken.value !== "null") ||
    hasNextAuthCookie
  );

  // Debug logging (always log for troubleshooting)
  console.log("Middleware Debug:", {
    pathname,
    isPublicRoute,
    sessionToken: !!sessionToken,
    secureSessionToken: !!secureSessionToken,
    csrfToken: !!csrfToken,
    secureCsrfToken: !!secureCsrfToken,
    jwtToken: !!jwtToken,
    secureJwtToken: !!secureJwtToken,
    authToken: !!authToken,
    secureAuthToken: !!secureAuthToken,
    hasNextAuthCookie,
    isLoggedIn,
    sessionTokenValue: sessionToken?.value || "null",
    secureSessionTokenValue: secureSessionToken?.value || "null",
    jwtTokenValue: jwtToken?.value || "null",
    secureJwtTokenValue: secureJwtToken?.value || "null",
    authTokenValue: authToken?.value || "null",
    secureAuthTokenValue: secureAuthToken?.value || "null",
    allCookies: allCookies.map((c) => c.name).join(", "),
  });

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    console.log("User not logged in, redirecting to signin");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If the user is logged in and trying to access auth pages, redirect to home
  if (isLoggedIn && isPublicRoute) {
    console.log("User logged in, redirecting to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
