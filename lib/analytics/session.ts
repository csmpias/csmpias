const SESSION_KEY = "csmp-analytics-session";

export function getOrCreateSessionId(): string {
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    // localStorage unavailable (private mode etc.) — fall back to an
    // in-memory id that's stable for this page load only.
    return crypto.randomUUID();
  }
}

export function sendBeaconOrFetch(url: string, payload: unknown) {
  const body = JSON.stringify(payload);
  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    const sent = navigator.sendBeacon(url, blob);
    if (sent) return;
  }
  fetch(url, { method: "POST", body, keepalive: true }).catch(() => {
    // Best-effort — a dropped analytics ping shouldn't surface to the visitor.
  });
}
