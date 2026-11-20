"use client";

import { useActionState } from "react";
import type { NavLinkFormState } from "@/lib/actions/admin/nav-links";
import { navGroupOptions } from "@/lib/nav";
import type { NavLinkRow } from "@/lib/types";

const initialState: NavLinkFormState = {};

export function NavLinkForm({
  navLink,
  action,
}: {
  navLink?: NavLinkRow;
  action: (state: NavLinkFormState, formData: FormData) => Promise<NavLinkFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-lg gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Section <span className="font-normal text-ink/70">(which nav dropdown this link appears in — UPSC/UPPCS also list every active course automatically, so use those for anything else)</span>
        <select
          name="group_label"
          defaultValue={navLink?.group_label ?? navGroupOptions[0]}
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        >
          {navGroupOptions.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Label <span className="font-normal text-ink/70">(the text visitors see in the menu)</span>
        <input
          name="label"
          defaultValue={navLink?.label}
          required
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Link <span className="font-normal text-ink/70">(e.g. /apply-now, or a full https:// URL for an external link)</span>
        <input
          name="href"
          defaultValue={navLink?.href}
          required
          placeholder="/apply-now"
          className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Display Order <span className="font-normal text-ink/70">(added after everything else in the section)</span>
          <input
            type="number"
            name="display_order"
            defaultValue={navLink?.display_order ?? 0}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="is_active" defaultChecked={navLink?.is_active ?? true} className="h-4 w-4" />
          Active
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
        {pending ? "Saving..." : navLink ? "Save changes" : "Create"}
      </button>
    </form>
  );
}
