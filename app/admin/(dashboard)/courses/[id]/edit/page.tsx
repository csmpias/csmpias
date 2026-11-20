import { notFound } from "next/navigation";
import { CourseForm } from "@/components/admin/course-form";
import { updateCourse } from "@/lib/actions/admin/courses";
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("courses").select("*").eq("id", id).maybeSingle();
  const course = data as Course | null;
  if (!course) notFound();

  const action = updateCourse.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Course</h1>
      <div className="mt-6">
        <CourseForm course={course} action={action} />
      </div>
    </div>
  );
}
