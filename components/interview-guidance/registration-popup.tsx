"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  submitInterviewGuidanceRegistration,
  type InterviewGuidanceFormState,
} from "@/lib/actions/interview-guidance";
import { OPEN_INTERVIEW_GUIDANCE_POPUP_EVENT } from "@/lib/interview-guidance-popup";
import { cn } from "@/lib/utils";

const REGISTERED_KEY = "csmp-igp-registered";

const initialState: InterviewGuidanceFormState = {};

/**
 * The registration form itself — opened only on demand (via the "Apply
 * Today" button on the course page, which dispatches
 * OPEN_INTERVIEW_GUIDANCE_POPUP_EVENT), never automatically. The
 * site-wide auto-shown interstitial is the poster in promo-image-popup.tsx.
 */
export function InterviewGuidancePopup() {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [state, formAction, pending] = useActionState(submitInterviewGuidanceRegistration, initialState);

  // On successful submission, remember it so the promo popup never shows again.
  useEffect(() => {
    if (!state.success) return;
    try {
      localStorage.setItem(REGISTERED_KEY, "1");
    } catch {
      // Nothing to do if storage is unavailable — the popup will just show again next session.
    }
  }, [state.success]);

  // Let course pages (e.g. the interview guidance programme's own "Apply
  // Today" button) open this popup directly instead of navigating away.
  useEffect(() => {
    function handleOpenRequest() {
      setOpen(true);
    }
    window.addEventListener(OPEN_INTERVIEW_GUIDANCE_POPUP_EVENT, handleOpenRequest);
    return () => window.removeEventListener(OPEN_INTERVIEW_GUIDANCE_POPUP_EVENT, handleOpenRequest);
  }, []);

  // Close on click outside and on Escape.
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
        aria-labelledby="igp-popup-heading"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[10px] border border-heading/10 bg-white p-6 shadow-[0_4px_24px_rgba(34,22,56,0.08)] sm:p-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-heading/60 hover:bg-cream hover:text-heading"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {state.success ? (
          <div className="flex flex-col gap-4 pt-2">
            <span className="w-fit rounded-full bg-cream px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.04em] text-brand">
              Interview Guidance – Schedule
            </span>
            <h2 id="igp-popup-heading" className="font-display text-xl font-bold text-heading sm:text-2xl">
              You&apos;re registered!
            </h2>
            <p className="text-sm text-muted">
              Thank you for registering for the UPPCS 2026 Interview Guidance Programme. Our team will reach out to
              you shortly with the schedule.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-fit rounded-[5px] bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-2">
            <span className="w-fit rounded-full bg-cream px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.04em] text-brand">
              Interview Guidance – Schedule
            </span>
            <h2 id="igp-popup-heading" className="font-display text-xl font-bold text-heading sm:text-2xl">
              UPPCS 2026 – Interview Guidance Programme
            </h2>
            <p className="text-sm text-muted">
              Please enter the following details to register for Interview Guidance Program:
            </p>

            <form action={formAction} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                  First name
                  <input
                    name="first_name"
                    required
                    className="rounded-[4px] border border-heading/10 px-3 py-2.5 font-body outline-none focus:border-brand"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                  Last name
                  <input
                    name="last_name"
                    required
                    className="rounded-[4px] border border-heading/10 px-3 py-2.5 font-body outline-none focus:border-brand"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    className="rounded-[4px] border border-heading/10 px-3 py-2.5 font-body outline-none focus:border-brand"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                  Mobile No.
                  <input
                    type="tel"
                    name="mobile_no"
                    required
                    className="rounded-[4px] border border-heading/10 px-3 py-2.5 font-body outline-none focus:border-brand"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                UPPCS Roll no. <span className="font-normal text-muted">(optional)</span>
                <input
                  name="roll_no"
                  className="rounded-[4px] border border-heading/10 px-3 py-2.5 font-body outline-none focus:border-brand"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <fieldset className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                  <legend className="mb-0.5">Medium of preparation</legend>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 font-normal">
                      <input type="radio" name="medium" value="Hindi" required />
                      Hindi
                    </label>
                    <label className="flex items-center gap-1.5 font-normal">
                      <input type="radio" name="medium" value="English" required />
                      English
                    </label>
                  </div>
                </fieldset>

                <fieldset className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                  <legend className="mb-0.5">Preference of Interview</legend>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-1.5 font-normal">
                      <input type="radio" name="interview_preference" value="Online" required />
                      Online
                    </label>
                    <label className="flex items-center gap-1.5 font-normal">
                      <input type="radio" name="interview_preference" value="Offline" required />
                      Offline
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="flex flex-col gap-1.5 text-sm font-medium text-heading">
                <span>
                  DAF PDF <span className="font-normal text-muted">(optional)</span>
                </span>
                <div className="flex items-center gap-3">
                  <label className="w-fit cursor-pointer rounded-[5px] border border-heading/10 bg-cream px-4 py-2 text-sm font-bold text-heading hover:bg-cream-2">
                    Upload PDF
                    <input
                      type="file"
                      name="daf_pdf"
                      accept="application/pdf"
                      className="sr-only"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                    />
                  </label>
                  {fileName ? <span className="truncate text-sm text-muted">{fileName}</span> : null}
                </div>
              </div>

              {state.error ? (
                <p role="alert" className="text-sm font-medium text-brand-dark">
                  {state.error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className={cn(
                  "w-full rounded-[5px] bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60 sm:w-fit",
                )}
              >
                {pending ? "Registering…" : "Register Now"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
