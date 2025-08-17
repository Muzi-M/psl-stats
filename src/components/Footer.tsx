"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto py-4 lg:py-6 border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2 text-xs lg:text-sm text-muted-foreground/80">
        <span className="font-medium">Powered by</span>
        <div className="relative w-16 h-6 lg:w-20 lg:h-8">
          <Image
            src="/Infinix_logo-removebg-preview.png"
            alt="Infinix"
            fill
            className="object-contain dark:invert"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(0) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.4) contrast(1)",
            }}
          />
        </div>
      </div>
    </footer>
  );
}
