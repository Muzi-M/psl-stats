"use client";

import Image from "next/image";

interface TeamDisplayProps {
  name: string;
  logo: string;
  className?: string;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function TeamDisplay({
  name,
  logo,
  className = "",
  showBadge = true,
  size = "md",
}: TeamDisplayProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5 lg:h-6 lg:w-6",
    lg: "h-8 w-8",
  };

  // Fallback values
  const displayName = name || "Unknown Team";
  const displayLogo = logo || "/next.svg";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBadge && (
        <div className="relative overflow-hidden rounded-full border border-primary/20 flex-shrink-0">
          <Image
            src={displayLogo}
            alt={displayName}
            width={24}
            height={24}
            className={`${sizeClasses[size]} transition-all duration-200 hover:scale-110`}
            onError={() => {
              // Fallback is handled by the src prop
            }}
          />
        </div>
      )}
      <span className="font-medium truncate">{displayName}</span>
    </div>
  );
}
