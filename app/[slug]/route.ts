import { NextRequest, NextResponse } from "next/server";

/**
 * Vanity per-video links. Dan drops clean links (e.g. clearmindclearlife.com/imposter)
 * in his YouTube videos; this 307s to the funnel with utm_campaign=<slug>.
 * The redirect never writes storage itself — one attribution path only (attribution.ts).
 * Keep RESERVED in sync with real static routes / public files.
 */
const RESERVED = new Set([
  "api",
  "thank-you",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "og-image.png",
  "logo.png",
  "logo-mark.png",
  "dan-portrait.jpg",
  "dan-before.jpg",
]);

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await params;
  const slug = (raw || "").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 100);

  if (!slug || RESERVED.has(slug)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const url = new URL("/", req.url);
  url.searchParams.set("utm_source", "youtube");
  url.searchParams.set("utm_medium", "video");
  url.searchParams.set("utm_campaign", slug);
  return NextResponse.redirect(url, 307);
}
