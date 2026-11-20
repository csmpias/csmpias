"use client";

import { Button, ButtonAsButton } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { openInterviewGuidancePopup } from "@/lib/interview-guidance-popup";

function InfoItem({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="rounded-[10px] border border-heading/10 bg-cream px-5 py-4">
      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">{label}</dt>
      <dd className="mt-1.5 font-body text-[0.9375rem] font-bold leading-snug tracking-tight text-heading">{value}</dd>
    </div>
  );
}

export function BatchInfoCard({
  examType,
  duration,
  mode,
  medium,
  fee,
  applyMode = "link",
}: {
  examType: string | null;
  duration: string | null;
  mode: string | null;
  medium: string | null;
  fee: string | null;
  /** "popup" opens the interview guidance registration popup in place of navigating to /apply-now. */
  applyMode?: "link" | "popup";
}) {
  const { t } = useLanguage();

  return (
    <div className="rounded-[14px] border border-heading/10 bg-white p-5 shadow-[0_2px_16px_rgba(34,22,56,0.05)] sm:p-6">
      <h3 className="font-display text-lg font-bold text-heading">{t("batchInfo.title")}</h3>
      <dl className="mt-4 grid gap-3">
        <InfoItem label={t("batchInfo.exam")} value={examType} />
        <InfoItem label={t("batchInfo.duration")} value={duration} />
        <InfoItem label={t("batchInfo.mode")} value={mode} />
        <InfoItem label={t("batchInfo.medium")} value={medium} />
        <InfoItem label={t("batchInfo.fee")} value={fee} />
      </dl>
      <div className="mt-6 flex flex-col gap-3">
        {applyMode === "popup" ? (
          <ButtonAsButton type="button" variant="primary" className="w-full" onClick={openInterviewGuidancePopup}>
            {t("cta.applyToday")}
          </ButtonAsButton>
        ) : (
          <Button href="/apply-now" variant="primary" className="w-full">
            {t("cta.applyToday")}
          </Button>
        )}
        <Button href="/contact-us" variant="outline" className="w-full">
          {t("cta.bookMentor")}
        </Button>
      </div>
    </div>
  );
}
