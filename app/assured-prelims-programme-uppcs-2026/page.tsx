import type { Metadata } from "next";
import Image from "next/image";
import { AssuredPrelimsTabs, type TabItem } from "@/components/courses/assured-prelims-tabs";
import { ContactCard } from "@/components/courses/contact-card";
import { PaymentQRCard } from "@/components/courses/payment-qr-card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const PAGE_TITLE = "ASSURED PRELIMS PROGRAMME – UPPCS 2026";
const PAGE_DESCRIPTION =
  "Prepare for UPPCS 2026 with CSMP IAS Lucknow. Structured GS + CSAT course, test series, current affairs, and expert guidance for Prelims Programme";
const HERO_IMAGE = "/ASSUREDIMAGE.png";

const PAGE_KEYWORDS = [
  "Assured Prelims Programme UPPCS 2026",
  "UPPCS Prelims 2026",
  "Best UPPCS Prelims Coaching in Lucknow",
  "UPPCS Prelims Test Series",
  "UPPCS Prelims Preparation",
  "UPPSC Prelims Course",
  "UPPCS Coaching Near Me Lucknow",
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Best UPPCS Prelims Programme Coaching 2026 in Lucknow",
    description: PAGE_DESCRIPTION,
    keywords: PAGE_KEYWORDS,
    alternates: { canonical: "/assured-prelims-programme-uppcs-2026" },
  };
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-xl font-bold text-heading sm:text-2xl">{children}</h3>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h4 className="mt-6 font-display text-[1.0625rem] font-bold text-heading">{children}</h4>;
}

function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[0.9375rem] leading-[1.75] text-muted sm:text-[1.0625rem]">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-[1.65] text-muted sm:text-[1.0625rem]">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LabeledList({ items }: { items: { label: string; value: string }[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2.5 text-[0.9375rem] leading-[1.65] text-muted sm:text-[1.0625rem]">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>
            <strong className="font-semibold text-heading">{item.label}:</strong> {item.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-6 rounded-[10px] border-l-4 border-brand bg-cream px-5 py-4 text-[0.9375rem] italic leading-[1.7] text-heading sm:text-[1.0625rem]">
      {children}
    </blockquote>
  );
}

function VideoEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="mt-6 aspect-video w-full overflow-hidden rounded-[10px] border border-heading/10 shadow-[0_4px_24px_rgba(34,22,56,0.08)]">
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function CtaButtons() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button href="/apply-now" variant="primary">
        Apply Today
      </Button>
      <Button href="/contact-us" variant="outline">
        Book A Mentor Consultation
      </Button>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border border-heading/10 bg-cream px-5 py-4">
      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">{label}</dt>
      <dd className="mt-1.5 font-body text-[0.9375rem] font-bold leading-snug tracking-tight text-heading">{value}</dd>
    </div>
  );
}

const DESCRIPTION_HIGHLIGHTS = [
  "450 hours of classes",
  "28 mock tests (GS + CSAT)",
  "Regular class tests with value-added study material",
  "Free mentorship",
  "Free Mains course for candidates who qualify Prelims",
];

