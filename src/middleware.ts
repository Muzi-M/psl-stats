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

  // Check if any auth-related cookies exist
  const isLoggedIn = !!(sessionToken || secureSessionToken || csrfToken);

  // Debug logging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.log("Middleware Debug:", {
      pathname,
      isPublicRoute,
      sessionToken: !!sessionToken,
      secureSessionToken: !!secureSessionToken,
      csrfToken: !!csrfToken,
      isLoggedIn,
    });
  }

  // Temporarily disable auth checks to debug OAuth flow
  // if (!isLoggedIn && !isPublicRoute) {
  //   return NextResponse.redirect(new URL("/auth/signin", req.url));
  // }

  // if (isLoggedIn && isPublicRoute) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
