import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusTag } from "@/components/ui/status-tag";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteResource } from "@/lib/actions/admin/resources";
import { formatDate } from "@/lib/utils";
import { resourceTypeLabels } from "@/lib/resource-routes";
import type { Resource, ResourceType } from "@/lib/types";

export default async function AdminResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const resourceType = type && type in resourceTypeLabels ? (type as ResourceType) : undefined;

  const supabase = await createClient();
  let query = supabase.from("resources").select("*").order("updated_at", { ascending: false });
  if (resourceType) query = query.eq("type", resourceType);
  const { data } = await query;
  const resources = (data ?? []) as Resource[];

  const heading = resourceType ? resourceTypeLabels[resourceType] : "Resources";
  const newHref = resourceType ? `/admin/resources/new?type=${resourceType}` : "/admin/resources/new";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">{heading}</h1>
        <Link href={newHref} className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
          New
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{resource.title}</td>
                <td className="px-4 py-3 text-ink/70">{resourceTypeLabels[resource.type]}</td>
                <td className="px-4 py-3">
                  <StatusTag status={resource.status} />
                </td>
                <td className="px-4 py-3 text-ink/70">{formatDate(resource.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/resources/${resource.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteResource.bind(null, resource.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {resources.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No resources yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
