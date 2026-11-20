import type { Course } from "@/lib/types";

const EXAM_TYPE_BRANCH: Record<string, string> = {
  UPSC: "UPSC",
  UPPCS: "UPPCS",
  "PCS-J": "PCS-J & APO",
  BPSC: "State PCS (BPSC / UKPSC / MPPSC)",
  UKPSC: "State PCS (BPSC / UKPSC / MPPSC)",
  MPPSC: "State PCS (BPSC / UKPSC / MPPSC)",
};

const BRANCH_ORDER = [
  "UPSC",
  "UPPCS",
  "PCS-J & APO",
  "State PCS (BPSC / UKPSC / MPPSC)",
  "Test Series",
  "More Programs",
];

export type ExplorerBranch = { title: string; courses: Course[] };

/**
 * Groups every active course into the Course Explorer's top-down branches.
 * Runs fresh on every request (see app/course-explorer/page.tsx) against
 * the live courses table, so a new or updated course appears automatically
 * — nothing here needs touching when a course changes.
 */
export function groupCoursesForExplorer(courses: Course[]): ExplorerBranch[] {
  const byBranch = new Map<string, Course[]>();

  for (const course of courses) {
    const branch =
      course.category === "test-series"
        ? "Test Series"
        : (course.exam_type && EXAM_TYPE_BRANCH[course.exam_type]) || "More Programs";
    const list = byBranch.get(branch) ?? [];
    list.push(course);
    byBranch.set(branch, list);
  }

  return BRANCH_ORDER.filter((branch) => byBranch.has(branch)).map((branch) => ({
    title: branch,
    courses: byBranch.get(branch)!,
  }));
}
