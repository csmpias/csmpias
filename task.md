# CSMP IAS — WordPress-parity UI Revamp

## Why this file exists
Tracks a large, multi-session task so work can resume if a session runs out
of budget. Update the checkboxes as work lands. Every phase is committed
and pushed to `main` directly (per explicit user instruction — no PRs for
this task) as soon as it builds clean.

## Goal
Recode the **visual design** of the public site to match the old WordPress
site's look (theme: "eCademy", Elementor-built, source in branch
`claude/wordpress-content-nextjs-migration-dwhc3n` — see
`csmpias_backup/csmpias.com/` for raw HTML/CSS and `content.md` for a
clean text/table extraction of every page and blog post).

**Hard constraints (do not violate):**
- Functionality stays the same. No new features, no removed features.
- The **admin dashboard** (`app/admin/**`, `components/admin/**`) UI stays
  exactly as-is — do not restyle it, do not touch its shared primitives'
  default look.
- Data model / Supabase schema / Cloudinary usage stays the same. Existing
  Supabase rows and Cloudinary assets are NOT to be deleted or re-uploaded —
  reuse what's already there (courses, posts, testimonials, resources, fee
  data, etc. were migrated from WordPress content in an earlier session —
  139 blog posts already seeded). If new imagery is needed to match a WP
  page's asset placement, upload it to the existing Cloudinary folders
  (`lib/cloudinary.ts` → `CLOUDINARY_FOLDERS`) rather than inventing new ones.
- SEO must stay strong or improve (metadata, JSON-LD, sitemap, alt text) —
  don't regress anything from the earlier SEO pass.
- Build must stay clean: `npx tsc --noEmit` and `npx next build` before
  every push.

## Design language extracted from the WordPress theme (eCademy / Elementor)
Source: `csmpias_backup/csmpias.com/bcsmpias/b/assets/css/style.css` +
rendered `index.html`.

- **Colors**: primary CTA coral/red `#fe4a55`, heading/ink near-black-navy
  `#221638`, secondary/teal accent `#6ba292`, body paragraph gray `#606060`,
  warm cream section backgrounds `#fef8ef` / `#f5f1ed` / `#f0f2f5`, white
  `#ffffff` base.
- **Fonts**: Playfair Display for headings/display, Nunito for body text
  (site used `font-family: Nunito, Verdana, Geneva, sans-serif` on `body`).
- **Shape**: buttons `border-radius: 5px`, cards `8–10px`, pill CTAs with a
  fill-expand hover animation (a circle/rect that grows from center on
  hover — approximate with a simple background-color transition, don't
  reimplement the literal Elementor JS animation).
- **Section rhythm**: `.section-title` = centered, max-width ~720px, small
  uppercase eyebrow/sub-title (14px, bold, letter-spaced) above a bold
  ~36px `h2`, optional supporting paragraph below.
- **Components present on the WP site** to translate (not literally clone
  Elementor markup — rebuild clean with Tailwind): sticky header with
  mega-menu dropdowns, full-bleed hero with background image + heading +
  CTA, stat counters, "why choose us" icon-card grid, course/program card
  grid, testimonial cards, FAQ accordion, multi-column footer with widgets
  + newsletter, floating WhatsApp CTA.

## Mapping to this codebase
- New design tokens are **additive** in `app/globals.css` — do not repoint
  existing `--color-accent` / `--color-ink` / `--color-paper` etc., since
  `components/admin/**` and `app/admin/**` depend on those staying put.
  Add: `--color-brand` (coral), `--color-brand-dark`, `--color-teal`,
  `--color-teal-dark`, `--color-cream`, `--color-cream-2`.
- `app/fonts.ts`: swap `fontSerif` Lora → Playfair Display, `fontSans`
  Inter → Nunito. Keep `fontMono` (IBM Plex Mono) defined — admin still
  uses `font-data` in 12+ files.
- Public-only primitives safe to restyle freely (not imported by admin):
  `components/ui/button.tsx`, `components/layout/site-header.tsx`,
  `components/layout/mobile-nav.tsx`, `components/layout/site-footer.tsx`,
  `components/layout/floating-cta-widget.tsx`, `components/ui/accordion.tsx`,
  `components/ui/reveal.tsx`, `components/ui/count-up.tsx`,
  `components/ui/icons.tsx`, `components/ui/fee-table.tsx`,
  `components/ui/status-tag.tsx`, `components/ui/page-header.tsx`,
  `components/ui/empty-state.tsx`, everything in `components/home/**`,
  `components/blog/**`, `components/courses/**`, `components/resources/**`.
