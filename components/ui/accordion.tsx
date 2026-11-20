"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-heading/10 overflow-hidden rounded-[10px] border border-heading/10 bg-white shadow-[0_2px_16px_rgba(34,22,56,0.05)]">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold transition-colors sm:px-6 sm:py-5",
                open ? "text-brand" : "text-heading hover:text-brand",
              )}
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span>{item.question}</span>
              <span
                aria-hidden
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-body text-base font-bold transition-all duration-300",
                  open ? "rotate-45 border-brand bg-brand text-white" : "border-heading/20 text-heading/60",
                )}
              >
                +
              </span>
            </button>
            <div className="accordion-panel" data-open={open}>
              <div>
                <p className="px-5 pb-5 text-sm leading-[1.7] text-muted sm:px-6 sm:text-[0.9375rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
