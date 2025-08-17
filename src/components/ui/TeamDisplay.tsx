"use client";

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

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBadge && (
        <div className="relative overflow-hidden rounded-full border border-primary/20 flex-shrink-0">
          <img
            src={logo}
            alt={name}
            className={`${sizeClasses[size]} transition-all duration-200 hover:scale-110`}
          />
        </div>
      )}
      <span className="font-medium truncate">{name}</span>
    </div>
  );
}
