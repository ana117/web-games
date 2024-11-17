"use client";

import { usePathname  } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navbar";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const title = usePathname()
    .split("/")
    .filter(Boolean)
    .pop()
    ?.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <html lang="en">
      <body className="h-screen px-4 py-8 flex flex-col gap-8">
        <Navbar title={title} />
        <main className="grow">
          {children}
        </main>
      </body>
    </html>
  );
}
