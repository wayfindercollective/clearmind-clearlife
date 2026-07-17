import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

// One grotesk family (Archivo) across the site, echoing the logo wordmark.
// Heavy weights + tight tracking (globals.css) give headlines their poster weight.
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.clearmindclearlife.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Clear Mind, Clear Life - Break Free From Alcohol",
  description:
    "Private coaching to quit drinking without labels, rehab or rock bottom. For busy professionals who want it sorted quietly and for good. Built on the Clear Choice Framework by Dan Hunter, sober since 2017.",
  openGraph: {
    title: "Clear Mind, Clear Life - Break Free From Alcohol",
    description:
      "Private coaching to quit drinking without labels, rehab or rock bottom. Built on the Clear Choice Framework by Dan Hunter, sober since 2017.",
    url: SITE_URL,
    siteName: "Clear Mind, Clear Life",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Clear Mind, Clear Life" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear Mind, Clear Life - Break Free From Alcohol",
    description: "Private coaching to quit drinking without labels, rehab or rock bottom.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Warm the booking origin from the FIRST page load (landing included), so
            by the time a visitor submits and the /thank-you iframe requests it, DNS +
            TLS are already done. The booking HTML itself is no-store (can't be
            prefetched), so connection-warming is the win; no-www is the canonical
            host - warming www would only land on its 301. R2 host serves the video. */}
        <link rel="preconnect" href="https://wayfindercollective.io" crossOrigin="" />
        <link rel="preconnect" href="https://pub-106377e0ae8b41d89f9b9a7a7a897795.r2.dev" crossOrigin="" />
      </head>
      <body>
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
