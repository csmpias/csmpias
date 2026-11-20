"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggle } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "en" ? "Switch to Hindi" : "Switch to English"}
      className={cn(
        "flex shrink-0 items-center gap-1 rounded-[5px] border border-heading/15 px-1.5 py-2 text-xs font-bold text-heading hover:border-brand hover:text-brand xl:px-2.5",
        className,
      )}
    >
      <span className={lang === "en" ? "text-brand" : "text-muted"}>EN</span>
      <span aria-hidden className="text-heading/30">
        /
      </span>
      <span className={lang === "hi" ? "text-brand" : "text-muted"}>हिं</span>
    </button>
  );
}
