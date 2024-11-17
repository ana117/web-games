import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Games",
  description: "A collection of web games",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
