import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ERP System",
  description: "",
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center"/>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
