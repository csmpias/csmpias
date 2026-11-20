import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About CSMP IAS Coaching in Lucknow | Trusted UPSC/PCS Institute",
  description:
    "Know about CSMP IAS Coaching in Lucknow – a trusted UPSC coaching institute in Gomti Nagar known for quality teaching, guidance, and results.",
  alternates: { canonical: "/about-coaching" },
};

const features = [
  "Experienced & Dedicated Faculty",
  "Comprehensive Course Structure",
  "Updated & Exam-Oriented Study Material",
  "Personal Mentorship & Doubt Resolution",
  "Regular Test Series & Evaluation",
];

const highlights = [
  "Prelims Test Series",
  "Mains Answer Writing Practice",
  "Solved Model Answers",
  "Daily current affairs analysis",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutCoachingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#d9b47f]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="inline-block rounded-full bg-heading/10 px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-heading">
                About Coaching
              </p>
              <h1 className="mt-4 font-display text-[1.75rem] font-extrabold leading-[1.15] text-heading sm:text-[2.25rem] md:text-[2.5rem]">
                About CSMP IAS Coaching in Lucknow
              </h1>
            </div>
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[16px] shadow-[0_10px_40px_rgba(34,22,56,0.25)]">
              <Image
                src="/about-coaching-hero.webp"
                alt="CSMP IAS faculty lecturing to a full classroom of UPSC and UPPCS aspirants"
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-right"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
            CSMP IAS Lucknow is a premier Civil Services coaching institute dedicated to preparing
            aspirants for the UPSC Civil Services Examination (IAS, IPS, IFS) and State PCS exams.
            Our focus is not only on completing the syllabus but on developing exam-oriented
            thinking, analytical ability, and administrative aptitude required to succeed in
            competitive examinations.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
            Located in the academic hub of Lucknow, CSMP IAS has earned the trust of students
            through its quality teaching, disciplined learning environment, and personalized
            mentorship system.
          </p>
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Mission and Vision
        </Reveal>
        <Reveal as="p" className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
          At CSMP IAS, our vision is to develop honest and capable civil servants for the nation.
          Our mission is to provide clear concepts, personal guidance, and exam-focused
          preparation, with special attention to current affairs, answer writing, and building
          confidence among UPSC and PCS aspirants.
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Why Choose CSMP IAS Lucknow?
        </Reveal>
        <Reveal as="p" className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
          CSMP IAS Lucknow is chosen for its experienced faculty, exam-focused teaching, updated
          study material, and personal mentoring. We provide a disciplined learning environment
          that helps UPSC and PCS aspirants prepare with clarity, confidence, and the right
          strategy.
        </Reveal>
        <Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 rounded-[8px] border border-heading/10 bg-white px-4 py-3.5 text-sm font-semibold text-heading shadow-[0_2px_12px_rgba(34,22,56,0.05)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <CheckIcon />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Features
        </Reveal>
        <Reveal>
          <ul className="mt-4 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-full bg-cream-2 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.04em] text-teal-dark"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Student-Centric Learning Environment
        </Reveal>
        <Reveal as="p" className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
          CSMP IAS Lucknow provides a disciplined, focused, and positive learning environment
          where students can prepare effectively without unnecessary pressure. With small batch
          sizes, students receive better interaction and personal attention, along with continuous
          study support and guidance. Regular motivation and strategy sessions help students stay
          focused, confident, and on the right path throughout their preparation journey.
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Location Advantage &ndash; IAS Coaching in Lucknow
        </Reveal>
        <Reveal as="p" className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
          Our Gomti Nagar center offers a peaceful, well-connected location for serious UPSC and
          UPPCS preparation, close to libraries, bookstores, and student accommodation.
        </Reveal>
      </div>
    </>
  );
}
