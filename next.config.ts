import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The PDF export route reads bundled font files and the site logo via
  // `fs` at request time (react-pdf needs real font bytes, not CSS @font-
  // face). Next's output tracing can't see those reads (they're passed
  // into a third-party renderer, not called directly in the route file),
  // so without this the files are silently dropped from the deployed
  // function and PDF generation 500s in production only.
  outputFileTracingIncludes: {
    "/api/current-affairs/**/*": ["./lib/pdf/fonts/**", "./public/csmp-ias-logo.jpg"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        // YouTube serves video thumbnails from i.ytimg.com as well as
        // sharded hosts like i1.ytimg.com-i4.ytimg.com.
        protocol: "https",
        hostname: "*.ytimg.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // www.csmpias.com currently serves the exact same content as
      // csmpias.com with a 200 (no redirect) — two live, uncanonicalized
      // copies of every page split ranking signals and read as duplicate
      // content to Google. Canonical tags site-wide already point at the
      // apex domain, so send www there permanently to match.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.csmpias.com" }],
        destination: "https://csmpias.com/:path*",
        permanent: true,
      },
      // Legacy WordPress redirect stub — preserved from the source export.
      { source: "/contact", destination: "/contact-us", permanent: true },
      // The legacy site's "canonical" URL had a duplicate-slug artifact
      // (/72th-bpsc-integrated-mentorship-2026/ redirected to this one);
      // the new site consolidates on the clean slug.
      {
        source: "/72th-bpsc-integrated-mentorship-2026-2-2",
        destination: "/72th-bpsc-integrated-mentorship-2026",
        permanent: true,
      },
      // Content merged into the UPPCS Foundation course page.
      {
        source: "/foundation-batch-2026-hindi-medium",
        destination: "/courses/uppcs/foundation",
        permanent: true,
      },
      {
        source: "/uppcs-foundation-course-10-11-months",
        destination: "/courses/uppcs/foundation",
        permanent: true,
      },
      {
        source: "/uppcs-mains-enrichment-program-2026",
        destination: "/courses/uppcs/mains-enrichment-program-2026",
        permanent: true,
      },
      // Legacy WordPress /category/... URLs — Google Search Console still
      // has these queued as "Discovered - currently not indexed" from the
      // old site (they 404 today since the new site has no /category/
      // routes at all). Redirecting them to their closest modern
      // equivalent both stops wasting crawl budget on dead URLs and
      // reclaims any backlink equity still pointing at the old paths.
      { source: "/category/blogs", destination: "/current-affairs", permanent: true },
      { source: "/category/current-affairs", destination: "/current-affairs", permanent: true },
      {
        source: "/category/current-affairs/daily-updates",
        destination: "/current-affairs/category/daily-updates",
        permanent: true,
      },
      {
        source: "/category/current-affairs/daily-updates/daily-current-affairs",
        destination: "/current-affairs/category/daily-updates",
        permanent: true,
      },
      {
        source: "/category/current-affairs/daily-updates/daily-current-affairs/english-current-affairs",
        destination: "/current-affairs/category/daily-updates",
        permanent: true,
      },
      {
        source: "/category/current-affairs/daily-updates/daily-editorial-news-analysis",
        destination: "/current-affairs/category/editorial",
        permanent: true,
      },
      {
        source: "/category/current-affairs/state-specific",
        destination: "/current-affairs/category/state-specific",
        permanent: true,
      },
      {
        source: "/category/essay/uppcs-essay-papers-by-years",
        destination: "/resources/essay",
        permanent: true,
      },
      {
        source: "/category/essay/uppcs-essay-solved-papers-by-years",
        destination: "/resources/essay",
        permanent: true,
      },
      {
        source: "/category/up-special-gs-paper-v-vi/previous-year-questions/papers-by-subject",
        destination: "/resources/pyqs",
        permanent: true,
      },
      {
        source: "/category/up-special-gs-paper-v-vi/previous-year-questions/papers-by-years",
        destination: "/resources/pyqs",
        permanent: true,
      },
      // Three posts were imported with Devanagari (non-ASCII) slugs, which
      // hit a Next.js production-server routing bug: the pages prerender
      // fine at build time (present in the prerender manifest and on disk),
      // but the server 404s on every request because it fails to match the
      // percent-encoded multi-byte segment back to the prerendered route —
      // these pages were unreachable from the moment they were published,
      // so there's no live URL to redirect from (a redirect `source` with
      // the same non-ASCII segment hits the identical matching bug and
      // never fires). Every other slug in this app already goes through
      // lib/utils.ts's `slugify()`, which is ASCII-only by design — these
      // three were the only ones that bypassed it (a bulk-import artifact).
      // Re-slugged them to ASCII in the DB instead; see git history for the
      // old slug -> new slug mapping if a redirect is ever needed.
    ];
  },
};

export default nextConfig;
