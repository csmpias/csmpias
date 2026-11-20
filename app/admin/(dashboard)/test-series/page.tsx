import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTestSeries } from "@/lib/actions/admin/test-series";
import { formatDate } from "@/lib/utils";
import type { TestSeries } from "@/lib/types";

export default async function AdminTestSeriesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("test_series").select("*").order("start_date", { ascending: false });
  const testSeriesList = (data ?? []) as TestSeries[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Test Series</h1>
        <Link href="/admin/test-series/new" className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
          New Test Series
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Exam Type</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">File</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {testSeriesList.map((ts) => (
              <tr key={ts.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{ts.name}</td>
                <td className="px-4 py-3">{ts.exam_type ?? "—"}</td>
                <td className="px-4 py-3 text-ink/70">{ts.start_date ? formatDate(ts.start_date) : "—"}</td>
                <td className="px-4 py-3">
                  {ts.file_url ? (
                    <a
                      href={ts.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-sm text-ink/50">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/test-series/${ts.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteTestSeries.bind(null, ts.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {testSeriesList.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No test series yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
