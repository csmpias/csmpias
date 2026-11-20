"use client";

import { useActionState } from "react";
import type { TestimonialFormState } from "@/lib/actions/admin/testimonials";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import type { Testimonial } from "@/lib/types";

const initialState: TestimonialFormState = {};

export function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (state: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Student Name
        <input
          name="student_name"
          defaultValue={testimonial?.student_name}
          required
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Exam Cleared
          <input
            name="exam_cleared"
            defaultValue={testimonial?.exam_cleared ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Rank
          <input name="rank" defaultValue={testimonial?.rank ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Quote
        <textarea name="quote" defaultValue={testimonial?.quote} required rows={5} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Display Order
          <input
            type="number"
            name="display_order"
            defaultValue={testimonial?.display_order ?? 0}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="is_active" defaultChecked={testimonial?.is_active ?? true} className="h-4 w-4" />
          Active
        </label>
      </div>

      <CloudinaryUpload
        folder="csmp-ias/site"
        label="Photo"
        fileFieldName="photo_url"
        publicIdFieldName="photo_public_id"
        initialUrl={testimonial?.photo_url}
        initialPublicId={testimonial?.photo_public_id}
      />

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
        {pending ? "Saving..." : testimonial ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
