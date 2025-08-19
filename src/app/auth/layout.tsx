import { Metadata } from "next";
import AuthLayoutClient from "./AuthLayoutClient";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/infinix-fav-icon.png?v=5", type: "image/png", sizes: "32x32" },
      { url: "/infinix-fav-icon.png?v=5", type: "image/png", sizes: "48x48" },
      { url: "/infinix-fav-icon.png?v=5", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/infinix-fav-icon.png?v=5",
    apple: "/infinix-fav-icon.png?v=5",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
