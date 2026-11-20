import Link from "next/link";
import { courseHref } from "@/lib/course-routes";
import type { ExplorerBranch } from "@/lib/course-explorer";

export function CourseExplorerDiagram({ branches }: { branches: ExplorerBranch[] }) {
  return (
    <div className="flex min-w-[20rem] flex-col items-center">
      <div className="rounded-[10px] border-2 border-brand bg-brand px-6 py-3 text-center font-display text-base font-bold text-white shadow-sm sm:text-lg">
        CSMP IAS Courses
      </div>

      {branches.map((branch) => (
        <div key={branch.title} className="flex w-full flex-col items-center">
          <div className="h-8 w-0.5 shrink-0 bg-heading/20" aria-hidden />
          <div className="rounded-[10px] border border-heading/15 bg-cream px-5 py-2.5 text-center font-display text-sm font-bold uppercase tracking-[0.04em] text-heading sm:text-base">
            {branch.title}
          </div>
          <div className="h-8 w-0.5 shrink-0 bg-heading/20" aria-hidden />
          <div className="mb-4 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {branch.courses.map((course) => (
              <Link
                key={course.id}
                href={courseHref(course.slug)}
                className="group flex items-center justify-center rounded-[10px] border border-heading/10 bg-white px-4 py-3.5 text-center shadow-[0_2px_10px_rgba(34,22,56,0.06)] transition hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_8px_20px_rgba(254,74,85,0.12)]"
              >
                <p className="font-display text-sm font-bold leading-snug text-heading group-hover:text-brand">
                  {course.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
