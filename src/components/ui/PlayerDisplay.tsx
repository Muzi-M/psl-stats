"use client";

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
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showImage && (
        <div className="relative overflow-hidden rounded-full border border-primary/20 flex-shrink-0">
          <img
            src={photo}
            alt={name}
            className={`${sizeClasses[size]} object-cover transition-all duration-200 hover:scale-110`}
          />
        </div>
      )}
      <span className="font-medium truncate">{name}</span>
    </div>
  );
}
