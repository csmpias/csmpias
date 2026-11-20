import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardBody } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { createPublicClient } from "@/lib/supabase/public";
import { courseHref } from "@/lib/course-routes";
import type { Course } from "@/lib/types";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

const stateLabels: Record<string, string> = {
  bpsc: "BPSC",
  ukpsc: "UKPSC",
  mppsc: "MPPSC",
};

export function generateStaticParams() {
  return Object.keys(stateLabels).map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const label = stateLabels[state];
  if (!label) return {};
  return {
    title: `${label} Coaching`,
    description: `${label} coaching programs at CSMP IAS, Lucknow.`,
    alternates: { canonical: `/courses/state-pcs/${state}` },
  };
}

export default async function StatePcsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const examType = stateLabels[state];
  if (!examType) notFound();

  const supabase = createPublicClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .ilike("exam_type", `%${examType}%`)
    .order("display_order", { ascending: true });
  const courses = (data ?? []) as Course[];

  return (
    <>
      <PageHeader eyebrow="State PCS" title={`${examType} Coaching at CSMP IAS`} />
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <EmptyState
            title={`${examType} programs coming soon`}
            description="Our team is finalising the batch schedule for this exam. Contact us for current availability and admission timelines."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {courses.map((course) => (
              <Reveal key={course.id}>
                <Link href={courseHref(course.slug)} className="block h-full">
                  <Card variant="brand" className="h-full">
                    <CardBody className="p-6">
                      <h3 className="font-display text-[1.125rem] font-bold text-heading">{course.name}</h3>
                      {course.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted">{course.description}</p>
                      ) : null}
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
      </div>
    </>
  );
}
