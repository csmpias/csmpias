"use client";

import { useEffect, useState } from "react";
import { getSeoScore, type SeoBand } from "@/lib/seo-score";
import { cn } from "@/lib/utils";

const bandBadge: Record<SeoBand, string> = {
  green: "bg-[var(--color-seo-good-tint)] text-[var(--color-seo-good)]",
  amber: "bg-[var(--color-seo-warn-tint)] text-[var(--color-seo-warn)]",
  red: "bg-[var(--color-seo-poor-tint)] text-[var(--color-seo-poor)]",
};

const checkDot: Record<"pass" | "fail", string> = {
  pass: "bg-[var(--color-seo-good-tint)] text-[var(--color-seo-good)]",
  fail: "bg-[var(--color-seo-poor-tint)] text-[var(--color-seo-poor)]",
};

export function SeoPanel({
  title,
  excerpt,
  content,
  coverImageUrl,
  isLegacy,
}: {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  isLegacy: boolean;
}) {
  // Recomputes live on every edit, debounced so it doesn't fight the
  // editor's own performance while typing.
  const [debounced, setDebounced] = useState({ title, excerpt, content, coverImageUrl });

  useEffect(() => {
    const timer = setTimeout(() => setDebounced({ title, excerpt, content, coverImageUrl }), 300);
    return () => clearTimeout(timer);
  }, [title, excerpt, content, coverImageUrl]);

  const result = getSeoScore({ ...debounced, isLegacy });

  return (
    <div className="sticky top-6 flex flex-col gap-4 rounded-[4px] border border-rule bg-paper-dim p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold">SEO Checklist</h2>
        <span className={cn("shrink-0 rounded-[4px] px-2.5 py-1 text-sm font-bold", bandBadge[result.band])}>
          {result.score} · {result.bandLabel}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-ink/60">
        A self-computed on-page checklist for writers — not Google Search Console data, and not a real Rank
        Math/Yoast score.
      </p>

      {result.isLegacy ? (
        <p className="rounded-[4px] border border-rule bg-paper px-3 py-2 text-xs leading-relaxed text-ink/70">
          <strong className="text-ink">Imported content.</strong> This is a baseline score for content migrated
          from the old site before this checklist existed — not a live audit of this post.
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {result.checks.map((check) => (
            <li key={check.id} className="flex items-start gap-2 text-sm">
              <span
                className={cn(
                  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold",
                  checkDot[check.passed ? "pass" : "fail"],
                )}
                aria-hidden
              >
                {check.passed ? "✓" : "✕"}
              </span>
              <span className={check.passed ? "text-ink/80" : "text-ink"}>{check.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
