import { notFound } from "next/navigation";
import { ResourceForm } from "@/components/admin/resource-form";
import { updateResource } from "@/lib/actions/admin/resources";
import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/types";

export default async function EditResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("resources").select("*").eq("id", id).maybeSingle();
  const resource = data as Resource | null;
  if (!resource) notFound();

  const action = updateResource.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Resource</h1>
      <div className="mt-6">
        <ResourceForm resource={resource} action={action} />
      </div>
    </div>
  );
}
