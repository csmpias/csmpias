"use client";

import Link from "next/link";
import {
  footerCourseLinks,
  footerResourceLinks,
  footerCurrentAffairsLinks,
  footerUsefulLinks,
  popularSearchLinks,
  siteConfig,
} from "@/lib/site-config";
import { courseHref } from "@/lib/course-routes";
import { useLanguage } from "@/components/providers/language-provider";
import { FacebookIcon, InstagramIcon, PhoneIcon, YouTubeIcon } from "@/components/ui/icons";

export type FooterCourse = { id: string; slug: string; name: string };

const socialLinks = [
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.08em] text-teal">{title}</p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/70 hover:text-brand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter({ courses }: { courses: FooterCourse[] }) {
  const { t } = useLanguage();

  return (
    <footer className="bg-heading text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-white">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm text-white/65">{siteConfig.description}</p>
            <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-teal">
              {t("footer.establishedYear")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} on ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-brand hover:text-brand"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title={t("footer.courses")} links={footerCourseLinks} />
          <FooterColumn title={t("footer.resources")} links={footerResourceLinks} />
          <FooterColumn title={t("footer.currentAffairs")} links={footerCurrentAffairsLinks} />
          <div>
            <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.08em] text-teal">
              {t("footer.usefulLinks")}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerUsefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-brand"
                >
                  {t("footer.googleReviews")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {courses.length > 0 ? (
          <div className="mt-10 border-t border-white/10 pt-10">
            <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.08em] text-teal">
              {t("footer.allCourses")}
            </p>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link href={courseHref(course.slug)} className="text-sm text-white/70 hover:text-brand">
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-[0.75rem] font-extrabold uppercase tracking-[0.08em] text-teal">
            {t("footer.popularSearches")}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-[0.8125rem] leading-relaxed text-white/55">
            {popularSearchLinks.map((link, i) => (
              <span key={link.href + link.label}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
                {i < popularSearchLinks.length - 1 ? <span className="ml-2 text-white/25">|</span> : null}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[10px] border border-white/10">
          <iframe
            src={siteConfig.googleMapsEmbedUrl}
            title={`${siteConfig.name} location`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 sm:h-72"
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm text-white/70">
          <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-brand">
            <PhoneIcon className="h-4 w-4 shrink-0" />
            {siteConfig.phone}
          </a>
          <a href={siteConfig.emailHref} className="flex items-center gap-2 hover:text-brand">
            {siteConfig.email}
          </a>
          <span className="flex items-center gap-2">{siteConfig.address.full}</span>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-[0.75rem] text-white/55 sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} {siteConfig.legalName}. {t("footer.rightsReserved")}
      </div>
    </footer>
  );
}