function DescriptionList({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 grid gap-1">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BatchInfoCard() {
  return (
    <div className="rounded-[14px] border border-heading/10 bg-white p-5 shadow-[0_2px_16px_rgba(34,22,56,0.05)] sm:p-6">
      <h3 className="font-display text-lg font-bold text-heading">Batch Information</h3>
      <dl className="mt-4 grid gap-3">
        <InfoItem label="Program Type" value="ASSURED PRELIMS PROGRAMME – UPPCS 2026" />
        <InfoItem
          label="Description"
          value={
            <>
              Complete course structure covering GS + CSAT, test series, and revision:
              <DescriptionList items={DESCRIPTION_HIGHLIGHTS} />
            </>
          }
        />
        <InfoItem label="Mode of Learning" value="Online Live Classes & Hybrid Support" />
        <InfoItem label="Location" value="Lucknow, Uttar Pradesh" />
        <InfoItem label="Language of Instruction" value="English & Hindi" />
        <InfoItem label="Mentorship & Support" value="Personalized Mentorship, Doubt Sessions & Answer Evaluation" />
      </dl>
      <div className="mt-6 flex flex-col gap-3">
        <Button href="/apply-now" variant="primary" className="w-full">
          Apply Today
        </Button>
        <Button href="/contact-us" variant="outline" className="w-full">
          Book A Mentor Consultation
        </Button>
      </div>
    </div>
  );
}

const tabs: TabItem[] = [
  {
    id: "overview",
    label: "Program Overview",
    content: (
      <div>
        <SectionHeading>Program Overview</SectionHeading>
        <Lead>
          The Assured Prelims Programme (UPPCS 2026) at CSMP IAS Lucknow is a scientifically designed course aimed at
          ensuring success in the Prelims stage. This program integrates concept building, PYQ analysis, MCQ
          practice, revision strategy, and current affairs to create a complete preparation ecosystem. Under the
          mentorship of Dr. S.B. Shukla Sir, this program is focused on developing accuracy, speed, and smart
          strategy required to clear the UPPCS Prelims examination.
        </Lead>

        <SubHeading>Programme Highlights</SubHeading>
        <BulletList
          items={[
            "Target Exam: UPPCS Prelims 2026 (Expected December)",
            "Focus: GS Paper-I (Merit) + CSAT (Qualifying)",
            "Structured approach with phase-wise preparation",
            "Daily + Weekly + Monthly evaluation system",
          ]}
        />

        <SubHeading>Our Preparation Philosophy</SubHeading>
        <Callout>
          We believe Prelims is not about covering everything, but about mastering the right content with precision.
          Our approach focuses on smart study, repeated revision, and maximum practice. CSMP IAS Lucknow – Turning
          Preparation into Selection.
        </Callout>

        <SubHeading>Programme Introduction Video</SubHeading>
        <VideoEmbed
          src="https://www.youtube.com/embed/KeM-M-fCYTU"
          title="Assured Prelims Programme – UPPCS 2026 overview"
        />
      </div>
    ),
  },
  {
    id: "foundation",
    label: "Foundation Phase (Subjects)",
    content: (
      <div>
        <SectionHeading>Phase 1: Foundation Stage (GS Paper-I Subjects)</SectionHeading>
        <Lead>
          The foundation phase focuses on building strong conceptual clarity across all subjects of GS Paper-I.
        </Lead>

        <LabeledList
          items={[
            { label: "History", value: "Ancient & Medieval (Selective), Modern India, Freedom Struggle (UP Focus)" },
            { label: "Geography", value: "Physical Geography, Indian Geography, Uttar Pradesh Geography" },
            { label: "Polity", value: "Constitution, Fundamental Rights, DPSP, Panchayati Raj (UP Focus)" },
            { label: "Economy", value: "Basic Concepts, Budget, Economic Survey, UP Economy" },
            { label: "Environment", value: "Ecology, Biodiversity, Climate Change, Conventions" },
            { label: "Science & Tech", value: "Basic Science, Space, Defence, IT" },
            { label: "Current Affairs", value: "National + International + UP Special" },
          ]}
        />

        <SubHeading>Objective</SubHeading>
        <Lead>To develop a strong base that supports advanced preparation and improves retention.</Lead>
      </div>
    ),
  },
  {
    id: "csat",
    label: "CSAT + Advanced Phase",
    content: (
      <div>
        <SectionHeading>Phase 2 &amp; Phase 3: CSAT Preparation + Advanced Practice</SectionHeading>

        <SubHeading>CSAT Preparation (Parallel Phase)</SubHeading>
        <BulletList
          items={[
            "Comprehension (Hindi + English)",
            "Logical Reasoning & Decision Making",
            "Quantitative Aptitude (Class 10 Level)",
            "Data Interpretation (Charts & Graphs)",
          ]}
        />
        <Lead>
          <strong className="font-semibold text-heading">Strategy:</strong> Daily 1 hour practice with focus on weak
          areas.
        </Lead>

        <SubHeading>Advanced Practice & PYQ Analysis</SubHeading>
        <BulletList
          items={["10–15 Years PYQ Analysis (UPPCS + UPSC)", "Topic-wise MCQ Practice", "Concept Strengthening"]}
        />
        <Lead>
          <strong className="font-semibold text-heading">Special Focus:</strong> UP Specific Questions, Current
          Affairs based MCQs, Static + Dynamic Integration
        </Lead>
      </div>
    ),
  },
  {
    id: "test-series",
    label: "Test Series + Revision Plan",
    content: (
      <div>
        <SectionHeading>Phase 4 &amp; Phase 5: Test Series + Revision Master Plan</SectionHeading>

        <SubHeading>Test Series Structure</SubHeading>
        <LabeledList
          items={[
            { label: "Total Tests", value: "28" },
            { label: "GS Sectional Tests", value: "13" },
            { label: "CSAT Sectional Tests", value: "5" },
            { label: "Full Length Tests", value: "10" },
          ]}
        />
        <Lead>
          <strong className="font-semibold text-heading">Evaluation System:</strong> Accuracy Analysis, Weak Area
          Identification, Time Management Improvement
        </Lead>

        <SubHeading>Revision Strategy (Last 60 Days)</SubHeading>
        <BulletList items={["Short Notes Revision", "Important One-Liners", "Mock + PYQ Revision"]} />

        <SubHeading>Must Revise Topics</SubHeading>
        <BulletList
          items={[
            "Government Schemes (Central + UP)",
            "Reports & Indices",
            "Environment Conventions",
            "Important Polity Articles",
            "Modern History Events",
          ]}
        />
      </div>
    ),
  },
  {
    id: "strategy",
    label: "Strategy + USP + CTA",
    content: (
      <div>
        <SectionHeading>Selection Strategy &amp; Programme USP</SectionHeading>

        <SubHeading>Smart Selection Strategy</SubHeading>
        <BulletList
          items={[
            "80–20 Rule: 20% Topics = 80% Questions",
            "Focus Subjects: Polity, History, Economy, Geography, Science, Current Affairs",
            "Attempt Strategy: 90–100 Questions",
            "Target Accuracy: 70%+",
          ]}
        />

        <SubHeading>Daily Study Plan (Ideal – 6 Hours)</SubHeading>
        <LabeledList
          items={[
            { label: "GS Static", value: "3–4 Hours" },
            { label: "Current Affairs", value: "1 Hour" },
            { label: "CSAT", value: "1 Hour" },
            { label: "MCQ Practice", value: "1 Hour" },
          ]}
        />

        <SubHeading>Programme USP</SubHeading>
        <BulletList
          items={[
            "Daily Study Schedule",
            "Topic-wise Value Added Notes",
            "Daily MCQ Practice",
            "Weekly Revision Tests",
            "Monthly Current Affairs Compilation",
            "UP Special Modules",
            "CSAT Crash Course",
          ]}
        />

        <SubHeading>Join Now</SubHeading>
        <Lead>
          Start your preparation with a structured and result-oriented approach at CSMP IAS Lucknow and move one step
          closer to your dream of becoming a civil servant. CSMP IAS – Concept to Selection.
        </Lead>
        <CtaButtons />
      </div>
    ),
  },
];

export default function Page() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    image: `${siteConfig.url}${HERO_IMAGE}`,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
    },
    areaServed: siteConfig.areasServed.map((name) => ({ "@type": "City", name })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: PAGE_TITLE },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden bg-[#d9b47f]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <h1 className="font-display text-[1.75rem] font-extrabold leading-[1.15] text-heading sm:text-[2.25rem] md:text-[2.75rem]">
              {PAGE_TITLE}
            </h1>
            <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[20px] border-4 border-heading bg-white shadow-[0_10px_40px_rgba(34,22,56,0.35)]">
              <Image
                src={HERO_IMAGE}
                alt="CSMP IAS Assured Prelims Program poster: UPPCS Prelims 2026 online batch, starts 18th July 2026, 8-10 PM, fee ₹12,000"
                fill
                priority
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Neither block below is wrapped in <Reveal> anymore: its
          IntersectionObserver fade-in reliably failed to fire for
          above-the-fold content in testing, leaving the tabs, batch info,
          payment QR, and contact card permanently invisible. */}
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
          ASSURED PRELIMS PROGRAMME – UPPCS 2026 | CSMP IAS Lucknow
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AssuredPrelimsTabs
          tabs={tabs}
          sidebar={
            <>
              <BatchInfoCard />
              <PaymentQRCard courseName="Assured Prelims Programme (UPPCS 2026)" />
              <ContactCard courseName="Assured Prelims Programme (UPPCS 2026)" />
            </>
          }
        />
      </div>
    </>
  );
}
