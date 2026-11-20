import { BatchForm } from "@/components/admin/batch-form";
import { createBatch } from "@/lib/actions/admin/batches";
import { createClient } from "@/lib/supabase/server";

export default async function NewBatchPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("courses").select("id, name").order("name", { ascending: true });
  const courses = data ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Batch</h1>
      <div className="mt-6">
        <BatchForm action={createBatch} courses={courses} />
      </div>
    </div>
  );
}
