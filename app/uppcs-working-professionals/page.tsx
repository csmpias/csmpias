import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/courses/course-detail";
import { getCourseBySlug } from "@/lib/queries";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

export async function generateMetadata(): Promise<Metadata> {
  const course = await getCourseBySlug("uppcs-working-professionals");
  if (!course) return {};
  return {
    title: course.name,
    description: course.description ?? undefined,
    keywords: course.seo_keywords ?? undefined,
    alternates: { canonical: "/uppcs-working-professionals" },
  };
}

export default async function Page() {
  const course = await getCourseBySlug("uppcs-working-professionals");
  if (!course) notFound();
  return <CourseDetail course={course} />;
}
