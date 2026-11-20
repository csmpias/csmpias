"use client";

import { useActionState } from "react";
import type { TestSeriesFormState } from "@/lib/actions/admin/test-series";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import type { TestSeries } from "@/lib/types";

const initialState: TestSeriesFormState = {};

export function TestSeriesForm({
  testSeries,
  action,
}: {
  testSeries?: TestSeries;
  action: (state: TestSeriesFormState, formData: FormData) => Promise<TestSeriesFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Name
        <input name="name" defaultValue={testSeries?.name} required className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Exam Type
          <input name="exam_type" defaultValue={testSeries?.exam_type ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Start Date
          <input
            type="date"
            name="start_date"
            defaultValue={testSeries?.start_date ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Subject
        <input name="subject" defaultValue={testSeries?.subject ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Description
        <textarea name="description" defaultValue={testSeries?.description ?? ""} rows={4} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      <CloudinaryUpload
        folder="csmp-ias/test-series"
        label="Test Paper / Answer Key (PDF)"
        fileFieldName="file_url"
        publicIdFieldName="file_public_id"
        initialUrl={testSeries?.file_url}
        initialPublicId={testSeries?.file_public_id}
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
        {pending ? "Saving..." : testSeries ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
