import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { T } from "@/components/layout/t";
import { getFaqs } from "@/lib/queries";

export async function HomeFaq() {
  const faqs = await getFaqs();
  const preview = faqs.slice(0, 6);

  if (preview.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="section-title">
          <span className="eyebrow">
            <T k="home.faqTitle" />
          </span>
          <h2>
            <T k="home.generalFaqs" />
          </h2>
        </Reveal>
        <Reveal className="mt-10">
          <Accordion items={preview.map((f) => ({ question: f.question, answer: f.answer }))} />
        </Reveal>
        <p className="mt-6 text-center">
          <Link
            href="/faqs-preparation-tips"
            className="font-bold text-brand transition-colors hover:text-brand-dark"
          >
            View all FAQs &amp; preparation tips &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
