"use client";

import Image from "next/image";
import { useState } from "react";

interface PlayerDisplayProps {
  name: string;
  photo: string;
  className?: string;
  showImage?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function PlayerDisplay({
  name,
  photo,
  className = "",
  showImage = true,
  size = "md",
}: PlayerDisplayProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  // Fallback values
  const displayName = name || "Unknown Player";
  const displayPhoto = imageError || !photo ? "/next.svg" : photo;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showImage && (
        <div className="relative overflow-hidden rounded-full border border-primary/20 flex-shrink-0">
          <Image
            src={displayPhoto}
            alt={displayName}
            width={48}
            height={48}
            className={`${sizeClasses[size]} object-cover transition-all duration-200 hover:scale-110`}
            onError={() => {
              setImageError(true);
            }}
            unoptimized
          />
        </div>
      )}
      <span className="font-medium truncate">{displayName}</span>
    </div>
  );
}
