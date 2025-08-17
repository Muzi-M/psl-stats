"use client";

import { useLoading } from "@/context/LoadingContext";
import Sidebar from "./Sidebar";
import PageLoader from "./PageLoader";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

interface AppContentProps {
  children: React.ReactNode;
}

export default function AppContent({ children }: AppContentProps) {
  const { isLoading, loadingMessage } = useLoading();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {isLoading && <PageLoader message={loadingMessage} />}
      <div className="flex min-h-screen">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-background/80 backdrop-blur-sm"
          >
            {sidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 bg-background min-w-0">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </>
  );
}
