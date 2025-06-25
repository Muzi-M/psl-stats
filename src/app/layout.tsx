import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 bg-background">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
