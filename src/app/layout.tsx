import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 p-4 bg-background">{children}</main>
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
