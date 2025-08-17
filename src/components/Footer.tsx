"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-border/50">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>Powered by</span>
        <div className="relative w-20 h-8">
          <Image
            src="/Infinix_logo-removebg-preview.png"
            alt="Infinix"
            fill
            className="object-contain filter dark:invert-0 invert"
            style={{
              filter: 'brightness(0) saturate(100%) invert(0) sepia(0) saturate(0) hue-rotate(0deg) brightness(0.3) contrast(1)'
            }}
          />
        </div>
      </div>
    </footer>
  );
}
