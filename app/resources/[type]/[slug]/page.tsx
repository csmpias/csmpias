import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { getResourceBySlug } from "@/lib/queries";
import { renderRichContent } from "@/lib/rich-content";
import { resourceTypeBySlug, resourceTypeLabels, urlSlugForResourceType } from "@/lib/resource-routes";
import { downloadUrl } from "@/lib/cloudinary";
import { siteConfig } from "@/lib/site-config";
import { createPublicClient } from "@/lib/supabase/public";
import type { ResourceType } from "@/lib/types";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

// Pre-render every published resource at build time so Google can crawl
// fast, cached HTML instead of falling back to per-request dynamic rendering.
export async function generateStaticParams() {
  const supabase = createPublicClient();
  const { data } = await supabase.from("resources").select("type, slug, content").eq("status", "published");
  return (data ?? [])
    .filter((r) => r.slug && r.content) // only long-form resources get a detail page — matches app/sitemap.ts
    .map(({ type, slug }) => ({ type: urlSlugForResourceType(type as ResourceType), slug: slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await params;
  const resourceType = resourceTypeBySlug[type];
  if (!resourceType) return {};
  const resource = await getResourceBySlug(resourceType, slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.description ?? undefined,
    alternates: { canonical: `/resources/${type}/${slug}` },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;
  const resourceType = resourceTypeBySlug[type];
  if (!resourceType) notFound();

  const resource = await getResourceBySlug(resourceType, slug);
  if (!resource) notFound();

  const richContent = renderRichContent(resource.content);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${siteConfig.url}/resources` },
      {
        "@type": "ListItem",
        position: 3,
        name: resourceTypeLabels[resourceType],
        item: `${siteConfig.url}/resources/${type}`,
      },
      { "@type": "ListItem", position: 4, name: resource.title },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PageHeader
        eyebrow={resourceTypeLabels[resourceType]}
        title={resource.title}
        description={resource.description ?? undefined}
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Not wrapped in <Reveal>: its scroll-triggered fade-in can get
            stuck permanently invisible for a block taller than the
            viewport (see app/current-affairs/[slug]/page.tsx and
            components/courses/course-detail.tsx for the same fix) — daily
            sheets and other long resources hit this regularly. */}
        {richContent ? <div className="mx-auto max-w-[70ch]">{richContent}</div> : null}
        {resource.file_public_id ? (
          <div className="mt-8">
            <Button
              href={downloadUrl(resource.file_public_id, resource.slug)}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}
