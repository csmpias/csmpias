import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getAnalyticsSummary, getRecentVisitors, getTopPages, getVisitorMapPoints } from "@/lib/queries";
import { getSeoScore } from "@/lib/seo-score";
import { VisitorMapLoader } from "@/components/admin/visitor-map-loader";
import { SeoScoreBadge } from "@/components/admin/seo-score-badge";
import type { Post } from "@/lib/types";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`;
}

function timeAgo(iso: string): string {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default async function AdminStatsPage() {
  const supabase = await createClient();
  const [summary, recentVisitors, topPages, mapPoints, { data: postsData }] = await Promise.all([
    getAnalyticsSummary(),
    getRecentVisitors(20),
    getTopPages(10),
    getVisitorMapPoints(),
    supabase.from("posts").select("id, title, excerpt, content, cover_image_url, import_batch"),
  ]);

  const posts = (postsData ?? []) as Pick<Post, "id" | "title" | "excerpt" | "content" | "cover_image_url" | "import_batch">[];
  const seoResults = posts.map((post) => ({
    post,
    result: getSeoScore({
      title: post.title,
      excerpt: post.excerpt ?? "",
      content: post.content,
      coverImageUrl: post.cover_image_url,
      isLegacy: Boolean(post.import_batch),
    }),
  }));
  const seoCounts = { green: 0, amber: 0, red: 0 };
  for (const { result } of seoResults) seoCounts[result.band]++;
  const needsWork = seoResults
    .filter(({ result }) => !result.isLegacy && result.band !== "green")
    .sort((a, b) => a.result.score - b.result.score)
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Stats</h1>
        <p className="mt-1 text-sm text-ink/60">
          Self-hosted site analytics — no third-party script. Geolocation comes from hosting-platform edge headers
          (empty in local development).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Sessions", value: summary.sessionCount.toLocaleString("en-IN") },
          { label: "Pageviews", value: summary.pageviewCount.toLocaleString("en-IN") },
          { label: "Avg. time on site", value: formatDuration(summary.avgTimeOnSiteSeconds) },
          { label: "Unique pages visited", value: summary.uniquePageCount.toLocaleString("en-IN") },
        ].map((card) => (
          <div key={card.label} className="rounded-[4px] border border-rule bg-paper-dim p-4">
            <p className="font-data text-[0.6875rem] uppercase tracking-[0.06em] text-ink/60">{card.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold">Visitor map</h2>
        <p className="mt-1 text-sm text-ink/60">
          Recent geolocated sessions, plotted by latitude/longitude ({mapPoints.length} shown).
        </p>
        <div className="mt-3">
          <VisitorMapLoader points={mapPoints} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold">Recent visitors</h2>
          <div className="mt-3 overflow-x-auto rounded-[4px] border border-rule">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
                  <th className="px-3 py-2.5">Location</th>
                  <th className="px-3 py-2.5">Last page</th>
                  <th className="px-3 py-2.5">Time on site</th>
                  <th className="px-3 py-2.5">Last active</th>
                </tr>
              </thead>
              <tbody>
                {recentVisitors.map((v) => (
                  <tr key={v.sessionId} className="border-b border-rule last:border-0">
                    <td className="px-3 py-2.5">{v.location}</td>
                    <td className="max-w-40 truncate px-3 py-2.5 text-ink/70">{v.lastPage ?? "—"}</td>
                    <td className="px-3 py-2.5 text-ink/70">{formatDuration(v.timeOnSiteSeconds)}</td>
                    <td className="px-3 py-2.5 text-ink/70">{timeAgo(v.lastActive)}</td>
                  </tr>
                ))}
                {recentVisitors.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-3 py-8 text-center text-ink/70">
                      No visits recorded yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold">Top pages</h2>
          <div className="mt-3 overflow-x-auto rounded-[4px] border border-rule">
            <table className="w-full min-w-[360px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
                  <th className="px-3 py-2.5">Path</th>
                  <th className="px-3 py-2.5">Views</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p) => (
                  <tr key={p.path} className="border-b border-rule last:border-0">
                    <td className="max-w-56 truncate px-3 py-2.5 font-data text-ink/80">{p.path}</td>
                    <td className="px-3 py-2.5 font-semibold">{p.views.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
                {topPages.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-3 py-8 text-center text-ink/70">
                      No pageviews recorded yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">SEO checklist summary</h2>
          <Link href="/admin/posts" className="text-sm font-medium text-accent hover:underline">
            View all posts
          </Link>
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[4px] border border-rule bg-[var(--color-seo-good-tint)] p-4">
            <p className="font-data text-[0.6875rem] uppercase tracking-[0.06em] text-[var(--color-seo-good)]">Good</p>
            <p className="mt-1 font-display text-2xl font-bold text-[var(--color-seo-good)]">{seoCounts.green}</p>
          </div>
          <div className="rounded-[4px] border border-rule bg-[var(--color-seo-warn-tint)] p-4">
            <p className="font-data text-[0.6875rem] uppercase tracking-[0.06em] text-[var(--color-seo-warn)]">
              Needs Work
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-[var(--color-seo-warn)]">{seoCounts.amber}</p>
          </div>
          <div className="rounded-[4px] border border-rule bg-[var(--color-seo-poor-tint)] p-4">
            <p className="font-data text-[0.6875rem] uppercase tracking-[0.06em] text-[var(--color-seo-poor)]">Poor</p>
            <p className="mt-1 font-display text-2xl font-bold text-[var(--color-seo-poor)]">{seoCounts.red}</p>
          </div>
        </div>

        {needsWork.length > 0 ? (
          <div className="mt-4">
            <p className="text-sm font-medium text-ink/70">Lowest-scoring posts (excluding imported content)</p>
            <ul className="mt-2 flex flex-col gap-2">
              {needsWork.map(({ post, result }) => (
                <li key={post.id} className="flex items-center justify-between gap-3 rounded-[4px] border border-rule px-3 py-2 text-sm">
                  <Link href={`/admin/posts/${post.id}/edit`} className="truncate font-medium text-ink hover:text-accent">
                    {post.title}
                  </Link>
                  <SeoScoreBadge score={result.score} band={result.band} isLegacy={result.isLegacy} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
