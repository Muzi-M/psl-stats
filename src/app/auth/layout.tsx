"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Left Sidebar - App Identity and Powered By */}
        <div className="hidden lg:flex lg:w-1/3 xl:w-1/4 bg-gray-900 dark:bg-black flex-col justify-between p-8">
          {/* App Identity */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                PSL Dashboard
              </h1>
              <p className="text-gray-400 text-sm">
                Premier Soccer League Analytics Platform
              </p>
            </div>

            {/* Navigation Placeholder - Hidden but maintains spacing */}
            <div className="space-y-4 opacity-0">
              <div className="text-white">Overview</div>
              <div className="text-white">Standings</div>
              <div className="text-white">Fixtures</div>
              <div className="text-white">Players</div>
              <div className="text-white">Teams</div>
            </div>
          </div>

          {/* Bottom Section - Powered By and Theme Toggle */}
          <div className="space-y-6">
            <div className="border-t border-gray-700 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Powered by</span>
                  <div className="relative w-6 h-6">
                    <Image
                      src="/Infinix_logo-removebg-preview.png"
                      alt="Infinix"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="text-gray-400 hover:text-white"
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center p-4">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
