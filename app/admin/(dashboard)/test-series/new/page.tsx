import { TestSeriesForm } from "@/components/admin/test-series-form";
import { createTestSeries } from "@/lib/actions/admin/test-series";

export default function NewTestSeriesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Test Series</h1>
      <div className="mt-6">
        <TestSeriesForm action={createTestSeries} />
      </div>
    </div>
  );
}
