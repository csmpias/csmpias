"use client";

import { useTransition } from "react";
import { updateApplicationStatus } from "@/lib/actions/admin/applications";
import type { ApplicationStatus } from "@/lib/types";

const statuses: ApplicationStatus[] = ["new", "contacted", "enrolled", "rejected"];

export function ApplicationStatusSelect({ id, status }: { id: string; status: ApplicationStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as ApplicationStatus;
        startTransition(() => {
          updateApplicationStatus(id, next);
        });
      }}
      className="rounded-[4px] border border-rule bg-paper px-2 py-1.5 text-sm outline-none focus:border-ink disabled:opacity-60"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
