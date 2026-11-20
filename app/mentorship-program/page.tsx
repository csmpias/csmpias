import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { createPublicClient } from "@/lib/supabase/public";
import { courseHref } from "@/lib/course-routes";
import type { Course } from "@/lib/types";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

export const metadata: Metadata = {
  title: "Mentorship Programs",
  description: "One-to-one mentorship programs for UPSC, UPPCS and BPSC aspirants at CSMP IAS.",
  alternates: { canonical: "/mentorship-program" },
};

export default async function MentorshipProgramPage() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .eq("category", "mentorship")
    .order("display_order", { ascending: true });
  const courses = (data ?? []) as Course[];

  return (
    <>
      <PageHeader
        eyebrow="Mentorship"
        title="Mentorship Programs"
        description="Personal, one-to-one mentorship under S.B. Shukla Sir and our team of subject experts — for Integrated, Prelims and Mains preparation across UPSC, UPPCS and BPSC."
      />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <EmptyState description="Mentorship batch details are being finalised. Contact us for current availability." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {courses.map((course) => (
              <Reveal key={course.id}>
                <Link href={courseHref(course.slug)} className="block h-full">
                  <Card variant="brand" className="h-full">
                    <CardBody className="p-6">
                      {course.exam_type ? (
                        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">
                          {course.exam_type}
                        </p>
                      ) : null}
                      <h3 className="mt-1.5 font-display text-[1.125rem] font-bold text-heading">{course.name}</h3>
                      {course.description ? <p className="mt-2 text-sm leading-relaxed text-muted">{course.description}</p> : null}
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand">
                        View details
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </CardBody>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
        <Reveal className="mt-8 text-sm text-muted">
          Looking for a specific exam&rsquo;s mentorship track (UPSC, UPPCS, UKPSC, MPPSC)? {" "}
          <Link href="/contact-us" className="font-bold text-brand hover:text-brand-dark">
            Contact us
          </Link>{" "}
          and our counselling team will guide you to the right program.
        </Reveal>
      </div>
    </>
  );
}
