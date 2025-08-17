import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppContent from "@/components/AppContent";
import { ParticleBackground } from "@/components/ui/floating-animation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
