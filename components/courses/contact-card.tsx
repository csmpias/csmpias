"use client";

import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useLanguage } from "@/components/providers/language-provider";
import { buildWhatsAppLink, siteConfig } from "@/lib/site-config";

export function ContactCard({ courseName }: { courseName: string }) {
  const { t } = useLanguage();

  return (
    <div className="mt-4 rounded-[14px] border border-heading/10 bg-white p-5 shadow-[0_2px_16px_rgba(34,22,56,0.05)] sm:p-6">
      <h3 className="font-display text-lg font-bold text-heading">{t("contactCard.title")}</h3>
      <div className="mt-4 grid gap-3">
        <a
          href={siteConfig.phoneHref}
          className="flex items-center gap-3 rounded-[10px] border border-heading/10 bg-cream px-4 py-3 font-semibold text-heading transition-colors hover:border-brand hover:text-brand"
        >
          <PhoneIcon className="size-5 shrink-0" />
          {siteConfig.phone}
        </a>
        <a
          href={buildWhatsAppLink(`Hi, I'd like to know more about the ${courseName}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-[10px] bg-brand-cta px-4 py-3 font-semibold text-ink transition-colors hover:bg-brand-cta-dark"
        >
          <WhatsAppIcon className="size-5 shrink-0" />
          {t("cta.chatWhatsapp")}
        </a>
        <a
          href={siteConfig.emailHref}
          className="flex items-center gap-3 rounded-[10px] border border-heading/10 bg-cream px-4 py-3 font-semibold text-heading transition-colors hover:border-brand hover:text-brand"
        >
          {siteConfig.email}
        </a>
      </div>
    </div>
  );
}
