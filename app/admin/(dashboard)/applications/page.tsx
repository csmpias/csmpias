import { createClient } from "@/lib/supabase/server";
import { ApplicationStatusSelect } from "@/components/admin/application-status-select";
import { formatDate } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/lib/types";

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("applications").select("*").order("submitted_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data } = await query;
  const applications = (data ?? []) as Application[];

  const statuses: ApplicationStatus[] = ["new", "contacted", "enrolled", "rejected"];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold">Applications</h1>
        <a
          href="/api/admin/applications/export"
          className="rounded-[4px] border border-rule px-4 py-2.5 text-sm font-semibold hover:border-ink"
        >
          Export CSV
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="/admin/applications"
          className={`rounded-[3px] px-3 py-1.5 font-data text-[0.6875rem] uppercase tracking-[0.04em] ${!status ? "bg-ink text-paper" : "bg-paper-dim text-ink/70"}`}
        >
          All
        </a>
        {statuses.map((s) => (
          <a
            key={s}
            href={`/admin/applications?status=${s}`}
            className={`rounded-[3px] px-3 py-1.5 font-data text-[0.6875rem] uppercase tracking-[0.04em] ${status === s ? "bg-ink text-paper" : "bg-paper-dim text-ink/70"}`}
          >
            {s}
          </a>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[820px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-rule align-top last:border-0">
                <td className="px-4 py-3 font-medium">{app.full_name}</td>
                <td className="px-4 py-3 text-ink/70">
                  <div>{app.email}</div>
                  <div>{app.whatsapp_number}</div>
                </td>
                <td className="px-4 py-3 text-ink/70">{app.course_selection ?? "—"}</td>
                <td className="px-4 py-3 text-ink/70">{formatDate(app.submitted_at)}</td>
                <td className="px-4 py-3">
                  <ApplicationStatusSelect id={app.id} status={app.status} />
                </td>
              </tr>
            ))}
            {applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No applications yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
