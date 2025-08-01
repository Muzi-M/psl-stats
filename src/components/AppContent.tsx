"use client";

import { useLoading } from "@/context/LoadingContext";
import Sidebar from "./Sidebar";
import PageLoader from "./PageLoader";

interface AppContentProps {
  children: React.ReactNode;
}

export default function AppContent({ children }: AppContentProps) {
  const { isLoading, loadingMessage } = useLoading();

  return (
    <>
      {isLoading && <PageLoader message={loadingMessage} />}
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 bg-background">{children}</main>
      </div>
    </>
  );
}
