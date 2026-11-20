import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { ResourceCard } from "@/components/resources/resource-card";
import { getPublishedResources } from "@/lib/queries";
import { resourceTypeBySlug, resourceTypeLabels, resourceTypeDescriptions } from "@/lib/resource-routes";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

export function generateStaticParams() {
  return Object.keys(resourceTypeBySlug).map((type) => ({ type }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const resourceType = resourceTypeBySlug[type];
  if (!resourceType) return {};
  return {
    title: resourceTypeLabels[resourceType],
    description: resourceTypeDescriptions[resourceType],
    alternates: { canonical: `/resources/${type}` },
  };
}

export default async function ResourceTypePage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ examType?: string; subject?: string; year?: string }>;
}) {
  const { type } = await params;
  const resourceType = resourceTypeBySlug[type];
  if (!resourceType) notFound();

  const { examType, subject, year } = await searchParams;
  const resources = await getPublishedResources(resourceType, {
    examType,
    subject,
    year: year ? Number(year) : undefined,
  });

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title={resourceTypeLabels[resourceType]}
        description={resourceTypeDescriptions[resourceType]}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {resources.length === 0 ? (
          <EmptyState
            title={`${resourceTypeLabels[resourceType]} coming soon`}
            description="Our faculty is preparing this collection. Check back shortly, or contact us for the latest available material."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} urlSlug={type} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
