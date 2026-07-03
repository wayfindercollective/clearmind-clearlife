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
  title: "Clear Mind, Clear Life — Break Free From Alcohol",
  description:
    "A private coaching program for business owners and professionals who want to remove alcohol as a performance leak — without labels, rehab, or willpower. Built around the Clear Choice Framework.",
  openGraph: {
    title: "Clear Mind, Clear Life — Break Free From Alcohol",
    description:
      "Remove alcohol as a performance leak. A private program for business owners and professionals, built on the Clear Choice Framework.",
    url: SITE_URL,
    siteName: "Clear Mind, Clear Life",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Clear Mind, Clear Life" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear Mind, Clear Life — Break Free From Alcohol",
    description: "Remove alcohol as a performance leak. Built on the Clear Choice Framework.",
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
      <body>
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
