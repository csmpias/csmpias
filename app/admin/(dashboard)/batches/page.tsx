import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteBatch } from "@/lib/actions/admin/batches";
import { formatDate } from "@/lib/utils";

type BatchRow = {
  id: string;
  name: string;
  start_date: string | null;
  status: string;
  center: string | null;
  courses: { name: string } | null;
};

export default async function AdminBatchesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("batches")
    .select("id, name, start_date, status, center, courses(name)")
    .order("start_date", { ascending: false });
  const batches = (data ?? []) as unknown as BatchRow[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Batches</h1>
        <Link href="/admin/batches/new" className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
          New Batch
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{batch.name}</td>
                <td className="px-4 py-3">{batch.courses?.name ?? "—"}</td>
                <td className="px-4 py-3 text-ink/70">{batch.start_date ? formatDate(batch.start_date) : "—"}</td>
                <td className="px-4 py-3">{batch.status}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/batches/${batch.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteBatch.bind(null, batch.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {batches.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No batches yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
