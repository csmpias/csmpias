"use client";

import { useId, useState } from "react";
import { InfoIcon } from "@/components/ui/icons";

/** A small (ⓘ) tooltip next to a field label, explaining what the field is for in plain language. */
export function FieldLabel({ help }: { help: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-describedby={id}
        aria-label="Field help"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="flex size-4 items-center justify-center rounded-full text-ink/40 hover:text-ink"
      >
        <InfoIcon className="size-3.5" />
      </button>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-1.5 w-60 -translate-x-1/2 rounded-[4px] border border-rule bg-ink px-2.5 py-2 text-xs font-normal leading-snug text-paper shadow-lg"
        >
          {help}
        </span>
      ) : null}
    </span>
  );
}
