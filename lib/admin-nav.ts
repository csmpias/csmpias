export type AdminNavLink = { label: string; href: string };

export type AdminNavEntry =
  | { kind: "link"; label: string; href: string }
  | { kind: "group"; label: string; links: AdminNavLink[] };

// Shared between the desktop sidebar and the dedicated mobile hamburger nav
// so the two never drift out of sync.
export const adminNav: AdminNavEntry[] = [
  { kind: "link", label: "Overview", href: "/admin" },
  { kind: "link", label: "Stats", href: "/admin/stats" },
  {
    kind: "group",
    label: "Courses & Batches",
    links: [
      { label: "Courses", href: "/admin/courses" },
      { label: "Batches", href: "/admin/batches" },
    ],
  },
  { kind: "link", label: "Blog Posts", href: "/admin/posts" },
  {
    kind: "group",
    label: "Study Material",
    links: [
      { label: "Mock Tests", href: "/admin/resources?type=mock_test" },
      { label: "PYQs", href: "/admin/resources?type=pyq" },
      { label: "Daily Sheets", href: "/admin/resources?type=daily_sheet" },
      { label: "Syllabus", href: "/admin/resources?type=syllabus" },
      { label: "Study Materials", href: "/admin/resources?type=study_material" },
      { label: "Essay", href: "/admin/resources?type=essay" },
    ],
  },
  { kind: "link", label: "Test Series / Mock Tests", href: "/admin/test-series" },
  {
    kind: "group",
    label: "Site Content",
    links: [
      { label: "FAQs", href: "/admin/faqs" },
      { label: "Fee Table", href: "/admin/fee-items" },
      { label: "Testimonials", href: "/admin/testimonials" },
      { label: "Navigation", href: "/admin/navigation" },
    ],
  },
  {
    kind: "group",
    label: "Leads & Submissions",
    links: [
      { label: "Applications", href: "/admin/applications" },
      { label: "Interview Guidance", href: "/admin/interview-guidance" },
      { label: "Quiz Responses", href: "/admin/quiz-responses" },
    ],
  },
];
