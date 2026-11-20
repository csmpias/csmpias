import { notFound } from "next/navigation";
import { TestSeriesForm } from "@/components/admin/test-series-form";
import { updateTestSeries } from "@/lib/actions/admin/test-series";
import { createClient } from "@/lib/supabase/server";
import type { TestSeries } from "@/lib/types";

export default async function EditTestSeriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("test_series").select("*").eq("id", id).maybeSingle();
  const testSeries = data as TestSeries | null;
  if (!testSeries) notFound();

  const action = updateTestSeries.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Test Series</h1>
      <div className="mt-6">
        <TestSeriesForm testSeries={testSeries} action={action} />
      </div>
    </div>
  );
}
