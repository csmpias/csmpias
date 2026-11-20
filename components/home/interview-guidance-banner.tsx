import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

const COURSE_HREF = "/courses/uppcs-2026-interview-guidance-programme";

export function InterviewGuidanceBanner() {
  return (
    <section className="bg-brand">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-block rounded-[4px] bg-heading px-3 py-1.5 text-[0.75rem] font-bold text-white">
            New Programme
          </span>
          <h2 className="mt-5 font-display text-[1.75rem] font-extrabold leading-[1.2] text-white sm:text-[2.25rem]">
            2,297 Candidates Just Qualified for UPPCS Interview — Get Board-Ready
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-[1.65] text-white/85 sm:text-[1.0625rem]">
            Our UPPCS 2026 Interview Guidance Programme builds your DAF around Uttar Pradesh–specific
            priorities and puts you through mock interviews with S.B. Shukla Sir.
          </p>
          <div className="mt-8">
            <Link
              href={COURSE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-white px-6 py-3 font-bold text-heading shadow-sm transition-colors hover:bg-cream"
            >
              Join the Interview Guidance Programme
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
