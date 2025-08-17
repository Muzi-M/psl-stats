import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppContent from "@/components/AppContent";
import { ParticleBackground } from "@/components/ui/floating-animation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PSL Dashboard - Premier Soccer League Analytics",
  description:
    "Comprehensive analytics and insights for the Premier Soccer League with real-time data, player statistics, team standings, and fixture management.",
  icons: {
    icon: "/infinix-fav-icon.png",
    shortcut: "/infinix-fav-icon.png",
    apple: "/infinix-fav-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/infinix-fav-icon.png" />
        <link rel="shortcut icon" href="/infinix-fav-icon.png" />
        <link rel="apple-touch-icon" href="/infinix-fav-icon.png" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingProvider>
            <AppProvider>
              <ParticleBackground />
              <AppContent>{children}</AppContent>
            </AppProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
