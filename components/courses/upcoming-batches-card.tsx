"use client";

import { useLanguage } from "@/components/providers/language-provider";
import type { Batch } from "@/lib/types";

function formatBatchDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function UpcomingBatchesCard({ batches }: { batches: Batch[] }) {
  const { t } = useLanguage();
  if (batches.length === 0) return null;

  return (
    <div className="mt-4 rounded-[14px] border border-heading/10 bg-white p-5 shadow-[0_2px_16px_rgba(34,22,56,0.05)] sm:p-6">
      <h3 className="font-display text-lg font-bold text-heading">{t("batchInfo.upcomingBatches")}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {batches.map((batch) => (
          <div key={batch.id} className="rounded-[10px] border border-heading/10 bg-cream px-5 py-4">
            <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">{batch.name}</dt>
            <dd className="mt-1.5 font-body text-[0.9375rem] font-bold leading-snug tracking-tight text-heading">
              {formatBatchDate(batch.start_date) ?? "—"}
            </dd>
            {batch.center ? <p className="mt-1 text-xs text-muted">{batch.center}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
