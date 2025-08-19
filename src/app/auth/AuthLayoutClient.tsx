"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AuthLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    // Force favicon refresh for auth pages
    const forceFaviconRefresh = () => {
      const links = document.querySelectorAll('link[rel*="icon"]');
      links.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.includes("infinix-fav-icon.png")) {
          link.setAttribute(
            "href",
            href.replace(/\?v=\d+/, "") + "?v=5&t=" + Date.now()
          );
        }
      });
    };

    // Force refresh on mount
    forceFaviconRefresh();

    // Also force refresh when the page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        forceFaviconRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header with App Identity and Theme Toggle */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                PSL Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Premier Soccer League Analytics Platform
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                by Infinix Digital
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Main Content Area - Centered */}
        <div className="flex-1 flex items-center justify-center p-4">
          {children}
        </div>

        {/* Footer with Powered By */}
        <div className="flex items-center justify-center p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Powered by
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Infinix Digital
            </span>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
