import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { BatchInfoCard } from "@/components/courses/batch-info-card";
import { ContactCard } from "@/components/courses/contact-card";
import { PaymentQRCard } from "@/components/courses/payment-qr-card";
import { PdfViewer } from "@/components/courses/pdf-viewer";
import { UpcomingBatchesCard } from "@/components/courses/upcoming-batches-card";
import { renderRichContent } from "@/lib/rich-content";
import { getUpcomingBatches } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/types";

const FALLBACK_COVER_IMAGE = "/about-coaching-hero.webp";
const INTERVIEW_GUIDANCE_SLUG = "uppcs-2026-interview-guidance-programme";

function absoluteImageUrl(url: string): string {
  return url.startsWith("http") ? url : `${siteConfig.url}${url}`;
}

export async function CourseDetail({ course }: { course: Course }) {
  const upcomingBatches = await getUpcomingBatches(course.id);
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description ?? course.name,
    image: absoluteImageUrl(course.cover_image_url ?? FALLBACK_COVER_IMAGE),
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

  // This component is rendered from several different routes (dynamic
  // course paths and a few fixed single-course pages), so its own URL
  // isn't reliably knowable here — only "Home" gets a resolvable `item`
  // URL; the current page is named without one, which is valid per
  // schema.org (the last crumb's `item` is optional).
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: course.name },
    ],
  };

  const richContent = renderRichContent(course.content);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PageHeader eyebrow={course.exam_type ?? "Program"} title={course.name} description={course.description ?? undefined} />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Uploaded course covers are text-heavy promotional posters (fee,
            dates, contact info baked into the graphic), not plain photos —
            object-cover would crop that text. Contain + a neutral backdrop
            keeps the whole poster legible regardless of its native ratio.

            Not wrapped in <Reveal>: its IntersectionObserver-based fade-in
            reliably failed to ever fire for this above-the-fold image in
            testing (data-visible stayed false even after scrolling away and
            back), leaving the cover permanently invisible — confirmed as a
            real bug, not just a headless-testing artifact. */}
        <div
          className={cn(
            "relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-[10px] border border-heading/10 shadow-[0_4px_24px_rgba(34,22,56,0.08)]",
            course.cover_image_url && "bg-cream",
          )}
        >
          <Image
            src={course.cover_image_url ?? FALLBACK_COVER_IMAGE}
            alt={course.name}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className={course.cover_image_url ? "object-contain" : "object-cover object-right"}
          />
        </div>

        {/* Not wrapped in <Reveal>: that component's scroll-triggered fade-in
            uses an IntersectionObserver area-ratio threshold, which can
            never fire for a block taller than ~6x the viewport — and
            course content here is long and variable enough to regularly
            exceed that (e.g. the full test-series schedule table). Content
            would stay invisible for real visitors, not just look delayed. */}
        <div className="grid gap-10 lg:grid-cols-3">
          {/* min-w-0: without it, a grid item defaults to min-width: auto,
              so a wide child (a fee/schedule table's min-w-[36rem]) blows
              out this item — and the whole page — to fit it instead of
              staying within the column and letting the table's own
              overflow-x-auto scroll internally. Confirmed via a 375px
              overflow scan: every course with a markdown table in its
              content overflowed by ~219px before this fix. */}
          <div className="min-w-0 lg:col-span-2">
            {richContent ?? (
              <p className="text-[0.9375rem] leading-[1.75] text-muted sm:text-[1.0625rem]">
                Details for this program are being updated. Reach out to us directly for the latest batch
                information.
              </p>
            )}
            {course.resource_files.map((file) => (
              <PdfViewer key={file.url} url={file.url} title={file.title} />
            ))}
          </div>
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <BatchInfoCard
                examType={course.exam_type}
                duration={course.duration}
                mode={course.mode}
                medium={course.medium}
                fee={course.fee}
                applyMode={course.slug === INTERVIEW_GUIDANCE_SLUG ? "popup" : "link"}
              />
              <UpcomingBatchesCard batches={upcomingBatches} />
              <PaymentQRCard courseName={course.name} />
              <ContactCard courseName={course.name} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
