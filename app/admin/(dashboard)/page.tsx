import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAnalyticsSummary } from "@/lib/queries";
import { ApplicationStatusSelect } from "@/components/admin/application-status-select";
import { cn, formatDate } from "@/lib/utils";
import type { Application, ApplicationStatus, InterviewGuidanceRegistration } from "@/lib/types";

const APPLICATION_STATUSES: ApplicationStatus[] = ["new", "contacted", "enrolled", "rejected"];

const STATUS_BAR_COLORS: Record<ApplicationStatus, string> = {
  new: "bg-accent",
  contacted: "bg-accent-2",
  enrolled: "bg-teal",
  rejected: "bg-danger",
};

function StatCard({ label, value, href }: { label: string; value: string | number; href?: string }) {
  const inner = (
    <>
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">{label}</p>
    </>
  );
  const className = cn(
    "rounded-[4px] border border-rule bg-paper p-5",
    href && "transition-colors hover:border-2 hover:border-ink",
  );
  return href ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}

function SectionHeading({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {href ? (
        <Link href={href} className="text-sm font-medium text-accent hover:underline">
          {linkLabel ?? "View all"}
        </Link>
      ) : null}
    </div>
  );
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    applicationsAll,
    recentApplications,
    interviewGuidanceAll,
    recentInterviewGuidance,
    quizThisWeek,
    publishedPosts,
    mockTests,
    pyqs,
    activeCourses,
    analytics,
  ] = await Promise.all([
    supabase.from("applications").select("status, submitted_at"),
    supabase
      .from("applications")
      .select("id, full_name, email, whatsapp_number, course_selection, status, submitted_at")
      .order("submitted_at", { ascending: false })
      .limit(6),
    supabase.from("interview_guidance_registrations").select("created_at"),
    supabase
      .from("interview_guidance_registrations")
      .select("id, first_name, last_name, mobile_no, interview_preference, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase.from("quiz_attempts").select("*", { count: "exact", head: true }).gte("created_at", weekAgo),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("resources").select("*", { count: "exact", head: true }).eq("type", "mock_test"),
    supabase.from("resources").select("*", { count: "exact", head: true }).eq("type", "pyq"),
    supabase.from("courses").select("*", { count: "exact", head: true }).eq("is_active", true),
    getAnalyticsSummary(),
  ]);

  const applicationRows = (applicationsAll.data ?? []) as Pick<Application, "status" | "submitted_at">[];
  const recentApplicationRows = (recentApplications.data ?? []) as Pick<
    Application,
    "id" | "full_name" | "email" | "whatsapp_number" | "course_selection" | "status" | "submitted_at"
  >[];
  const interviewGuidanceRows = (interviewGuidanceAll.data ?? []) as Pick<
    InterviewGuidanceRegistration,
    "created_at"
  >[];
  const recentInterviewGuidanceRows = (recentInterviewGuidance.data ?? []) as Pick<
    InterviewGuidanceRegistration,
    "id" | "first_name" | "last_name" | "mobile_no" | "interview_preference" | "created_at"
  >[];

  const applicationsToday = applicationRows.filter((a) => a.submitted_at >= dayAgo).length;
  const applicationsThisWeek = applicationRows.filter((a) => a.submitted_at >= weekAgo).length;
  const totalApplications = applicationRows.length;

  const interviewGuidanceThisWeek = interviewGuidanceRows.filter((r) => r.created_at >= weekAgo).length;
  const totalInterviewGuidance = interviewGuidanceRows.length;

  const statusBreakdown = APPLICATION_STATUSES.map((status) => ({
    status,
    count: applicationRows.filter((a) => a.status === status).length,
  }));

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-ink/60">
          Live snapshot of enquiries, registrations, and site content.
        </p>
      </div>

      <div>
        <SectionHeading title="Leads &amp; Enquiries" href="/admin/applications" linkLabel="View applications" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Enquiries Today" value={applicationsToday} href="/admin/applications" />
          <StatCard label="Enquiries This Week" value={applicationsThisWeek} href="/admin/applications" />
          <StatCard label="Total Enquiries" value={totalApplications} href="/admin/applications" />
          <StatCard
            label="Interview Guidance This Week"
            value={interviewGuidanceThisWeek}
            href="/admin/interview-guidance"
          />
          <StatCard
            label="Interview Guidance Total"
            value={totalInterviewGuidance}
            href="/admin/interview-guidance"
          />
          <StatCard label="Quiz Attempts This Week" value={quizThisWeek.count ?? 0} href="/admin/quiz-responses" />
        </div>

        {totalApplications > 0 ? (
          <div className="mt-4 rounded-[4px] border border-rule bg-paper-dim p-4">
            <p className="font-data text-[0.6875rem] uppercase tracking-[0.06em] text-ink/60">
              Applications by status
            </p>
            <div className="mt-2 flex h-3 w-full overflow-hidden rounded-full bg-rule">
              {statusBreakdown.map(({ status, count }) =>
                count > 0 ? (
                  <div
                    key={status}
                    className={STATUS_BAR_COLORS[status]}
                    style={{ width: `${(count / totalApplications) * 100}%` }}
                    title={`${status}: ${count}`}
                  />
                ) : null,
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {statusBreakdown.map(({ status, count }) => (
                <span key={status} className="flex items-center gap-1.5 text-sm text-ink/70">
                  <span className={cn("h-2.5 w-2.5 rounded-full", STATUS_BAR_COLORS[status])} />
                  <span className="capitalize">{status}</span>
                  <span className="font-semibold text-ink">{count}</span>
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHeading title="Recent Enquiries" href="/admin/applications" />
          <div className="mt-3 overflow-x-auto rounded-[4px] border border-rule">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
                  <th className="px-3 py-2.5">Name</th>
                  <th className="px-3 py-2.5">Course</th>
                  <th className="px-3 py-2.5">Submitted</th>
                  <th className="px-3 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplicationRows.map((app) => (
                  <tr key={app.id} className="border-b border-rule align-top last:border-0">
                    <td className="px-3 py-2.5">
                      <p className="font-medium">{app.full_name}</p>
                      <p className="text-ink/60">{app.whatsapp_number}</p>
                    </td>
                    <td className="px-3 py-2.5 text-ink/70">{app.course_selection ?? "—"}</td>
                    <td className="px-3 py-2.5 text-ink/70">{formatDate(app.submitted_at)}</td>
                    <td className="px-3 py-2.5">
                      <ApplicationStatusSelect id={app.id} status={app.status} />
                    </td>
                  </tr>
                ))}
                {recentApplicationRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-ink/70">
                      No enquiries yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="min-w-0">
          <SectionHeading title="Recent Interview Guidance Registrations" href="/admin/interview-guidance" />
          <div className="mt-3 overflow-x-auto rounded-[4px] border border-rule">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
                  <th className="px-3 py-2.5">Name</th>
                  <th className="px-3 py-2.5">Contact</th>
                  <th className="px-3 py-2.5">Preference</th>
                  <th className="px-3 py-2.5">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {recentInterviewGuidanceRows.map((reg) => (
                  <tr key={reg.id} className="border-b border-rule align-top last:border-0">
                    <td className="px-3 py-2.5 font-medium">
                      {reg.first_name} {reg.last_name}
                    </td>
                    <td className="px-3 py-2.5 text-ink/70">{reg.mobile_no}</td>
                    <td className="px-3 py-2.5 text-ink/70">{reg.interview_preference}</td>
                    <td className="px-3 py-2.5 text-ink/70">{formatDate(reg.created_at)}</td>
                  </tr>
                ))}
                {recentInterviewGuidanceRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-ink/70">
                      No registrations yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <SectionHeading title="Site Traffic" href="/admin/stats" linkLabel="View full stats" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Sessions" value={analytics.sessionCount.toLocaleString("en-IN")} href="/admin/stats" />
          <StatCard label="Pageviews" value={analytics.pageviewCount.toLocaleString("en-IN")} href="/admin/stats" />
          <StatCard
            label="Unique Pages Visited"
            value={analytics.uniquePageCount.toLocaleString("en-IN")}
            href="/admin/stats"
          />
          <StatCard
            label="Avg. Time on Site"
            value={
              analytics.avgTimeOnSiteSeconds < 60
                ? `${analytics.avgTimeOnSiteSeconds}s`
                : `${Math.floor(analytics.avgTimeOnSiteSeconds / 60)}m`
            }
            href="/admin/stats"
          />
        </div>
      </div>

      <div>
        <SectionHeading title="Content" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Published Posts" value={publishedPosts.count ?? 0} href="/admin/posts" />
          <StatCard label="Active Courses" value={activeCourses.count ?? 0} href="/admin/courses" />
          <StatCard label="Mock Tests" value={mockTests.count ?? 0} href="/admin/resources?type=mock_test" />
          <StatCard label="PYQs" value={pyqs.count ?? 0} href="/admin/resources?type=pyq" />
        </div>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "+ New Course", href: "/admin/courses/new" },
            { label: "+ New Blog Post", href: "/admin/posts/new" },
            { label: "+ New Resource", href: "/admin/resources/new" },
            { label: "+ New Test Series", href: "/admin/test-series/new" },
            { label: "+ New Batch", href: "/admin/batches/new" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="rounded-[4px] border border-rule bg-paper px-4 py-2.5 text-sm font-semibold hover:border-ink"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
