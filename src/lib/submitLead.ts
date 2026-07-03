/**
 * Single submit function used by BOTH the immediate path and the retry hook —
 * two builders/paths drift and one silently breaks. Posts to the server proxy
 * (/api/submit-lead) which holds the Wayfinder key server-side.
 */
export type SubmitResult = {
  ok: boolean;
  status: number;
  retriable: boolean;
  errorType: "none" | "network" | "server" | "client";
  error?: string;
};

export async function submitLead(payload: Record<string, unknown>): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/submit-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (res.ok) return { ok: true, status: res.status, retriable: false, errorType: "none" };
    // 5xx / 429 are transient; other 4xx are not.
    const retriable = res.status >= 500 || res.status === 429;
    return {
      ok: false,
      status: res.status,
      retriable,
      errorType: retriable ? "server" : "client",
      error: `HTTP ${res.status}`,
    };
  } catch (e) {
    return { ok: false, status: 0, retriable: true, errorType: "network", error: "network_error" };
  }
}
