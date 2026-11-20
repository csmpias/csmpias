import { buildWhatsAppLink, siteConfig } from "@/lib/site-config";
import { WhatsAppIcon, PhoneIcon } from "@/components/ui/icons";

export function FloatingCtaWidget() {
  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col gap-3">
      <a
        href={siteConfig.phoneHref}
        aria-label={`Call ${siteConfig.name}`}
        className="flex size-12 items-center justify-center rounded-full border border-heading/10 bg-white text-heading shadow-[0_4px_18px_rgba(34,22,56,0.16)] hover:text-brand"
      >
        <PhoneIcon className="size-5" />
      </a>
      <a
        href={buildWhatsAppLink("Hi, I'd like to know more about CSMP IAS courses.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-brand-cta text-ink hover:bg-brand-cta-dark"
      >
        <WhatsAppIcon className="size-6" />
      </a>
    </div>
  );
}
