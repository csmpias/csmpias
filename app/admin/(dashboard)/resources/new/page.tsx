import { ResourceForm } from "@/components/admin/resource-form";
import { createResource } from "@/lib/actions/admin/resources";
import { resourceTypeLabels } from "@/lib/resource-routes";
import type { ResourceType } from "@/lib/types";

export default async function NewResourcePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const initialType = type && type in resourceTypeLabels ? (type as ResourceType) : undefined;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Resource</h1>
      <div className="mt-6">
        <ResourceForm action={createResource} initialType={initialType} />
      </div>
    </div>
  );
}
