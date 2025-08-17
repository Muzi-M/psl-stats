"use client";

import { useEffect, useState } from "react";

export default function EnvironmentCheck() {
  const [envStatus, setEnvStatus] = useState<{
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    MONGODB_URI: string;
  } | null>(null);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === "development") {
      setEnvStatus({
        NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL || "Not set",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
        GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "Not set",
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
          ? "Set"
          : "Not set",
        MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI || "Not set",
      });
    }
  }, []);

  if (!envStatus || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-sm">
      <h4 className="font-bold mb-2">Environment Variables (Dev Only)</h4>
      <div className="text-xs space-y-1">
        <div>NEXTAUTH_URL: {envStatus.NEXTAUTH_URL}</div>
        <div>NEXTAUTH_SECRET: {envStatus.NEXTAUTH_SECRET}</div>
        <div>GOOGLE_CLIENT_ID: {envStatus.GOOGLE_CLIENT_ID}</div>
        <div>GOOGLE_CLIENT_SECRET: {envStatus.GOOGLE_CLIENT_SECRET}</div>
        <div>MONGODB_URI: {envStatus.MONGODB_URI}</div>
      </div>
    </div>
  );
}
