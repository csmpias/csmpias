"use client";

import { useActionState } from "react";
import type { FeeItemFormState } from "@/lib/actions/admin/fee-items";
import type { FeeItem } from "@/lib/types";

const initialState: FeeItemFormState = {};

export function FeeItemForm({
  feeItem,
  action,
}: {
  feeItem?: FeeItem;
  action: (state: FeeItemFormState, formData: FormData) => Promise<FeeItemFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Track
          <input name="track" defaultValue={feeItem?.track} required className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Course Name
          <input
            name="course_name"
            defaultValue={feeItem?.course_name}
            required
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Fee
          <input name="fee" defaultValue={feeItem?.fee ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          OTP (One-Time Payment)
          <input name="otp" defaultValue={feeItem?.otp ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Installment
          <input name="installment" defaultValue={feeItem?.installment ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Duration
          <input name="duration" defaultValue={feeItem?.duration ?? ""} className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Display Order
        <input
          type="number"
          name="display_order"
          defaultValue={feeItem?.display_order ?? 0}
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
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
        {pending ? "Saving..." : feeItem ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
