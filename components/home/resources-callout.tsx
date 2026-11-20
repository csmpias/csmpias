import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody } from "@/components/ui/card";

const tools = [
  {
    title: "Mock Tests",
    body: "Sectional and full-length mock tests for UPSC, UPPCS, BPSC, UKPSC and MPPSC, updated by our faculty.",
    href: "/resources/mock-tests",
  },
  {
    title: "Previous Year Questions",
    body: "Prelims and Mains PYQs organised by exam, year and subject to sharpen your answer-writing and recall.",
    href: "/resources/pyqs",
  },
  {
    title: "Daily Current Affairs Sheets",
    body: "Daily-updated current affairs sheets covering national, international and Uttar Pradesh-specific news.",
    href: "/resources/daily-sheets",
  },
];

export function ResourcesCallout() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="section-title">
          <span className="eyebrow">Free Resources</span>
          <h2>Study Tools to Sharpen Your Preparation</h2>
        </Reveal>
        <Reveal as="div" className="mt-10 grid gap-5 sm:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group block">
              <Card variant="brand" className="h-full bg-white">
                <CardBody className="p-6">
                  <h3 className="font-display text-[1.0625rem] font-bold text-heading transition-colors group-hover:text-brand sm:text-[1.1875rem]">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted">{tool.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-teal">
                    Explore <span aria-hidden>&rarr;</span>
                  </span>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
