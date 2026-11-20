"use client";

import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useLanguage } from "@/components/providers/language-provider";
import { buildWhatsAppLink } from "@/lib/site-config";

export function PaymentQRCard({ courseName }: { courseName: string }) {
  const { t } = useLanguage();
  const message = `Hi, I've made the payment for the "${courseName}" batch. My name is: [your name]. I'm attaching my payment screenshot.`;

  return (
    <div className="mt-4 rounded-[14px] border border-heading/10 bg-white p-5 shadow-[0_2px_16px_rgba(34,22,56,0.05)] sm:p-6">
      <h3 className="font-display text-lg font-bold text-heading">{t("payment.title")}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{t("payment.description")}</p>
      <div className="relative mx-auto mt-4 aspect-square w-40 overflow-hidden rounded-[10px] border border-heading/10">
        <Image src="/payment-qr.jpeg" alt="Scan to pay course fee" fill sizes="10rem" className="object-contain" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{t("payment.instructions")}</p>
      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-3 rounded-[10px] bg-brand-cta px-4 py-3 font-semibold text-ink transition-colors hover:bg-brand-cta-dark"
      >
        <WhatsAppIcon className="size-5 shrink-0" />
        {t("payment.sendScreenshot")}
      </a>
    </div>
  );
}
