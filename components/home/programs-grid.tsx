import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody } from "@/components/ui/card";
import { getActiveCourses } from "@/lib/queries";
import { courseHref } from "@/lib/course-routes";

export async function ProgramsGrid() {
  const courses = await getActiveCourses();

  if (courses.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="section-title">
          <span className="eyebrow">Our Programs</span>
          <h2>A Program Designed for Every Stage of Your Preparation</h2>
        </Reveal>

        <Reveal as="div" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 9).map((course) => (
            <Link key={course.id} href={courseHref(course.slug)} className="group block">
              <Card variant="brand" className="h-full">
                <CardBody className="flex h-full flex-col p-6">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">
                    {course.exam_type ?? "Program"}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.0625rem] font-bold text-heading transition-colors group-hover:text-brand sm:text-[1.1875rem]">
                    {course.name}
                  </h3>
                  {course.description ? (
                    <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted">{course.description}</p>
                  ) : null}
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-heading/10 pt-4 text-[0.6875rem] uppercase tracking-[0.04em] text-muted">
                    {course.duration ? (
                      <div>
                        <dt className="font-semibold">Duration</dt>
                        <dd className="mt-0.5 text-heading">{course.duration}</dd>
                      </div>
                    ) : null}
                    {course.mode ? (
                      <div>
                        <dt className="font-semibold">Mode</dt>
                        <dd className="mt-0.5 text-heading">{course.mode}</dd>
                      </div>
                    ) : null}
                  </dl>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
