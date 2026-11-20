/**
 * Maps the new nested /courses/[...path] URLs (per the site's information
 * architecture) to the flat `slug` column on the `courses` table. Keeps the
 * DB schema simple (one flat slug per course) while presenting a clean,
 * discoverable nested path in the UI.
 */
export const courseRouteMap: Record<string, string> = {
  "upsc/foundation": "upsc-foundation",
  "upsc/advanced-foundation": "upsc-advance-foundation",
  "upsc/2-year-foundation": "upsc-2-year-foundation",
  "upsc/ba-to-bureaucracy": "ba-to-bureaucracy",
  "upsc/prelims": "upsc-prelims",
  "upsc/mains": "upsc-mains",
  "uppcs/foundation": "uppcs-foundation",
  "uppcs/advance-foundation": "uppcs-advance-foundation",
  "uppcs/mains-enrichment-program-2026": "uppcs-mains-enrichment-program-2026",
  "uppcs/prelims": "uppcs-prelims",
  "uppcs/mains": "uppcs-mains",
  "uppcs/csat": "uppcs-csat-batch",
  "uppcs/prelims-mentorship-2026": "uppcs-prelims-mentorship-2026",
};

/** Flat top-level routes that exist outside /courses/[...path] (see next.config.ts / app dir). */
export const flatCourseSlugRoutes: Record<string, string> = {
  "assured-prelims-programme-uppcs-2026": "/assured-prelims-programme-uppcs-2026",
  "online-batches": "/online-batches",
  "optional-subjects": "/optional-subjects",
  "interview-guidance-program": "/interview-guidance-program",
  "72nd-bpsc-test-series-2026": "/72nd-bpsc-test-series-2026",
  "72th-bpsc-integrated-mentorship-2026": "/72th-bpsc-integrated-mentorship-2026",
  "uppcs-test-series-2026": "/uppcs-test-series-2026",
  "uppcs-crash-course-2026": "/uppcs-crash-course-2026",
  "uppcs-working-professionals": "/uppcs-working-professionals",
};

export function pathToCourseSlug(segments: string[]): string | null {
  const mapped = courseRouteMap[segments.join("/")];
  if (mapped) return mapped;
  // No curated nested alias for this course (e.g. one just created in the
  // admin without a courseRouteMap entry) — fall back to treating a single
  // path segment as the DB slug directly, so /courses/<slug> always works.
  if (segments.length === 1) return segments[0];
  return null;
}

/** Resolves a course row's DB `slug` back to whatever URL actually serves it. */
export function courseHref(slug: string): string {
  if (flatCourseSlugRoutes[slug]) return flatCourseSlugRoutes[slug];
  const nestedPath = Object.entries(courseRouteMap).find(([, s]) => s === slug)?.[0];
  return nestedPath ? `/courses/${nestedPath}` : `/courses/${slug}`;
}
