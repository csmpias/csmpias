"use client";

import { useActionState } from "react";
import type { FeeInstallmentFormState } from "@/lib/actions/admin/fee-installments";
import type { FeeInstallment } from "@/lib/types";

const initialState: FeeInstallmentFormState = {};

export function FeeInstallmentForm({
  feeInstallment,
  action,
}: {
  feeInstallment?: FeeInstallment;
  action: (state: FeeInstallmentFormState, formData: FormData) => Promise<FeeInstallmentFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-3xl gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Track
          <input name="track" defaultValue={feeInstallment?.track} required className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink" />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Course Name
          <input
            name="course_name"
            defaultValue={feeInstallment?.course_name}
            required
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Installment 1
          <input
            name="installment_1"
            defaultValue={feeInstallment?.installment_1 ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Installment 2
          <input
            name="installment_2"
            defaultValue={feeInstallment?.installment_2 ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Installment 3
          <input
            name="installment_3"
            defaultValue={feeInstallment?.installment_3 ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Total Fee
        <input
          name="total_fee"
          defaultValue={feeInstallment?.total_fee ?? ""}
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Display Order
        <input
          type="number"
          name="display_order"
          defaultValue={feeInstallment?.display_order ?? 0}
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
        {pending ? "Saving..." : feeInstallment ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
