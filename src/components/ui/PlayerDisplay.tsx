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

  // Fallback values
  const displayName = name || "Unknown Player";
  const displayPhoto = photo || "/next.svg";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showImage && (
        <div className="relative overflow-hidden rounded-full border border-primary/20 flex-shrink-0">
          <img
            src={displayPhoto}
            alt={displayName}
            className={`${sizeClasses[size]} object-cover transition-all duration-200 hover:scale-110`}
            onError={(e) => {
              // Fallback to default image if photo fails to load
              const target = e.target as HTMLImageElement;
              target.src = "/next.svg";
            }}
          />
        </div>
      )}
      <span className="font-medium truncate">{displayName}</span>
    </div>
  );
}
