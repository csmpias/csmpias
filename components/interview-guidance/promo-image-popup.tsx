"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SESSION_SEEN_KEY = "csmp-igp-promo-seen";
const REGISTERED_KEY = "csmp-igp-registered";
const POPUP_DELAY_MS = 1000;
const COURSE_HREF = "/courses/uppcs-2026-interview-guidance-programme";

/**
 * Site-wide promo interstitial: shows the UPPCS 2026 Interview Guidance
 * Programme poster once per browser session, and links through to the
 * course page (where "Apply Today" opens the registration form). The
 * registration form itself no longer auto-shows — see registration-popup.tsx.
 */
export function InterviewGuidancePromoPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alreadyRegistered = false;
    let alreadySeenThisSession = false;

    try {
      alreadyRegistered = localStorage.getItem(REGISTERED_KEY) === "1";
    } catch {
      // Private browsing or storage disabled — treat as not registered.
    }

    if (alreadyRegistered) return;

    try {
      alreadySeenThisSession = sessionStorage.getItem(SESSION_SEEN_KEY) !== null;
      if (!alreadySeenThisSession) {
        sessionStorage.setItem(SESSION_SEEN_KEY, "1");
      }
    } catch {
      // If we can't read/write sessionStorage, fall back to showing once per mount.
    }

    if (alreadySeenThisSession) return;

    const timer = setTimeout(() => setOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-heading/50 px-4 py-8">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="UPPCS 2026 Interview Guidance Programme"
        className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-[10px] shadow-[0_4px_24px_rgba(34,22,56,0.08)]"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-heading hover:bg-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <Link href={COURSE_HREF} onClick={() => setOpen(false)} className="block">
          <Image
            src="/uppcs-2026-interview-guidance-cover.jpeg"
            alt="UPPCS 2026 Interview Guidance Programme"
            width={1080}
            height={1350}
            sizes="(min-width: 640px) 24rem, 100vw"
            className="h-auto w-full rounded-[10px]"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
