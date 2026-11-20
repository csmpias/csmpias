import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import { courseHref } from "@/lib/course-routes";
import type { Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={courseHref(course.slug)} className="block h-full">
      <Card variant="brand" className="flex h-full flex-col">
        <CardBody className="flex flex-1 flex-col p-6">
          {course.exam_type ? (
            <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-2.5 py-1 font-body text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-teal">
              {course.exam_type}
            </span>
          ) : null}

          <h3 className="mt-2 font-display text-[1.0625rem] font-bold leading-snug text-heading">{course.name}</h3>

          {course.description ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{course.description}</p>
          ) : null}

          {course.duration || course.mode ? (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              {course.duration ? (
                <span>
                  <span className="font-semibold text-heading/70">Duration: </span>
                  {course.duration}
                </span>
              ) : null}
              {course.mode ? (
                <span>
                  <span className="font-semibold text-heading/70">Mode: </span>
                  {course.mode}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="mt-auto pt-4">
            {/* Bold and fully visible, never truncated — this is the fee, not decoration. */}
            {course.fee ? <p className="text-sm font-bold leading-snug text-heading">{course.fee}</p> : null}
            <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand">
              View details
              <span aria-hidden="true">&rarr;</span>
            </span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
