"use client";

import { useActionState } from "react";
import type { FaqFormState } from "@/lib/actions/admin/faqs";
import type { Faq } from "@/lib/types";

const initialState: FaqFormState = {};

export function FaqForm({
  faq,
  action,
}: {
  faq?: Faq;
  action: (state: FaqFormState, formData: FormData) => Promise<FaqFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Question
        <input name="question" defaultValue={faq?.question} required className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Answer
        <textarea name="answer" defaultValue={faq?.answer} required rows={6} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Category{" "}
          <span className="font-normal text-ink/70">
            (e.g. general, course-details, fees-scholarships, preparation-tips, mentorship-support)
          </span>
          <input name="category" defaultValue={faq?.category ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Display Order
          <input
            type="number"
            name="display_order"
            defaultValue={faq?.display_order ?? 0}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>
      </div>

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
        {pending ? "Saving..." : faq ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
