import { CourseForm } from "@/components/admin/course-form";
import { createCourse } from "@/lib/actions/admin/courses";

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Course</h1>
      <div className="mt-6">
        <CourseForm action={createCourse} />
      </div>
    </div>
  );
}
