"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SignOut() {
  useEffect(() => {
    // Automatically sign out after a short delay
    const timer = setTimeout(() => {
      signOut({ callbackUrl: "/auth/signin" });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <div className="w-full max-w-md">
      <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Signing Out
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
              You are being signed out of your account...
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button onClick={handleSignOut} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out Now
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Cancel</Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Thank you for using PSL Dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
