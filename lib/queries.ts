import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import type { Batch, Course, Faq, FeeInstallment, FeeItem, NavLinkRow, Post, Resource, ResourceType, Testimonial } from "@/lib/types";

export async function getPublishedPosts(options: { category?: string; page?: number; pageSize?: number } = {}) {
  const { category, page = 1, pageSize = 12 } = options;
  const supabase = createPublicClient();
  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, count } = await query.range(from, to);

  return { posts: (data ?? []) as Post[], count: count ?? 0 };
}

export async function getPostBySlug(slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data as Post | null;
}

export async function getRelatedPosts(category: string | null, excludeSlug: string, limit = 3) {
  const supabase = createPublicClient();
  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return (data ?? []) as Post[];
}

export async function getPublishedResources(type: ResourceType, options: { examType?: string; subject?: string; year?: number } = {}) {
  const supabase = createPublicClient();
  let query = supabase
    .from("resources")
    .select("*")
    .eq("type", type)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (options.examType) query = query.eq("exam_type", options.examType);
  if (options.subject) query = query.eq("subject", options.subject);
  if (options.year) query = query.eq("year", options.year);

  const { data } = await query;
  return (data ?? []) as Resource[];
}

export async function getResourceBySlug(type: ResourceType, slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("resources")
    .select("*")
    .eq("type", type)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data as Resource | null;
}

/** Cookie-free variant for the root layout's footer — see lib/supabase/public.ts. */
/** Feeds both the footer's "All Courses" list and the UPSC/UPPCS/State PCS nav dropdowns — see lib/nav.ts. */
export async function getNavCourses() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("courses")
    .select("id, slug, name, exam_type, display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  return (data ?? []) as Pick<Course, "id" | "slug" | "name" | "exam_type" | "display_order">[];
}

export async function getActiveNavLinks() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("nav_links")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  return (data ?? []) as NavLinkRow[];
}

export async function getActiveCourses(category?: string) {
  const supabase = createPublicClient();
  let query = supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return (data ?? []) as Course[];
}

export async function getCourseBySlug(slug: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return data as Course | null;
}

export async function getFaqs(category?: string) {
  const supabase = createPublicClient();
  let query = supabase.from("faqs").select("*").order("display_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return (data ?? []) as Faq[];
}

export async function getFeeItems(track: "UPPCS" | "IAS") {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("fee_items")
    .select("*")
    .eq("track", track)
    .order("display_order", { ascending: true });
  return (data ?? []) as FeeItem[];
}

export async function getFeeInstallments(track: "UPPCS" | "IAS") {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("fee_installments")
    .select("*")
    .eq("track", track)
    .order("display_order", { ascending: true });
  return (data ?? []) as FeeInstallment[];
}

export async function getUpcomingBatches(courseId: string) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("batches")
    .select("*")
    .eq("course_id", courseId)
    .order("start_date", { ascending: true });
  return (data ?? []) as Batch[];
}

export async function getActiveTestimonials(limit = 6) {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(limit);
  return (data ?? []) as Testimonial[];
}

/** post_view_counts.view_count is bigint, which the REST API serializes as
 * a string, not a number — always coerce explicitly. */
export async function getPostViewCount(postId: string): Promise<number> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("post_view_counts").select("view_count").eq("post_id", postId).maybeSingle();
  return Number(data?.view_count ?? 0);
}

// --- Self-hosted analytics (admin Stats dashboard) ---------------------
// Deliberately basic: this coaching-institute site's traffic is nowhere
// near a scale where full server-side GROUP BY aggregation is needed, so
// recent rows are fetched with a generous cap and reduced in JS rather
// than adding database views/RPCs just for counting.

const ANALYTICS_LOOKBACK_ROWS = 5000;

export async function getAnalyticsSummary() {
  const supabase = await createClient();
  const [{ data: sessions }, { count: pageviewCount }, { data: pageviewPaths }] = await Promise.all([
    supabase.from("analytics_sessions").select("first_seen, last_seen").limit(ANALYTICS_LOOKBACK_ROWS),
    supabase.from("analytics_pageviews").select("*", { count: "exact", head: true }),
    supabase.from("analytics_pageviews").select("path").limit(ANALYTICS_LOOKBACK_ROWS),
  ]);

  const sessionRows = sessions ?? [];
  const durations = sessionRows.map((s) => (new Date(s.last_seen).getTime() - new Date(s.first_seen).getTime()) / 1000);
  const avgTimeOnSiteSeconds = durations.length
    ? Math.round(durations.reduce((sum, d) => sum + Math.max(d, 0), 0) / durations.length)
    : 0;

  const uniquePageCount = new Set((pageviewPaths ?? []).map((p) => p.path)).size;

  return {
    sessionCount: sessionRows.length,
    pageviewCount: pageviewCount ?? 0,
    avgTimeOnSiteSeconds,
    uniquePageCount,
  };
}

export type RecentVisitor = {
  sessionId: string;
  location: string;
  lastPage: string | null;
  timeOnSiteSeconds: number;
  lastActive: string;
};

export async function getRecentVisitors(limit = 20): Promise<RecentVisitor[]> {
  const supabase = await createClient();
  const { data: sessions } = await supabase
    .from("analytics_sessions")
    .select("*")
    .order("last_seen", { ascending: false })
    .limit(limit);
  if (!sessions || sessions.length === 0) return [];

  const ids = sessions.map((s) => s.id);
  const { data: pageviews } = await supabase
    .from("analytics_pageviews")
    .select("session_id, path, occurred_at")
    .in("session_id", ids)
    .order("occurred_at", { ascending: false });

  const lastPageBySession = new Map<string, string>();
  for (const pv of pageviews ?? []) {
    if (!lastPageBySession.has(pv.session_id)) lastPageBySession.set(pv.session_id, pv.path);
  }

  return sessions.map((s) => ({
    sessionId: s.id,
    location: [s.city, s.region, s.country].filter(Boolean).join(", ") || "Unknown",
    lastPage: lastPageBySession.get(s.id) ?? s.entry_path,
    timeOnSiteSeconds: Math.max(0, Math.round((new Date(s.last_seen).getTime() - new Date(s.first_seen).getTime()) / 1000)),
    lastActive: s.last_seen,
  }));
}

export type TopPage = { path: string; views: number };

export async function getTopPages(limit = 10): Promise<TopPage[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("analytics_pageviews").select("path").limit(ANALYTICS_LOOKBACK_ROWS);

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.path, (counts.get(row.path) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export type VisitorPoint = { latitude: number; longitude: number; location: string };

export async function getVisitorMapPoints(limit = 300): Promise<VisitorPoint[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("analytics_sessions")
    .select("latitude, longitude, city, region, country")
    .not("latitude", "is", null)
    .not("longitude", "is", null)
    .order("last_seen", { ascending: false })
    .limit(limit);

  return (data ?? []).map((s) => ({
    latitude: s.latitude as number,
    longitude: s.longitude as number,
    location: [s.city, s.region, s.country].filter(Boolean).join(", ") || "Unknown",
  }));
}
