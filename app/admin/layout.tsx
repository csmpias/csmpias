import type { Metadata } from "next";

// robots.ts already disallows crawling /admin, but a defense-in-depth
// noindex here also stops it being indexed if a link to it ever gets
// discovered some other way (e.g. a stray external backlink).
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
