import { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Web Games",
  description: "A collection of web games built with Next.js",
	authors: [{ name: "Ahmad Naufan", url: "https://ana117.github.io/"}],
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="h-screen px-4 py-8 flex flex-col gap-8 transition-color duration-500">
        <Navbar />
        <main className="grow">
          {children}
        </main>
      </body>
    </html>
  );
}
