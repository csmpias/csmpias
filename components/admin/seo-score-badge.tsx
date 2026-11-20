import { cn } from "@/lib/utils";
import type { SeoBand } from "@/lib/seo-score";

const bandBadge: Record<SeoBand, string> = {
  green: "bg-[var(--color-seo-good-tint)] text-[var(--color-seo-good)]",
  amber: "bg-[var(--color-seo-warn-tint)] text-[var(--color-seo-warn)]",
  red: "bg-[var(--color-seo-poor-tint)] text-[var(--color-seo-poor)]",
};

export function SeoScoreBadge({ score, band, isLegacy }: { score: number; band: SeoBand; isLegacy: boolean }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-xs font-bold", bandBadge[band])}
      title={isLegacy ? "Baseline score — imported content, not a live audit" : undefined}
    >
      {score}
      {isLegacy ? <span className="font-normal opacity-70">(imported)</span> : null}
    </span>
  );
}
