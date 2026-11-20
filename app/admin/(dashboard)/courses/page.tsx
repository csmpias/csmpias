import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCourse } from "@/lib/actions/admin/courses";
import { formatDate } from "@/lib/utils";
import type { Course } from "@/lib/types";

export default async function AdminCoursesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("courses").select("*").order("updated_at", { ascending: false });
  const courses = (data ?? []) as Course[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Courses</h1>
        <Link href="/admin/courses/new" className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
          New Course
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{course.name}</td>
                <td className="px-4 py-3">{course.category ?? "—"}</td>
                <td className="px-4 py-3">{course.is_active ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-ink/70">{formatDate(course.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/courses/${course.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteCourse.bind(null, course.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {courses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No courses yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
