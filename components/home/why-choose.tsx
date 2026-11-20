import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody } from "@/components/ui/card";

const reasons = [
  {
    title: "Renowned & Experienced Faculty",
    body: "Expert UPSC faculty ensuring strong concept clarity, quality teaching, complete syllabus coverage, and a current-affairs-focused, exam-oriented learning approach.",
  },
  {
    title: "Enriched & Updated Study Resources",
    body: "Regularly updated books, daily and weekly current affairs PDFs, monthly magazines, All-India Prelims and Mains test series, and guidance from a dedicated academic coach.",
  },
  {
    title: "Personalised Student Support",
    body: "One-to-one mentoring, answer-writing guidance, regular doubt resolution, motivation sessions, and weekly and monthly tests to track progress effectively.",
  },
  {
    title: "Technology-Enabled Learning Environment",
    body: "Recorded lectures for revision, a structured and supportive ecosystem, robust infrastructure, and a technology-driven platform for seamless and uninterrupted learning.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="section-title">
          <span className="eyebrow">Why CSMP IAS</span>
          <h2>Because Your UPSC Dream Deserves the Right Guidance</h2>
        </Reveal>
        <Reveal as="div" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Card key={reason.title} variant="brand">
              <CardBody className="p-6">
                <span
                  aria-hidden
                  className="flex size-10 items-center justify-center rounded-full bg-brand/10 font-display text-base font-bold text-brand"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[1.0625rem] font-bold text-heading sm:text-[1.1875rem]">
                  {reason.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-muted">{reason.body}</p>
              </CardBody>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
