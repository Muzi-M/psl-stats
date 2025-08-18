import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/signin", "/auth/signout", "/auth/error"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Robust session validation using JWT token
  let isLoggedIn = false;
  let token = null;
  let sessionExpired = false;

  try {
    // Get and validate the JWT token
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token) {
      // Check if token has expired
      const currentTime = Math.floor(Date.now() / 1000);
      sessionExpired = !!(token.exp && token.exp < currentTime);

      // User is logged in if token exists and is not expired
      isLoggedIn = !sessionExpired;
    }

    // Debug logging
    console.log("Middleware Debug:", {
      pathname,
      isPublicRoute,
      isLoggedIn,
      sessionExpired,
      tokenExists: !!token,
      tokenExp: token?.exp,
      currentTime: Math.floor(Date.now() / 1000),
      tokenId: token?.id,
      tokenEmail: token?.email,
    });
  } catch (error) {
    console.error("Middleware token validation error:", error);
    isLoggedIn = false;
  }

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    console.log("User not logged in or session expired, redirecting to signin");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If the user is logged in and trying to access signin page, redirect to home
  // But allow signout page to complete the sign-out process
  if (isLoggedIn && pathname === "/auth/signin") {
    console.log("User logged in, redirecting to home");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If session has expired, clear cookies and redirect to signin
  if (sessionExpired) {
    console.log("Session expired, clearing cookies and redirecting to signin");
    const response = NextResponse.redirect(new URL("/auth/signin", req.url));

    // Clear all auth-related cookies
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    response.cookies.delete("__Host-next-auth.csrf-token");
    response.cookies.delete("next-auth.callback-url");
    response.cookies.delete("__Secure-next-auth.callback-url");

    return response;
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
