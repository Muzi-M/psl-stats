import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppContent from "@/components/AppContent";
import { ParticleBackground } from "@/components/ui/floating-animation";
import SessionProvider from "@/components/SessionProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PSL Dashboard - Premier Soccer League Analytics",
  description:
    "Comprehensive analytics and insights for the Premier Soccer League with real-time data, player statistics, team standings, and fixture management.",
  icons: {
    icon: [
      { url: "/infinix-fav-icon.png", type: "image/png", sizes: "32x32" },
      { url: "/infinix-fav-icon.png", type: "image/png", sizes: "16x16" },
      { url: "/infinix-fav-icon.png", type: "image/png", sizes: "48x48" },
    ],
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
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/infinix-fav-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/infinix-fav-icon.png"
        />
        <link rel="shortcut icon" href="/infinix-fav-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/infinix-fav-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Force favicon refresh */}
        <link rel="icon" href="/infinix-fav-icon.png?v=2" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <LoadingProvider>
              <AppProvider>
                <ParticleBackground />
                {children}
              </AppProvider>
            </LoadingProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
