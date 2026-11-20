import { notFound } from "next/navigation";
import { BatchForm } from "@/components/admin/batch-form";
import { updateBatch } from "@/lib/actions/admin/batches";
import { createClient } from "@/lib/supabase/server";
import type { Batch } from "@/lib/types";

export default async function EditBatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data }, { data: courseData }] = await Promise.all([
    supabase.from("batches").select("*").eq("id", id).maybeSingle(),
    supabase.from("courses").select("id, name").order("name", { ascending: true }),
  ]);
  const batch = data as Batch | null;
  if (!batch) notFound();

  const action = updateBatch.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Batch</h1>
      <div className="mt-6">
        <BatchForm batch={batch} courses={courseData ?? []} action={action} />
      </div>
    </div>
  );
}
