"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

export function PdfViewer({ url, title }: { url: string; title: string }) {
  const { t } = useLanguage();

  return (
    <div className="mt-6 overflow-hidden rounded-[10px] border border-heading/10 shadow-[0_4px_24px_rgba(34,22,56,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-heading/10 bg-cream px-4 py-3 sm:px-5">
        <h3 className="font-display text-sm font-bold text-heading sm:text-base">{title}</h3>
        <div className="flex flex-wrap gap-2">
          <Button href={url} variant="outline" target="_blank" rel="noopener noreferrer" className="!px-3 !py-2 text-xs sm:text-sm">
            {t("pdf.openNewTab")}
          </Button>
          <Button href={url} variant="primary" download className="!px-3 !py-2 text-xs sm:text-sm">
            {t("pdf.download")}
          </Button>
        </div>
      </div>
      {/* Native browser PDF rendering (Chrome/Edge/Firefox/desktop Safari) —
          no pdf.js dependency needed. Mobile browsers that can't render
          inline fall back gracefully to a blank frame; the buttons above
          always work regardless. */}
      <iframe src={url} title={title} className="h-[28rem] w-full bg-white sm:h-[36rem] lg:h-[44rem]" />
    </div>
  );
}
