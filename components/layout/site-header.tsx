"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryCta, siteConfig, type NavGroup } from "@/lib/site-config";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchBar } from "@/components/layout/search-bar";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { useLanguage } from "@/components/providers/language-provider";
import { ChevronDownIcon } from "@/components/ui/icons";
import { NAV_LABEL_TO_KEY } from "@/lib/i18n/nav-keys";
import { cn } from "@/lib/utils";

export function SiteHeader({ nav }: { nav: NavGroup[] }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  function navLabel(label: string): string {
    const key = NAV_LABEL_TO_KEY[label];
    return key ? t(key) : label;
  }

  // Close whenever the route changes (a submenu link was followed).
  useEffect(() => {
    setOpenLabel(null);
  }, [pathname]);

  // Close on click/tap outside the nav, and on Escape.
  useEffect(() => {
    if (!openLabel) return;

    function handlePointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenLabel(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenLabel(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openLabel]);

  return (
    <header className="sticky top-0 z-50 border-b border-heading/10 bg-white">
      <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-6 xl:gap-4">
        {/* Fixed square frame + rounded-full for a circular mark, with
            object-contain (not cover) so the whole logo fits inside without
            cropping — the source image isn't square, and its black
            background fills the frame's own bg so there's no visible
            letterboxing. */}
        <Link
          href="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black xl:h-12 xl:w-12"
        >
          <Image
            src="/csmp-ias-logo.jpg"
            alt={siteConfig.name}
            width={447}
            height={447}
            priority
            className="h-full w-full object-contain"
          />
        </Link>

        <nav ref={navRef} className="hidden min-w-0 flex-1 xl:block" aria-label="Primary">
          {/* No overflow-x-auto here: it would force overflow-y to also
              clip (per the CSS overflow computed-value pairing rule),
              which silently cuts off the absolutely-positioned dropdown
              panels below even though their open/closed state is correct.
              This full desktop nav (plus the language toggle, search icon,
              and CTA it shares header space with) only ever renders from
              xl (1280px) up — below that, MobileNav's hamburger menu takes
              over instead. Squeezing all of it into the 1024-1279px range
              via ever-tighter padding proved unreliable (kept regressing
              into "Contact Us" overlapping the search icon as new controls
              were added), so this trades that pixel-shaving for a
              breakpoint that's reliably never cramped. */}
          <ul className="flex items-center gap-0">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label} className="relative shrink-0">
                  <button
                    type="button"
                    className="flex items-center gap-1 whitespace-nowrap rounded-[5px] px-1 py-2 text-[0.8125rem] font-bold text-heading hover:text-brand"
                    aria-haspopup="true"
                    aria-expanded={openLabel === item.label}
                    onClick={() => setOpenLabel((current) => (current === item.label ? null : item.label))}
                  >
                    {navLabel(item.label)}
                    <ChevronDownIcon
                      className={cn("size-3 opacity-60 transition-transform", openLabel === item.label && "rotate-180")}
                    />
                  </button>
                  <div
                    className={cn(
                      "absolute left-0 top-full z-10 min-w-56 rounded-[10px] border border-heading/10 bg-white py-2 shadow-[0_12px_32px_rgba(34,22,56,0.14)]",
                      openLabel === item.label ? "block" : "hidden",
                    )}
                  >
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href ?? "#"}
                            className="block whitespace-nowrap px-4 py-2 text-sm font-medium text-heading/80 hover:bg-cream hover:text-brand"
                            onClick={() => setOpenLabel(null)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label} className="shrink-0">
                  <Link
                    href={item.href ?? "#"}
                    className="block whitespace-nowrap rounded-[5px] px-1 py-2 text-[0.8125rem] font-bold text-heading hover:text-brand"
                  >
                    {navLabel(item.label)}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle className="hidden xl:flex" />
          <SearchBar compact />
          <Link
            href={primaryCta.href}
            className="hidden rounded-[5px] bg-brand px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-dark sm:inline-flex xl:px-4"
          >
            {t("cta.applyNow")}
          </Link>
          <MobileNav nav={nav} />
        </div>
      </div>
    </header>
  );
}
