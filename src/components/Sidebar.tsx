"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/standings", label: "Standings" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/players", label: "Players" },
  { href: "/teams", label: "Teams" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!mounted) {
    return (
      <aside className="h-screen sticky top-0 flex flex-col gap-2 w-56 min-w-[12rem] p-4 bg-card border-r shadow-lg">
        <div className="mb-6 text-xl lg:text-2xl font-bold tracking-tight text-primary">
          PSL Dashboard
        </div>
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? "default" : "ghost"}
              className="justify-start w-full text-sm lg:text-base"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="mt-auto pt-4 space-y-4">
          {/* Powered by section - Now at the top */}
          <div className="flex flex-col items-center gap-2 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <span className="font-medium">Powered by</span>
              <div className="relative w-32 h-12">
                <Image
                  src="/Infinix_logo-removebg-preview.png"
                  alt="Infinix"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Cool Theme Toggle - Now at the bottom */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative w-16 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full p-1 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 transform-gpu"
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out transform-gpu ${
                    theme === "dark" ? "translate-x-8" : "translate-x-0"
                  }`}
                >
                  <div className="flex items-center justify-center w-full h-full">
                    {theme === "dark" ? (
                      <Moon className="w-3 h-3 text-gray-800" />
                    ) : (
                      <Sun className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="h-screen sticky top-0 flex flex-col gap-2 w-56 min-w-[12rem] p-4 bg-card border-r shadow-lg backdrop-blur-sm">
      <div className="mb-6 text-xl lg:text-2xl font-bold tracking-tight text-primary hover:scale-105 transition-transform duration-200 transform-gpu">
        PSL Dashboard
      </div>
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Button
            asChild
            key={link.href}
            variant={pathname === link.href ? "default" : "ghost"}
            className={`justify-start w-full text-sm lg:text-base transition-all duration-200 ease-out transform-gpu hover:scale-[1.02] hover:-translate-y-0.5 ${
              pathname === link.href
                ? "scale-[1.02] -translate-y-0.5 shadow-lg"
                : ""
            }`}
            onClick={handleLinkClick}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>
      <div className="mt-auto pt-4 space-y-4">
        {/* Powered by section - Now at the top */}
        <div className="flex flex-col items-center gap-2 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground/50">
            <span className="font-medium">Powered by</span>
            <div className="relative w-32 h-12">
              <Image
                src="/Infinix_logo-removebg-preview.png"
                alt="Infinix"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Cool Theme Toggle - Now at the bottom with greyish dark gradient */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative w-16 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full p-1 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 transform-gpu"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out transform-gpu ${
                  theme === "dark" ? "translate-x-8" : "translate-x-0"
                }`}
              >
                <div className="flex items-center justify-center w-full h-full">
                  {theme === "dark" ? (
                    <Moon className="w-3 h-3 text-gray-800" />
                  ) : (
                    <Sun className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
