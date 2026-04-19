import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";

import "./globals.css";
import { defaultMetadata } from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
