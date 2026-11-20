"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getOrCreateSessionId, sendBeaconOrFetch } from "@/lib/analytics/session";

const HEARTBEAT_MS = 20_000;

// Mounted once in the public-site layout only (never on /admin — that would
// count staff browsing the dashboard as site traffic). No third-party
// script: pings our own same-origin API route, which forwards to
// SECURITY DEFINER Supabase RPCs.
export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const referrerRef = useRef<string | null>(null);

  if (typeof document !== "undefined" && sessionIdRef.current === null) {
    sessionIdRef.current = getOrCreateSessionId();
    referrerRef.current = document.referrer || null;
  }

  useEffect(() => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;
    sendBeaconOrFetch("/api/analytics/track", {
      sessionId,
      path: pathname,
      referrer: referrerRef.current,
      type: "pageview",
    });
    // Only the first pageview of the session carries a real document.referrer;
    // subsequent in-app navigations are self-referrals, not useful signal.
    referrerRef.current = null;
  }, [pathname]);

  useEffect(() => {
    const sessionId = sessionIdRef.current;
    if (!sessionId) return;

    const interval = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      sendBeaconOrFetch("/api/analytics/track", { sessionId, type: "heartbeat" });
    }, HEARTBEAT_MS);

    return () => clearInterval(interval);
  }, []);

  return null;
}
