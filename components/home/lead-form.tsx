"use client";

import { useActionState } from "react";
import { submitApplication, type ApplicationFormState } from "@/lib/actions/applications";
import { ButtonAsButton } from "@/components/ui/button";

const initialState: ApplicationFormState = {};

const inputClasses =
  "rounded-[8px] border border-heading/15 bg-cream/40 px-4 py-3 text-[0.9375rem] text-heading outline-none transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15";

export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);

  if (state.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[10px] border border-teal/30 bg-white p-8 text-center shadow-[0_4px_24px_rgba(34,22,56,0.06)]"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 font-display text-lg font-bold text-heading">Thank you!</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Our counselling team will reach out to you shortly on WhatsApp or phone.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-[10px] border border-heading/10 bg-white p-6 shadow-[0_4px_24px_rgba(34,22,56,0.06)] sm:grid-cols-2"
      aria-busy={pending}
    >
      <div className="sm:col-span-2">
        <h2 className="font-display text-xl font-bold text-heading">Book Your Free Counselling Session</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          One-to-one guidance from experts. Limited slots available&mdash;connect with us now.
        </p>
      </div>

      <label htmlFor="lead_full_name" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Full Name
        <input id="lead_full_name" name="full_name" required className={inputClasses} />
      </label>

      <label htmlFor="lead_email" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Email
        <input id="lead_email" type="email" name="email" required className={inputClasses} />
      </label>

      <label htmlFor="lead_whatsapp_number" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        WhatsApp Number
        <input id="lead_whatsapp_number" name="whatsapp_number" required className={inputClasses} />
      </label>

      <label htmlFor="lead_course_selection" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Course of Interest
        <select id="lead_course_selection" name="course_selection" className={inputClasses}>
          <option value="">Select a course</option>
          <option value="UPSC Foundation">UPSC Foundation</option>
          <option value="UPPCS Foundation">UPPCS Foundation</option>
          <option value="BPSC">BPSC</option>
          <option value="UKPSC">UKPSC</option>
          <option value="MPPSC">MPPSC</option>
          <option value="Test Series">Test Series</option>
          <option value="Mentorship Program">Mentorship Program</option>
          <option value="Other">Other</option>
        </select>
      </label>

      {state.error ? (
        <p role="alert" className="rounded-[8px] border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger sm:col-span-2">
          {state.error}
        </p>
      ) : null}

      <ButtonAsButton type="submit" disabled={pending} variant="primary" className="w-full py-3.5 text-base sm:col-span-2">
        {pending ? "Submitting..." : "Enroll Now"}
      </ButtonAsButton>
    </form>
  );
}
