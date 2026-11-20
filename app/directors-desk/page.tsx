import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Director's Desk - S.B. Shukla | CSMP IAS",
  description:
    "The journey to the Civil Services is one of the most demanding yet rewarding paths a student can take. When we established CSMP IAS in 2021, our goal was clear.",
  alternates: { canonical: "/directors-desk" },
};

const missionPoints = [
  {
    title: "Empowerment through Education",
    body: "To simplify the UPSC and UPPCS preparation process through innovative teaching and structured planning.",
  },
  {
    title: "Early Foundation",
    body: "To nurture young minds through our integrated degree programs, ensuring they are “exam-ready” by the time they graduate.",
  },
  {
    title: "Result-Oriented Mentorship",
    body: "To maintain a high success ratio by focusing on individual student performance rather than just completing the syllabus.",
  },
];

const approachPoints = [
  {
    title: "Personalized Mentorship",
    body: "Every student receives direct guidance from me to identify and overcome their specific academic hurdles.",
  },
  {
    title: "Comprehensive Coverage",
    body: "From NCERT fundamentals to advanced GS papers, CSAT, and Essay writing, we cover every aspect of the syllabus.",
  },
  {
    title: "The ‘BA to Bureaucracy’ Advantage",
    body: "A unique 3-year integrated approach that aligns university education with UPSC requirements.",
  },
  {
    title: "Rigorous Testing",
    body: "Continuous evaluation through our specialized Prelims and Mains Test Series to build exam temperament.",
  },
  {
    title: "Interview Mastery",
    body: "Personalized interview guidance sessions to refine the personality and communication skills of our students.",
  },
];

export default function DirectorsDeskPage() {
  return (
    <>
      <PageHeader eyebrow="Director's Desk" title="A Message from S.B. Shukla" />

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-10 w-full max-w-xs">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px] border border-heading/10 shadow-[0_4px_24px_rgba(34,22,56,0.08)]">
            <Image
              src="https://res.cloudinary.com/t6nm5hzp/image/upload/v1784377485/csmp-ias/site/sb-shukla-director.jpg"
              alt="S.B. Shukla Sir, Director, CSMP IAS"
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-center font-display text-base font-bold text-heading">
            S.B. Shukla Sir
            <span className="block font-body text-xs font-bold uppercase tracking-[0.06em] text-brand">Director, CSMP IAS</span>
          </p>
        </Reveal>
        <Reveal>
          <p className="text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
            Welcome to CSMP IAS. The journey to the Civil Services is one of the most demanding
            yet rewarding paths a student can take. When we established CSMP IAS in 2021, our
            goal was clear: to bridge the gap between hard work and success through structured
            mentorship.
          </p>
          <p className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
            At CSMP IAS, we believe that an aspirant doesn&rsquo;t just need information; they
            need a transformation. My journey as a mentor has shown me that with the right
            strategy, even the most complex subjects become manageable. Whether you are starting
            early with our &ldquo;BA to Bureaucracy&rdquo; program or refining your skills for the
            final interview, our commitment is to provide a home for your ambitions in the heart
            of Lucknow.
          </p>
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Our Success Stories
        </Reveal>
        <Reveal as="p" className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
          Since our inception in 2021, CSMP IAS has been proud to witness numerous aspirants turn
          their dreams into reality. Our success is reflected in the scores of students who have
          cleared the various stages of the Civil Services Examinations under our guidance. We
          celebrate every small win&mdash;from a student mastering their first answer-writing
          session to an aspirant securing their name in the final merit list. Your success is the
          true testimony of our hard work.
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Our Vision
        </Reveal>
        <Reveal as="p" className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
          To be the most trusted catalyst in creating ethical, competent, and compassionate civil
          servants who are prepared to lead India into a brighter future. We envision an
          educational ecosystem where quality mentorship is accessible to every dedicated
          aspirant, regardless of their background.
        </Reveal>

        <Reveal as="h2" className="mt-12 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Our Mission
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {missionPoints.map((point) => (
            <Reveal key={point.title}>
              <Card variant="brand" className="h-full">
                <CardBody>
                  <h3 className="font-display text-base font-bold text-heading">{point.title}</h3>
                  <p className="mt-2 text-sm leading-[1.6] text-muted">{point.body}</p>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal as="h2" className="mt-14 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Our Approach &mdash; The CSMP Framework
        </Reveal>
        <Reveal as="p" className="mt-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-[1.0625rem]">
          Our pedagogy is built on the CSMP (Civil Services Mentorship Programme) framework:
        </Reveal>
        <div className="mt-6 flex flex-col divide-y divide-heading/10 overflow-hidden rounded-[10px] border border-heading/10 bg-white shadow-[0_2px_16px_rgba(34,22,56,0.05)]">
          {approachPoints.map((point, i) => (
            <Reveal key={point.title} className="flex gap-4 px-5 py-4 sm:px-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display font-bold text-heading">{point.title}</h3>
                <p className="mt-1 text-sm leading-[1.6] text-muted">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
