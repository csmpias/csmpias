"use client";

import { useActionState } from "react";
import type { BatchFormState } from "@/lib/actions/admin/batches";
import type { Batch, Course } from "@/lib/types";

const initialState: BatchFormState = {};

export function BatchForm({
  batch,
  courses,
  action,
}: {
  batch?: Batch;
  courses: Pick<Course, "id" | "name">[];
  action: (state: BatchFormState, formData: FormData) => Promise<BatchFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Name
        <input name="name" defaultValue={batch?.name} required className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Course
        <select
          name="course_id"
          defaultValue={batch?.course_id ?? ""}
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        >
          <option value="">None</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Start Date
          <input
            type="date"
            name="start_date"
            defaultValue={batch?.start_date ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Status
          <select name="status" defaultValue={batch?.status ?? "upcoming"} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink">
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Center
        <input name="center" defaultValue={batch?.center ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      {state.error ? (
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-[4px] bg-accent px-5 py-2.5 font-semibold text-paper hover:bg-ink disabled:opacity-60"
      >
        {pending ? "Saving..." : batch ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
