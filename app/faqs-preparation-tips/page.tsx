import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { getFaqs } from "@/lib/queries";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

export const metadata: Metadata = {
  title: "FAQs & Preparation Tips",
  description:
    "We are located in the heart of Gomti Nagar, near the main market. Find answers about courses, fees, mentorship and preparation strategy at CSMP IAS.",
  alternates: { canonical: "/faqs-preparation-tips" },
};

const categoryLabels: Record<string, string> = {
  general: "General Questions",
  "course-details": "Course Details",
  "fees-scholarships": "Fees & Scholarships",
  "preparation-tips": "Preparation Tips",
  "mentorship-support": "Mentorship & Support",
};

export default async function FaqsPreparationTipsPage() {
  const faqs = await getFaqs();
  const grouped = Object.entries(categoryLabels).map(([key, label]) => ({
    label,
    items: faqs.filter((f) => f.category === key),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader eyebrow="FAQs & Preparation Tips" title="FAQs & Preparation Tips" />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        {grouped.map((group) =>
          group.items.length > 0 ? (
            <div key={group.label} className="mb-12 last:mb-0">
              <Reveal as="h2" className="mb-6 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
                <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
                {group.label}
              </Reveal>
              <Reveal>
                <Accordion items={group.items.map((f) => ({ question: f.question, answer: f.answer }))} />
              </Reveal>
            </div>
          ) : null,
        )}
      </div>
    </>
  );
}
