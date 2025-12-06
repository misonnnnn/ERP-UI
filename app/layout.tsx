import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ERP Sytem",
  description: "",
  icons: {
    icon: '/file.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=''
      >
        <Script
          src="https://unpkg.com/micromodal/dist/micromodal.min.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
