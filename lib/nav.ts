import { primaryNav, type NavGroup } from "@/lib/site-config";
import { courseHref } from "@/lib/course-routes";
import type { Course, NavLinkRow } from "@/lib/types";

type NavCourse = Pick<Course, "id" | "slug" | "name" | "exam_type" | "display_order">;

// Which nav group a course's exam_type feeds into. UPSC and UPPCS dropdowns
// are built ENTIRELY from the courses table (their static `children` in
// site-config.ts are empty on purpose). State PCS keeps its static
// state-hub links and has actual courses appended after them.
const COURSE_GROUP_BY_EXAM_TYPE: Record<string, string> = {
  UPSC: "UPSC",
  UPPCS: "UPPCS",
  "PCS-J": "PCS-J & APO",
  BPSC: "State PCS",
  UKPSC: "State PCS",
  MPPSC: "State PCS",
};

const FULLY_COURSE_DRIVEN_GROUPS = new Set(["UPSC", "UPPCS", "PCS-J & APO"]);

/**
 * Merges the static nav structure with live data: every active course
 * lands in its exam type's dropdown automatically, and any nav links added
 * through /admin/navigation are appended to their chosen group. Called once
 * server-side (see app/layout.tsx) so the result is a plain array the
 * header/mobile nav can render without knowing about any of this.
 */
export function buildNav(courses: NavCourse[], navLinks: NavLinkRow[]): NavGroup[] {
  const coursesByGroup = new Map<string, NavGroup[]>();
  for (const course of [...courses].sort((a, b) => a.display_order - b.display_order)) {
    // A course with no exam_type (a generic, multi-exam program) is expected
    // to already have a hand-placed static link elsewhere in primaryNav, so
    // it's skipped here. But an exam_type that IS set and just doesn't match
    // a known key (a typo, or a new exam type nobody's wired up yet) must
    // never silently vanish from the nav the way it did before — it falls
    // back to "More Programs" instead, so at worst it's in the wrong menu,
    // never in no menu.
    const group = course.exam_type ? (COURSE_GROUP_BY_EXAM_TYPE[course.exam_type] ?? "More Programs") : undefined;
    if (!group) continue;
    const list = coursesByGroup.get(group) ?? [];
    list.push({ label: course.name, href: courseHref(course.slug) });
    coursesByGroup.set(group, list);
  }

  return primaryNav.map((group) => {
    if (!group.children) return group;

    let children = group.children;
    if (FULLY_COURSE_DRIVEN_GROUPS.has(group.label)) {
      children = coursesByGroup.get(group.label) ?? [];
    } else if (coursesByGroup.has(group.label)) {
      children = [...children, ...coursesByGroup.get(group.label)!];
    }

    const extraLinks = navLinks
      .filter((link) => link.group_label === group.label)
      .map((link) => ({ label: link.label, href: link.href }));

    return extraLinks.length > 0 ? { ...group, children: [...children, ...extraLinks] } : { ...group, children };
  });
}

/** The top-level groups that actually have a dropdown to add a link into — used to populate the admin form's group selector. */
export const navGroupOptions = primaryNav.filter((g) => g.children).map((g) => g.label);
