"use client";

import { useActionState } from "react";
import { submitApplication, type ApplicationFormState } from "@/lib/actions/applications";
import { ButtonAsButton } from "@/components/ui/button";

const initialState: ApplicationFormState = {};

const inputClasses =
  "rounded-[8px] border border-heading/15 bg-cream/40 px-4 py-3 text-[0.9375rem] text-heading outline-none transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15";

export function ApplyNowForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);

  if (state.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[10px] border border-teal/30 bg-white p-8 text-center shadow-[0_4px_24px_rgba(34,22,56,0.06)] sm:p-10"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/10 text-teal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 font-display text-xl font-bold text-heading">Application received!</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Thank you for applying to CSMP IAS. Our admissions team will contact you on WhatsApp or
          phone shortly to complete your enrollment.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="grid gap-5 rounded-[10px] border border-heading/10 bg-white p-6 shadow-[0_4px_24px_rgba(34,22,56,0.06)] sm:grid-cols-2 sm:p-8"
      aria-busy={pending}
    >
      <label htmlFor="full_name" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Full Name
        <input id="full_name" name="full_name" required className={inputClasses} />
      </label>
      <label htmlFor="email" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Email
        <input id="email" type="email" name="email" required className={inputClasses} />
      </label>
      <label htmlFor="whatsapp_number" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        WhatsApp Number
        <input id="whatsapp_number" name="whatsapp_number" required className={inputClasses} />
      </label>
      <label htmlFor="dob" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Date of Birth
        <input id="dob" type="date" name="dob" className={inputClasses} />
      </label>
      <label htmlFor="course_selection" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Course Selection
        <select id="course_selection" name="course_selection" required className={inputClasses}>
          <option value="">Select a course</option>
          <option value="UPSC Foundation">UPSC Foundation</option>
          <option value="UPSC Advance Foundation">UPSC Advance Foundation</option>
          <option value="BA to Bureaucracy">BA to Bureaucracy</option>
          <option value="UPPCS Foundation">UPPCS Foundation</option>
          <option value="UPPCS Advance Foundation">UPPCS Advance Foundation</option>
          <option value="BPSC">BPSC</option>
          <option value="UKPSC">UKPSC</option>
          <option value="MPPSC">MPPSC</option>
          <option value="Test Series">Test Series</option>
          <option value="Mentorship Program">Mentorship Program</option>
          <option value="Interview Guidance">Interview Guidance</option>
          <option value="Optional Subject">Optional Subject</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label htmlFor="qualification" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Highest Qualification
        <input id="qualification" name="qualification" className={inputClasses} />
      </label>
      <label htmlFor="language_mode" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Preferred Language / Mode
        <select id="language_mode" name="language_mode" className={inputClasses}>
          <option value="">Select</option>
          <option value="Hindi Offline">Hindi &ndash; Offline</option>
          <option value="Hindi Online">Hindi &ndash; Online</option>
          <option value="English Offline">English &ndash; Offline</option>
          <option value="English Online">English &ndash; Online</option>
        </select>
      </label>
      <label htmlFor="target_year" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Target Exam Year
        <input id="target_year" name="target_year" placeholder="e.g. 2027" className={inputClasses} />
      </label>
      <label htmlFor="exam_experience" className="flex flex-col gap-1.5 text-sm font-semibold text-heading">
        Exam Attempt Experience
        <input
          id="exam_experience"
          name="exam_experience"
          placeholder="e.g. First attempt, Attempted twice"
          className={inputClasses}
        />
      </label>

      {state.error ? (
        <p role="alert" className="rounded-[8px] border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger sm:col-span-2">
          {state.error}
        </p>
      ) : null}

      <ButtonAsButton type="submit" disabled={pending} variant="primary" className="w-full py-3.5 text-base sm:col-span-2">
        {pending ? "Submitting..." : "Submit Application"}
      </ButtonAsButton>
    </form>
  );
}
