"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { adminNav } from "@/lib/admin-nav";
import { LogoutButton } from "@/components/admin/logout-button";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

// Dedicated mobile nav for the admin dashboard chrome — the public site's
// MobileNav is styled and structured for the marketing site and pulls in
// unrelated concerns (language toggle, search, CTA copy). The admin sidebar
// is hidden entirely below md, so without this the dashboard is unusable
// on a phone past the first screen.
export function AdminMobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  function isActive(href: string): boolean {
    return href.includes("?") ? currentUrl === href : pathname === href;
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
        className="flex items-center justify-center rounded-[4px] border border-rule p-2 text-ink md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-paper md:hidden">
            <div className="flex items-center justify-between border-b border-rule px-4 py-4">
              <div>
                <span className="font-display text-lg font-bold">CSMP IAS</span>
                <p className="font-data text-[0.625rem] uppercase tracking-[0.06em] text-ink/70">Admin Dashboard</p>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                className="rounded-[4px] border border-rule p-2 text-ink"
                onClick={() => setOpen(false)}
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Admin">
              <ul className="flex flex-col gap-4">
                {adminNav.map((entry) =>
                  entry.kind === "link" ? (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        aria-current={isActive(entry.href) ? "page" : undefined}
                        className={cn(
                          "block rounded-[4px] px-2 py-1 font-bold",
                          isActive(entry.href) ? "bg-ink text-paper" : "text-ink",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={entry.label}>
                      <p className="font-data text-[0.625rem] uppercase tracking-[0.06em] text-ink/50">
                        {entry.label}
                      </p>
                      <ul className="mt-1 flex flex-col gap-2 pl-3">
                        {entry.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              aria-current={isActive(link.href) ? "page" : undefined}
                              className={cn(
                                "block rounded-[4px] px-2 py-1 text-[0.9375rem]",
                                isActive(link.href) ? "bg-ink text-paper" : "text-ink/80",
                              )}
                              onClick={() => setOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <div className="border-t border-rule p-4">
              <LogoutButton />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
