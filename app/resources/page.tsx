import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardBody } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { resourceTypeBySlug, resourceTypeLabels, resourceTypeDescriptions } from "@/lib/resource-routes";

export const metadata: Metadata = {
  title: "Resources",
  description: "Mock tests, previous year questions, daily current affairs sheets, syllabus and study material from CSMP IAS.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesHubPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Free Study Resources"
        description="Everything you need to practice, revise and stay updated — organised in one place."
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(resourceTypeBySlug).map(([urlSlug, type]) => (
            <Reveal key={urlSlug} className="h-full">
              <Link href={`/resources/${urlSlug}`} className="block h-full">
                <Card variant="brand" className="flex h-full flex-col">
                  <CardBody className="flex flex-1 flex-col">
                    <h3 className="font-display text-[1.0625rem] font-bold text-heading sm:text-[1.1875rem]">
                      {resourceTypeLabels[type]}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted">{resourceTypeDescriptions[type]}</p>
                    <span className="mt-auto pt-4 font-body text-[0.8125rem] font-bold uppercase tracking-[0.03em] text-brand">
                      Browse &rarr;
                    </span>
                  </CardBody>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
