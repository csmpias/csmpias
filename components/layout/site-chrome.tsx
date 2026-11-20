"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingCtaWidget } from "@/components/layout/floating-cta-widget";
import { AnalyticsTracker } from "@/components/analytics/tracker";
import { InterviewGuidancePopup } from "@/components/interview-guidance/registration-popup";
import { InterviewGuidancePromoPopup } from "@/components/interview-guidance/promo-image-popup";
import type { FooterCourse } from "@/components/layout/site-footer";
import type { NavGroup } from "@/lib/site-config";

/** The admin dashboard has its own shell (sidebar, no marketing chrome). */
export function SiteChrome({
  children,
  nav,
  courses,
}: {
  children: React.ReactNode;
  nav: NavGroup[];
  courses: FooterCourse[];
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {/* Self-hosted analytics — public visitors only, never admin staff browsing the dashboard. */}
      <AnalyticsTracker />
      <SiteHeader nav={nav} />
      <main id="main-content">{children}</main>
      <SiteFooter courses={courses} />
      <FloatingCtaWidget />
      <InterviewGuidancePopup />
      <InterviewGuidancePromoPopup />
    </>
  );
}
