import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

export function About() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:px-8">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px] bg-cream shadow-[0_16px_44px_rgba(34,22,56,0.14)]">
            <Image
              src="https://res.cloudinary.com/t6nm5hzp/image/upload/v1784377485/csmp-ias/site/sb-shukla-director.jpg"
              alt="S.B. Shukla Sir, Director, CSMP IAS"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute -bottom-4 -left-4 -z-10 hidden size-32 rounded-[10px] bg-teal/15 sm:block"
          />
        </Reveal>
        <Reveal>
          <div className="flex items-baseline gap-3 border-b border-heading/10 pb-4">
            <p className="font-display text-2xl font-extrabold text-heading sm:text-[1.75rem]">S.B. Shukla Sir</p>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.06em] text-brand">
              Director, {siteConfig.name}
            </p>
          </div>
          <p className="mt-3 text-sm leading-snug text-muted">
            Guiding UPSC &amp; UPPCS aspirants since {siteConfig.established} with personalized mentorship and a
            structured, exam-focused strategy.
          </p>

          <p className="mt-8 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-brand">
            About {siteConfig.name}
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-heading sm:text-3xl">
            Lucknow&rsquo;s Most Trusted IAS &amp; PCS Coaching Institute
          </h2>

          <blockquote className="relative mt-6 overflow-hidden rounded-[10px] border-l-4 border-brand bg-cream px-6 py-6">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 left-3 font-display text-[6rem] leading-none text-heading/10"
            >
              &rdquo;
            </span>
            <p className="relative font-display text-lg font-bold italic leading-snug text-heading sm:text-xl">
              &ldquo;You are not future administrators&hellip; you are the backbone of the country.&rdquo;
            </p>
          </blockquote>

          <p className="mt-5 text-[0.9375rem] leading-[1.65] text-muted">
            {siteConfig.name}{" "}
            is one of the highest result-oriented IAS &amp; PCS coaching institutes in Lucknow,
            known for its structured guidance, personal mentorship, and consistent selections in
            UPSC &amp; UPPCS exams. Located in Gomti Nagar, Lucknow, we provide both Offline
            Classroom Coaching and Online LIVE Classes with recorded access.
          </p>
          <Link
            href="/about-coaching"
            className="mt-6 inline-flex items-center gap-1.5 font-bold text-brand transition-colors hover:text-brand-dark"
          >
            Read more about our approach <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
