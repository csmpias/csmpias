import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Batch Details",
  description:
    "CSMP IAS is one of the most trusted and result-oriented IAS & PCS coaching institutes in Lucknow, offering comprehensive Foundation Courses for UPSC Civil Services and UPPCS.",
  alternates: { canonical: "/batch-details" },
};

const overviewRows = [
  { label: "Mode of Classes", upsc: "Offline Classroom Coaching (Gomti Nagar)", uppcs: "Online Live Classes + Recorded Video Access" },
  { label: "Medium of Instruction", upsc: "Hindi & English", uppcs: "English" },
  { label: "Daily Class Duration", upsc: "2.5 Hours (Monday to Saturday)", uppcs: "1 Hour Extra Classes (Saturday)" },
  { label: "Faculty", upsc: "S.B. Shukla Sir", uppcs: "Team of UPSC/UPPCS Experts" },
];

const whyChoose = [
  "Highest Selection Rate in UPSC & UPPCS",
  "Personal Mentorship under Saket Sir & senior faculty",
  "Daily Answer Writing Practice with 1-on-1 Feedback",
  "Focused UP Special Preparation (for UPPCS)",
  "Integrated Prelims + Mains Approach",
  "Most Trusted IAS & PCS Institute in Uttar Pradesh",
  "Supportive Learning Environment",
];

const structure = [
  "Daily Classroom Lectures — complete syllabus coverage from basic to advanced level",
  "Concept building + application-based learning",
  "Previous Year Questions (PYQs) discussion",
  "Integrated preparation for Prelims & Mains",
  "Printed subject-wise books & class handouts",
  "Detailed GS notes (Prelims + Mains aligned)",
  "Monthly Current Affairs Magazine (Hindi & English)",
  "Essay framework & Ethics case studies",
  "UP Special Compendium (for UPPCS aspirants)",
];

const courseCards = [
  {
    name: "UPSC Foundation Course",
    duration: "18 Months",
    guidance: "2.5 Hours (Mon–Sat)",
    mode: "Offline (Lucknow) + Online Access",
    mentorship: "S.B. Shukla Sir & Team of UPSC Experts",
    medium: "Hindi & English",
  },
  {
    name: "UPPCS Foundation Course",
    duration: "12 Months",
    guidance: "2.5 Hours (Mon–Sat)",
    mode: "Offline (Lucknow) + Online Access",
    mentorship: "S.B. Shukla Sir & Team of UPPCS Experts",
    medium: "Hindi & English",
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BatchDetailsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Batch Details"
        title="Upcoming CSMP IAS Foundation Courses"
        description="UPSC & UPPCS Foundation Program (Lucknow – Gomti Nagar). CSMP IAS is one of the most trusted and result-oriented IAS & PCS coaching institutes in Lucknow, offering comprehensive Foundation Courses for UPSC Civil Services and UPPCS. Our courses are specially designed for beginners as well as serious aspirants who want strong conceptual clarity, answer writing mastery, and personal mentorship under experienced faculty."
      />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-[10px] border border-heading/10 shadow-[0_4px_24px_rgba(34,22,56,0.08)]">
          <Image
            src="https://res.cloudinary.com/t6nm5hzp/image/upload/v1784280195/csmp-ias/site/PCS-Coaching-in-Lucknow.webp"
            alt="PCS Coaching in Lucknow at CSMP IAS"
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal as="h2" className="flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Available Foundation Courses at CSMP IAS
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {courseCards.map((course) => (
            <Reveal key={course.name}>
              <Card variant="brand" className="h-full">
                <CardBody>
                  <h3 className="font-display text-lg font-bold text-heading">{course.name}</h3>
                  <dl className="mt-3 grid grid-cols-2 gap-y-2.5 text-sm">
                    <dt className="text-muted">Duration</dt>
                    <dd className="font-medium text-heading">{course.duration}</dd>
                    <dt className="text-muted">Daily Guidance</dt>
                    <dd className="font-medium text-heading">{course.guidance}</dd>
                    <dt className="text-muted">Mode of Learning</dt>
                    <dd className="font-medium text-heading">{course.mode}</dd>
                    <dt className="text-muted">Mentorship</dt>
                    <dd className="font-medium text-heading">{course.mentorship}</dd>
                    <dt className="text-muted">Instruction Medium</dt>
                    <dd className="font-medium text-heading">{course.medium}</dd>
                  </dl>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mt-4 text-sm text-muted">
          Both programs are available in Offline (Lucknow – Gomti Nagar) and Online (Live + Recorded) modes.
        </Reveal>

        <Reveal as="h2" className="mt-14 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Why CSMP IAS Coaching!
        </Reveal>
        <Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {whyChoose.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-[8px] border border-heading/10 bg-white px-4 py-3.5 text-sm font-semibold text-heading shadow-[0_2px_12px_rgba(34,22,56,0.05)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="h2" className="mt-14 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Course Overview
        </Reveal>
        <Reveal className="mt-6 overflow-x-auto rounded-[10px] border border-heading/10 shadow-[0_2px_16px_rgba(34,22,56,0.05)]">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-heading/10 bg-cream-2 text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-heading">
                <th className="px-4 py-3.5"></th>
                <th className="px-4 py-3.5">Offline Class Schedule</th>
                <th className="px-4 py-3.5">Online Class Schedule</th>
              </tr>
            </thead>
            <tbody>
              {overviewRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 1 ? "bg-cream/40" : "bg-white"}>
                  <td className="px-4 py-3.5 font-semibold text-heading">{row.label}</td>
                  <td className="px-4 py-3.5 text-muted">{row.upsc}</td>
                  <td className="px-4 py-3.5 text-muted">{row.uppcs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal as="h2" className="mt-14 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          Complete Foundation Class Structure
        </Reveal>
        <Reveal>
          <ul className="mt-6 flex flex-col divide-y divide-heading/10 overflow-hidden rounded-[10px] border border-heading/10 bg-white shadow-[0_2px_16px_rgba(34,22,56,0.05)]">
            {structure.map((item) => (
              <li key={item} className="px-5 py-3.5 text-sm text-muted sm:px-6">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  );
}
