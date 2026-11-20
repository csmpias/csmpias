// Single source of truth for post categories — used by both the admin
// editor's dropdown and the public category filter pills. Previously these
// were two separate hardcoded lists that drifted apart: the admin dropdown
// grew several new categories (General Studies, CSAT, etc.) that never got
// added to the public filter, so posts tagged with them had no visible way
// to browse to them.
export const blogCategories = [
  { slug: "general-studies", label: "General Studies (Prelims/Mains)" },
  { slug: "csat", label: "CSAT" },
  { slug: "ethics-essay", label: "Ethics & Essay" },
  { slug: "current-affairs", label: "Current Affairs" },
  { slug: "optional-subjects", label: "Optional Subjects" },
  { slug: "interview-personality-test", label: "Interview / Personality Test" },
  { slug: "motivation-strategy", label: "Motivation & Strategy" },
  { slug: "daily-updates", label: "Daily Updates" },
  { slug: "compilations", label: "Compilations" },
  { slug: "state-specific", label: "State Specific" },
  { slug: "editorial", label: "Editorial" },
] as const;

export const blogCategoryLabels: Record<string, string> = Object.fromEntries(
  blogCategories.map((c) => [c.slug, c.label]),
);
