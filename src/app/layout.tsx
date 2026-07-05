import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";

import "./globals.css";
import { SmoothScrollProvider } from "@/components/site/smooth-scroll-provider";
import { UtmCapture } from "@/components/site/utm-capture";
import { defaultMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  weight: ["500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif-loaded",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
        <UtmCapture />
        <noscript>
          <style>{`[data-gsap-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
