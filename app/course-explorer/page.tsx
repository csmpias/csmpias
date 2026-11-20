import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { CourseExplorerDiagram } from "@/components/courses/course-explorer-diagram";
import { getActiveCourses } from "@/lib/queries";
import { groupCoursesForExplorer } from "@/lib/course-explorer";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

export const metadata: Metadata = {
  title: "Course Explorer",
  description:
    "Every UPSC, UPPCS, State PCS, and test series course offered by CSMP IAS, mapped out in one diagram — tap any course to open it.",
  alternates: { canonical: "/course-explorer" },
};

export default async function CourseExplorerPage() {
  const courses = await getActiveCourses();
  const branches = groupCoursesForExplorer(courses);

  return (
    <>
      <PageHeader
        eyebrow="All Programs"
        title="Course Explorer"
        description="Every course we offer, mapped out in one place — tap any box to open it. Updates automatically as courses change."
      />
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-14 sm:px-6 lg:px-8">
        <CourseExplorerDiagram branches={branches} />
      </div>
    </>
  );
}
