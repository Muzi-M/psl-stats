"use client";

import LoadingSpinner from "./LoadingSpinner";

interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({
  message = "Loading...",
}: PageLoaderProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-8 shadow-lg flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-foreground font-medium">{message}</p>
      </div>
    </div>
  );
}
