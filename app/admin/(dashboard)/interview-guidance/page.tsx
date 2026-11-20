import { createClient } from "@/lib/supabase/server";
import { downloadUrl } from "@/lib/cloudinary";
import { formatDate } from "@/lib/utils";
import type { InterviewGuidanceRegistration } from "@/lib/types";

export default async function AdminInterviewGuidancePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("interview_guidance_registrations")
    .select("*")
    .order("created_at", { ascending: false });
  const registrations = (data ?? []) as InterviewGuidanceRegistration[];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Interview Guidance Registrations</h1>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Roll No.</th>
              <th className="px-4 py-3">Medium</th>
              <th className="px-4 py-3">Interview Preference</th>
              <th className="px-4 py-3">DAF PDF</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b border-rule align-top last:border-0">
                <td className="px-4 py-3 font-medium">
                  {reg.first_name} {reg.last_name}
                </td>
                <td className="px-4 py-3 text-ink/70">
                  <div>{reg.email}</div>
                  <div>{reg.mobile_no}</div>
                </td>
                <td className="px-4 py-3 text-ink/70">{reg.roll_no ?? "—"}</td>
                <td className="px-4 py-3 text-ink/70">{reg.medium}</td>
                <td className="px-4 py-3 text-ink/70">{reg.interview_preference}</td>
                <td className="px-4 py-3 text-ink/70">
                  {reg.daf_pdf_url ? (
                    <div className="flex flex-col gap-1">
                      <a
                        href={reg.daf_pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-accent hover:underline"
                      >
                        View PDF
                      </a>
                      {reg.daf_pdf_public_id ? (
                        <a
                          href={downloadUrl(reg.daf_pdf_public_id, `${reg.first_name}-${reg.last_name}-DAF`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-accent hover:underline"
                        >
                          Download
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-ink/70">{formatDate(reg.created_at)}</td>
              </tr>
            ))}
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink/70">
                  No registrations yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
