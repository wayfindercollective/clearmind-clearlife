/**
 * Server-side proxy (Pattern B). Keeps the Wayfinder per-funnel key off the client.
 * Forwards to the convex funnel endpoint with `Authorization: Bearer <key>` (the auth
 * the direct endpoint is proven to accept — NOT X-API-Key, which 401s).
 *
 * Env (Production AND Preview, separately):
 *   WAYFINDER_WEBHOOK_URL = https://<deployment>.convex.site/api/funnel/<slug>/lead
 *   WEBHOOK_SECRET        = per-funnel API key from Wayfinder admin
 * The health-check GET reads the SAME env-var names (name mismatch = 401 in prod).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const url = process.env.WAYFINDER_WEBHOOK_URL;
  const key = process.env.WEBHOOK_SECRET;

  if (!url || !key) {
    // Unconfigured (e.g. local review). Lead is already saved client-side; the retry
    // hook will deliver once env is set. Fail with a clear, retriable status.
    return Response.json(
      { error: "wayfinder_not_configured", message: "WAYFINDER_WEBHOOK_URL / WEBHOOK_SECRET not set." },
      { status: 503 }
    );
  }

  let body: string;
  try {
    body = await req.text();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body,
    });
    const text = await res.text();
    return new Response(text || JSON.stringify({ ok: res.ok }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json({ error: "upstream_unreachable" }, { status: 502 });
  }
}

export async function GET() {
  const configured = Boolean(process.env.WAYFINDER_WEBHOOK_URL && process.env.WEBHOOK_SECRET);
  return Response.json({ ok: true, configured });
}
