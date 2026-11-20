"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LogoutButton } from "@/components/admin/logout-button";
import { adminNav } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  function isActive(href: string): boolean {
    return href.includes("?") ? currentUrl === href : pathname === href;
  }

  return (
    // Sticky + a height of its own (h-screen) rather than relying on flex
    // stretch: a flex item with no intrinsic height stretches to match its
    // tallest sibling (the scrolling content column), which on a long page
    // left a blank void below the nav links and pushed "Log out" off-screen.
    // Pinning the aside to the viewport height means only <nav> below
    // scrolls, and the height never depends on how tall the page is.
    <aside className="hidden w-60 shrink-0 flex-col border-r border-rule bg-paper-dim md:sticky md:top-0 md:flex md:h-screen">
      <div className="border-b border-rule px-5 py-5">
        <Link href="/admin" className="font-display text-lg font-bold">
          CSMP IAS
        </Link>
        <p className="font-data text-[0.625rem] uppercase tracking-[0.06em] text-ink/70">Admin Dashboard</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-3">
          {adminNav.map((entry) =>
            entry.kind === "link" ? (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  aria-current={isActive(entry.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-[4px] px-3 py-2 text-sm font-medium",
                    isActive(entry.href) ? "bg-ink text-paper" : "text-ink/80 hover:bg-paper hover:text-ink",
                  )}
                >
                  {entry.label}
                </Link>
              </li>
            ) : (
              <li key={entry.label}>
                <p className="px-3 pb-1 font-data text-[0.625rem] uppercase tracking-[0.06em] text-ink/50">
                  {entry.label}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {entry.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={cn(
                          "block rounded-[4px] px-3 py-2 text-sm font-medium",
                          isActive(link.href) ? "bg-ink text-paper" : "text-ink/80 hover:bg-paper hover:text-ink",
                        )}
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
    </aside>
  );
}
