import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { ApplyNowForm } from "@/components/home/apply-now-form";

export const metadata: Metadata = {
  title: "Apply Now",
  description: "Apply online for UPSC, UPPCS, BPSC, UKPSC and MPPSC coaching programs at CSMP IAS, Lucknow.",
  alternates: { canonical: "/apply-now" },
};

export default function ApplyNowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Online Admission"
        title="Apply Now"
        description="Fill out the form below and our admissions team will reach out to complete your enrollment at CSMP IAS."
      />
      <div className="bg-cream-2/60 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ApplyNowForm />
          </Reveal>
        </div>
      </div>
    </>
  );
}
