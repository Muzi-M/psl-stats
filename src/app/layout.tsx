import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppContent from "@/components/AppContent";

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
              <AppContent>{children}</AppContent>
            </AppProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
