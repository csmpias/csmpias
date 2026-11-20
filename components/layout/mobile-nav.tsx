"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { primaryCta, siteConfig, type NavGroup } from "@/lib/site-config";
import { SearchBar } from "@/components/layout/search-bar";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { useLanguage } from "@/components/providers/language-provider";
import { MenuIcon, CloseIcon, ChevronDownIcon } from "@/components/ui/icons";
import { NAV_LABEL_TO_KEY } from "@/lib/i18n/nav-keys";
import { cn } from "@/lib/utils";

export function MobileNav({ nav }: { nav: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  function navLabel(label: string): string {
    const key = NAV_LABEL_TO_KEY[label];
    return key ? t(key) : label;
  }

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-[5px] border border-heading/15 p-2 text-heading xl:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-white xl:hidden">
            <div className="flex items-center justify-between border-b border-heading/10 px-4 py-4">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black">
                <Image src="/csmp-ias-logo.jpg" alt={siteConfig.name} width={447} height={447} className="h-full w-full object-contain" />
              </div>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-[5px] border border-heading/15 p-2 text-heading"
                  onClick={() => setOpen(false)}
                >
                  <CloseIcon className="size-5" />
                </button>
              </div>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              <div className="pb-4">
                <SearchBar />
              </div>
              <ul className="flex flex-col divide-y divide-heading/10">
                {nav.map((item) => (
                  <li key={item.label} className="py-1">
                    {item.children ? (
                      <div>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-3 text-left font-bold text-heading"
                          aria-expanded={openGroup === item.label}
                          onClick={() =>
                            setOpenGroup((current) => (current === item.label ? null : item.label))
                          }
                        >
                          {navLabel(item.label)}
                          <ChevronDownIcon
                            className={cn(
                              "size-4 transition-transform",
                              openGroup === item.label && "rotate-180",
                            )}
                          />
                        </button>
                        <div className="accordion-panel" data-open={openGroup === item.label}>
                          <div>
                            <ul className="flex flex-col gap-1 pb-3 pl-3">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href ?? "#"}
                                    className="block py-2 text-[0.9375rem] text-heading/75"
                                    onClick={() => setOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href ?? "#"}
                        className="block py-3 font-bold text-heading"
                        onClick={() => setOpen(false)}
                      >
                        {navLabel(item.label)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-heading/10 p-4">
              <Link
                href={primaryCta.href}
                className="block rounded-[5px] bg-brand px-4 py-3 text-center font-bold text-white shadow-sm"
                onClick={() => setOpen(false)}
              >
                {t("cta.applyNow")}
              </Link>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
