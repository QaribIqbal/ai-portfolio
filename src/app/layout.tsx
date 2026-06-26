import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/site/smooth-scroll-provider";
import { UtmCapture } from "@/components/site/utm-capture";
import { defaultMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <UtmCapture />
        <noscript>
          <style>{`[data-gsap-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