- Shared with admin — extend, don't replace defaults:
  `components/ui/card.tsx` is used by 2 admin list pages. Add a `variant`
  prop (`"plain"` default = current admin look untouched, `"brand"` = new
  eCademy card look) rather than changing the default export behavior.
- Page files needing a visual pass (content/data logic unchanged, JSX/
  classNames restyled only): every `app/*/page.tsx` and nested dynamic
  routes EXCEPT `app/admin/**`, `app/api/**`.

## Phases

- [x] **Phase 0** — Research WP theme + current codebase, write this file.
- [x] **Phase 1** — Foundation (do first, everything else depends on it):
  - [x] `app/fonts.ts`: Playfair Display + Nunito
  - [x] `app/globals.css`: add brand/teal/cream tokens, `.section-title`
        utility (eyebrow + h2 + p)
  - [x] `components/ui/button.tsx` — coral primary, teal/outline/cta variants
  - [x] `components/ui/card.tsx` — add `variant="brand"` (admin untouched,
        default `variant="plain"` unchanged)
  - [x] `components/layout/site-header.tsx` + `mobile-nav.tsx` — eCademy
        header look (logo left, mega-menu, coral CTA button)
  - [x] `components/layout/site-footer.tsx` — dark navy multi-column footer
        (bg-heading, teal column headings, brand-color link hover)
  - [x] `components/layout/floating-cta-widget.tsx` — white phone bubble
        restyled, WhatsApp green kept (brand-recognized, intentional)
  - [x] Build clean (`tsc --noEmit` + `next build`, 72 routes), commit + push
        to `main`
- [x] **Phase 2** — Home page: `components/home/**` (hero, trust-strip,
      why-choose, programs-grid, about, faq, resources-callout). Pushed as
      `bff4749`.
- [x] **Phase 3** — Course/program surfaces: `components/courses/**`,
      `components/ui/fee-table.tsx`, `components/ui/status-tag.tsx`,
      `components/ui/page-header.tsx`,
      `app/courses/**`, `app/test-series/**`, `app/mentorship-program`,
      `app/online-batches`, `app/optional-subjects`,
      `app/interview-guidance-program`,
      `app/assured-prelims-programme-uppcs-2026`,
      `app/72nd-bpsc-test-series-2026`,
      `app/72th-bpsc-integrated-mentorship-2026`.
      `status-tag.tsx` is currently rendered only by
      `app/admin/(dashboard)/posts` and `.../resources` (no public page
      uses it) — added an opt-in `variant="brand"` palette but kept the
      default (`variant="admin"`) output byte-for-byte identical so the
      admin dashboard stays untouched, per hard constraints. Build clean
      (72 routes), commit + push to `main`.
- [x] **Phase 4** — Blog/current-affairs + resources:
      `components/blog/**`, `components/resources/**`,
      `app/current-affairs/**`, `app/resources/**`. Pushed as `0d27289`.
- [x] **Phase 5** — Remaining static/info pages: `app/about-coaching`,
      `app/directors-desk`, `app/batch-details`, `app/fee-details`,
      `app/contact-us`, `app/faqs-preparation-tips`, `app/apply-now`,
      plus the shared `components/ui/accordion.tsx`,
      `components/ui/empty-state.tsx`, and lead-gen forms
      (`apply-now-form.tsx`, `contact-form.tsx`, `lead-form.tsx`) — forms
      kept the same field names/Server Actions, pure visual pass. Build
      clean (72 routes), pushed as `e818bfc`. NOTE: `app/page.tsx` final
      assembly pass was explicitly out of scope for this phase-agent (owned
      by another agent) and is still outstanding.
- [x] **Phase 6** — SEO pass: audited the existing SEO surface (built in an
      earlier session) rather than assuming gaps — found it already solid:
      every public page has unique `metadata`/`generateMetadata`,
      `app/sitemap.ts` covers static routes + courses + resources + all
      published posts, `app/robots.ts` present, all public `<Image>` usages
      have descriptive `alt` text, `Course` schema (course-detail.tsx),
      `BlogPosting` + `BreadcrumbList` schema (blog post detail), `FAQPage`
      schema (faqs-preparation-tips) were all already implemented. The one
      real gap: `BreadcrumbList` only existed on the blog post template.
      Added it to `components/courses/course-detail.tsx` (covers 7 course/
      program routes) and `app/resources/[type]/[slug]/page.tsx` (resource
      detail pages) — using only URLs that actually resolve (deliberately
      did NOT invent a `/courses` index or a `course.slug`-based URL that
      doesn't match the real dynamic-path routing; the course breadcrumb's
      last crumb omits `item` rather than link to something that 404s).
      Build clean, commit + push to `main`.
