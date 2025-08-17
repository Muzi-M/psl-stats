"use client";

import { signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/");
      } else {
        setIsCheckingSession(false);
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      console.log("Starting Google sign in...");
      console.log("Current URL:", window.location.href);
      console.log("NEXTAUTH_URL:", process.env.NEXT_PUBLIC_NEXTAUTH_URL);

      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });

      console.log("Sign in result:", result);

      if (result?.error) {
        console.error("Sign in error:", result.error);
        setIsLoading(false);
      } else if (result?.ok) {
        console.log("Sign in successful, redirecting...");
        console.log("Result details:", result);

        // Try multiple redirect approaches
        try {
          // First try router push
          await router.push("/");
          console.log("Router push completed");
        } catch (routerError) {
          console.log(
            "Router push failed, trying window.location:",
            routerError
          );
          // Fallback to window.location
          window.location.href = "/";
        }
      } else {
        console.log("No result from sign in");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to PSL Dashboard
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              Sign in to access comprehensive Premier Soccer League analytics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <FcGoogle className="h-5 w-5" />
              )}
              <span className="font-medium">
                {isLoading ? "Signing in..." : "Continue with Google"}
              </span>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Feature highlights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              className="w-4 h-4 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Real-time Analytics
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Live match data and statistics
          </p>
        </div>

        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              className="w-4 h-4 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Player Profiles
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Detailed player statistics
          </p>
        </div>

        <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg backdrop-blur-sm">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              className="w-4 h-4 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Team Management
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive team insights
          </p>
        </div>
      </div>
    </div>
  );
}
