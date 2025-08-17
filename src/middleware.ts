import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/signin", "/auth/signout", "/auth/error"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check for authentication using NextAuth
  const session = await auth();

  // If the user is not logged in and trying to access a protected route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If the user is logged in and trying to access auth pages, redirect to home
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
