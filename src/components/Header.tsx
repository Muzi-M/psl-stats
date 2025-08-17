"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { SeasonToggle } from "./SeasonToggle";
import UserProfile from "./UserProfile";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export default function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <div className="flex items-center space-x-2">
            <img
              src="/Infinix_logo-removebg-preview.png"
              alt="PSL Logo"
              className="h-8 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">PSL Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                Premier Soccer League
              </p>
            </div>
          </div>
        </div>

        {/* Center - Search and Season Toggle */}
        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-2xl mx-8">
          <SearchBar />
          <SeasonToggle />
        </div>

        {/* Right side - User profile */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <UserProfile />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t">
        <div className="container px-4 py-2">
          <div className="flex items-center space-x-4">
            <SearchBar />
            <SeasonToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
