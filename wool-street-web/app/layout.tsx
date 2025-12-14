import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers"; // Pastikan import ini aman

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wool Street",
  description: "The Most Prestigious Goat Market on IOTA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