- [x] **Phase 7** — QA: ran a full Playwright sweep of every public page at
      1024/1280/1366/1440/1920 + mobile 375 (all clean, zero horizontal
      overflow), plus spot-checks of dynamic routes (a real blog post, a
      course detail page, a category page) and the admin login page (still
      untouched). Found and fixed one more real bug via a Supabase query:
      42 of 139 blog posts have the site name already baked into their
      WordPress-imported `seo_title` (e.g. "... - CSMP IAS : tagline"),
      which was getting double-appended by the root layout's `%s | CSMP
      IAS` title template → messy `<title>` tags hurting search snippets
      for ~30% of blog content. Fixed in
      `app/current-affairs/[slug]/page.tsx`: detect when `seo_title`
      already contains the site name and use `title: { absolute }` to
      bypass the template for just those posts; verified both branded and
      unbranded posts render correct single, clean `<title>` tags. No DB
      writes — pure template-level fix, existing Supabase content
      untouched. `tsc --noEmit` + `next build` clean throughout (72
      routes). All work is on `main`.

## Phase 8 — Hero photo to match the real live site (user follow-up)
- [x] User pointed out the real live homepage (https://csmpias.com) has a
      full-bleed hero photo (student studying in a library) that our
      rebuild was missing — our Phase 2 hero used a plain cream gradient
      instead. Found the exact source image already sitting in the WP
      backup branch content (`csmpias_backup/csmpias.com/my_write/uploads/
      2025/02/uy-hero1.jpg` — confirmed via the raw homepage HTML's
      `.uy-hero-item` swiper slide) and the exact copy (eyebrow, H1 with
      pipe separators, paragraph, two-button CTA) is also there. Uploaded
      the image to the existing `csmp-ias/site` Cloudinary folder (no new
      folder invented) as `csmp-ias/site/uy-hero1`. Rewrote
      `components/home/hero.tsx`: full-bleed photo background via
      `next/image` (`priority`, LCP), dark left-to-right scrim so text
      stays readable, teal eyebrow badge, white H1 with brand-colored pipe
      separators, white/80 paragraph, two buttons (white "About Us" →
      `/about-coaching`, outline "Contact Us" → `/contact-us` — kept the
      real hrefs, only renamed the source site's literal "About Me" typo
      to "About Us"). Dropped the previous quote/stat card from the hero
      since TrustStrip right below already covers stats. Caught and fixed
      a JSX whitespace bug along the way: `{siteConfig.name} Coaching …`
      on a single line inside a `<span>` rendered as "CSMP IASCoaching"
      with the space silently dropped — fixed by using a template literal
      instead of adjacent expression+text children. Verified zero
      horizontal overflow at desktop (1440) and mobile (390) after the
      change, screenshotted both. Build clean, commit + push to `main`.

## Phase 9 — Fix broken desktop nav clicks (user-reported)
- [x] User reported "clicking on it, nothing works" on the nav, and worried
      pages/blog/courses/admin had been lost in the reskin. Verified via
      `next build` output that all 72 routes were always intact (nothing
      was ever deleted — admin, all 139 blog posts, all course routes,
      resources all still present). The real bug: 8 of the 11 top-level
      desktop nav items (About, UPSC, UPPCS, State PCS, Mentorship, More
      Programs, Resources, Admission) are dropdown group-headers with a
      `<button>` that had **no click handler at all** — the submenu only
      opened via CSS `:hover`/`:focus-within`. On a trackpad or any
      non-precise hover input, clicking those buttons did visibly nothing,
      making 8 of 11 nav items and everything under them unreachable.
      Fixed: `components/layout/site-header.tsx` is now a client component
      with real click-to-toggle state (`openLabel`), closes on outside
      click, Escape, and route change, closes after following a submenu
      link. Verified with Playwright using real `.click()` (not `.hover()`)
      through multiple menus (UPSC → Foundation Course, Admission → Apply
      Now, Resources → Resources Hub) — all navigate correctly now. Mobile
      nav was unaffected (it already used click-based accordions). Build
      clean, commit + push to `main`.

## Phase 10 — Fix dropdowns being invisible on desktop (user-reported, Mac)
- [x] User reported dropdowns still didn't show on a Mac laptop after Phase 9
      (screenshot showed the "About" chevron correctly rotated/active, but
      no visible panel below it — worked fine on phone). Root cause: the
      `<ul>`'s `overflow-x-auto` (added back in the original horizontal-
      scroll-bug fix, kept as a "safety net" through Phase 9) forces
      `overflow-y` to also compute as `auto` per the CSS overflow spec's
      computed-value pairing rule ("if one axis is `visible` and the other
      isn't, the visible one becomes `auto` too") — so the ul was silently
      clipping the vertical space the dropdown panels need, even though
      their `display`/open-state was 100% correct. This is why automated
      clicks + `isVisible()` checks earlier reported success (they check
      the panel's own CSS properties, not whether an ancestor clips it out
      of view) while a real user saw nothing. Removed `overflow-x-auto`
      from the `<ul>` entirely. Re-verified real headroom exists without
      it: content only needs ~855px of the ~953px available nav width at
      1440px viewport (previously assumed "0px slack" from comparing
      `ul.scrollWidth` to `navClientWidth` was a red herring — a
      `display:flex` block-level `<ul>` always reports its full container
      width via `scrollWidth`/`clientWidth` when content fits, regardless
      of actual slack; the real content-need figure is the sum of the
      `<li>` widths). Also trimmed nav padding/gap slightly further for
      genuine breathing room. Confirmed with a real screenshot (not just
      computed-style checks) that all 8 dropdown menus (About, UPSC,
      UPPCS, State PCS, Mentorship, More Programs, Resources, Admission)
      are now visibly rendered on click, plus zero page-level horizontal
      overflow on the full desktop/mobile sweep. Build clean, commit +
      push to `main`.

## Phase 11 — Swap director photo (user-provided file)
- [x] User pushed `SBSIR.jpeg` directly to `main` (a proper headshot of
      S.B. Shukla) and asked for it to replace the existing director photo
      site-wide, "renamed and placed properly" rather than left as a raw
      binary in the repo root. Uploaded it to the existing
      `csmp-ias/site` Cloudinary folder as `sb-shukla-director` (clean
      public_id, not the raw uploaded filename), updated both references
      (`components/home/about.tsx`, `app/directors-desk/page.tsx`),
      deleted the raw `SBSIR.jpeg` from the repo (assets live in
      Cloudinary here, never committed as binaries), and deleted the
      now-superseded old `Dr_-S_B_-Shukla-1` asset from Cloudinary since
      nothing referenced it anymore. Verified both pages render the new
      photo correctly via screenshot. Build clean, commit + push to
      `main`.

## Notes / decisions log
- After all 4 phase-agents merged, ran a full Playwright QA sweep (desktop
  1024/1280/1366/1440/1920, mobile 375) across every public page. Found the
  header caused **site-wide horizontal scroll** at common laptop widths
  (1440 was 319px too wide) — two root causes: (1) the desktop nav's 11
  top-level items didn't fit in the `max-w-7xl` header container, pushing
  the CTA button off-canvas since nothing could shrink/wrap; (2) mega-menu
  dropdown panels used `invisible`/`opacity-0` for the closed state, which
  (unlike `hidden`/`display:none`) still occupies layout space and
  contributes to `document.documentElement.scrollWidth` even when
  invisible — dropdowns anchored near the right edge extended past the
  viewport. Fixed: dropdowns now use `hidden` + `group-hover:block` /
  `group-focus-within:block` (zero layout footprint when closed); header
  container widened to `max-w-[100rem]`, nav padding/gaps tightened, and
  the single oversized label "Mentorship & Test Series" shortened to
  "Mentorship" (children/hrefs unchanged) so all 11 items fit with zero
  px to spare at 1440 — verified via direct DOM measurement, not just
  eyeballing. `ul` also keeps a `no-scrollbar overflow-x-auto` safety net
  so if this ever gets tight again (e.g. future nav additions) it scrolls
  *within itself* instead of ever blowing out page width again. Re-verified
  clean (`scrollW === clientW`) on every public page at 1024/1280/1366/
  1440/1920/375.
