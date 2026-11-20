export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  children?: NavGroup[];
};

export const siteConfig = {
  name: "CSMP IAS",
  legalName: "CSMP IAS Coaching Institute",
  tagline: "Best IAS, UPPCS & BPSC Coaching Institute in Lucknow",
  established: 2021,
  url: "https://csmpias.com",
  description:
    "CSMP IAS is one of the best IAS, UPPCS and BPSC coaching institutes in Lucknow, led by S.B. Shukla Sir — offering Foundation, Prelims, Mains, Mentorship and Test Series courses plus free UPSC/UPPCS/BPSC study resources, PYQs and daily current affairs, for aspirants across Lucknow, Sitapur, Kanpur, Hardoi and the LDA Colony area.",
  phone: "+91 8887039761",
  phoneHref: "tel:+918887039761",
  whatsappNumber: "918887039761",
  email: "contact@csmpias.com",
  emailHref: "mailto:contact@csmpias.com",
  address: {
    line1: "3/186, Vivek Khand 3",
    line2: "Gomti Nagar",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "IN",
    postalCode: "226010",
    full: "3/186, Vivek Khand 3, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    // Approximate coordinates for Vivek Khand, Gomti Nagar, Lucknow — used
    // for the LocalBusiness geo schema. Replace with the exact pin from
    // Google Business Profile if it differs.
    geo: { latitude: 26.8503, longitude: 81.0088 },
  },
  // Nearby towns/localities the institute markets to and enrolls students
  // from via online batches, in addition to the physical Gomti Nagar
  // center — drives the LocalBusiness `areaServed` schema and local-SEO copy.
  areasServed: ["Gomti Nagar", "Lucknow", "Sitapur", "Kanpur", "Hardoi", "LDA Colony"],
  social: {
    // Only accounts with a real, confirmed URL are listed here — the
    // source WordPress site's LinkedIn/Snapchat/Twitter icons were
    // unconfigured placeholders (no href), so they're deliberately left
    // out rather than linking nowhere.
    facebook: "https://www.facebook.com/csmpias/",
    youtube: "https://www.youtube.com/@csmpias-b6w",
    instagram: "https://www.instagram.com/csmpias_/",
  },
  // Resolved once via the channel's public RSS feed (no API key needed) —
  // see components/home/youtube-feed.tsx.
  youtubeChannelId: "UCCRjLzSjvIEjFCAeLtlp3ow",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=CSMP%20IAS%2C%203%2F186%2C%20Vivek%20Khand%203%2C%20Gomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh%20226010&t=m&z=15&output=embed&iwloc=near",
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=CSMP+IAS+Gomti+Nagar+Lucknow",
} as const;

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Primary navigation, flattened from the legacy 4-level WordPress mega-menu
 * into a maximum of 3 levels for an accessible mega-menu / mobile accordion.
 */
export const primaryNav: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  {
    label: "About",
    children: [
      { label: "About Coaching", href: "/about-coaching" },
      { label: "Director's Desk", href: "/directors-desk" },
    ],
  },
  {
    // Children populated entirely from the courses table (every active
    // course with exam_type "UPSC") — see lib/nav.ts buildNav(). A
    // hand-maintained list here previously drifted from what actually
    // existed (e.g. a new course never got added), same failure mode as
    // the blog category filter fixed earlier — so there's nothing to
    // maintain here now.
    label: "UPSC",
    children: [],
  },
  {
    label: "UPPCS",
    children: [],
  },
  {
    // Children populated entirely from the courses table (every active
    // course with exam_type "PCS-J") — see lib/nav.ts buildNav(). Judicial
    // Services (Civil Judge via PCS-J, and APO) is a distinct UPPSC exam
    // track from general UPPCS, so it gets its own dropdown rather than
    // being folded into the UPPCS menu.
    label: "PCS-J & APO",
    children: [],
  },
  {
    label: "State PCS",
    children: [
      // Static state hub pages, kept as-is; buildNav() appends each
      // state's actual courses (BPSC/UKPSC/MPPSC exam_type) below these.
      { label: "BPSC", href: "/courses/state-pcs/bpsc" },
      { label: "UKPSC", href: "/courses/state-pcs/ukpsc" },
      { label: "MPPSC", href: "/courses/state-pcs/mppsc" },
    ],
  },
  {
    label: "Mentorship",
    children: [
      { label: "Mentorship Programs", href: "/mentorship-program" },
      { label: "Prelims Test Series", href: "/test-series/prelims" },
      { label: "Mains Test Series", href: "/test-series/mains" },
      { label: "CSAT Test Series", href: "/test-series/csat" },
      { label: "Essay Test Series", href: "/test-series/essay" },
    ],
  },
  {
    label: "More Programs",
    children: [
      { label: "Online Batches", href: "/online-batches" },
      { label: "Optional Subjects", href: "/optional-subjects" },
      { label: "Interview Guidance", href: "/interview-guidance-program" },
    ],
  },
  // Labeled "Blog" in the nav to match the admin dashboard's "Blog Posts"
  // section (same underlying `posts` table/page) — having both a
  // "Current Affairs" and a separate "Blog" link to the identical
  // destination was confusing, so this is the one entry point now.
  { label: "Blog", href: "/current-affairs" },
  { label: "Quiz", href: "/quiz" },
  {
    label: "Resources",
    children: [
      { label: "Resources Hub", href: "/resources" },
      { label: "Mock Tests", href: "/resources/mock-tests" },
      { label: "Previous Year Questions", href: "/resources/pyqs" },
      { label: "Daily Current Affairs Sheets", href: "/resources/daily-sheets" },
      { label: "Syllabus", href: "/resources/syllabus" },
      { label: "Study Materials", href: "/resources/study-materials" },
      { label: "Essay", href: "/resources/essay" },
      { label: "FAQs & Preparation Tips", href: "/faqs-preparation-tips" },
    ],
  },
  {
    label: "Admission",
    children: [
      { label: "Batch Details", href: "/batch-details" },
      { label: "Fee Details", href: "/fee-details" },
      { label: "Apply Now", href: "/apply-now" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerCourseLinks: NavLink[] = [
  { label: "Assured Prelims Programme (UPPCS 2026)", href: "/assured-prelims-programme-uppcs-2026" },
  { label: "UPSC Foundation Course", href: "/courses/upsc/foundation" },
  { label: "UPSC GS 2-Year Foundation Course (CSE 2028)", href: "/courses/upsc/2-year-foundation" },
  { label: "BA to Bureaucracy (3-Year Program)", href: "/courses/upsc/ba-to-bureaucracy" },
  { label: "UPPCS Foundation Course", href: "/courses/uppcs/foundation" },
  { label: "UPPCS Prelims Mentorship Programme (2026)", href: "/courses/uppcs/prelims-mentorship-2026" },
  { label: "Online Batches", href: "/online-batches" },
  { label: "Optional Subjects", href: "/optional-subjects" },
  { label: "Interview Guidance Program", href: "/interview-guidance-program" },
  { label: "Mentorship Programs", href: "/mentorship-program" },
];

export const footerResourceLinks: NavLink[] = [
  { label: "Study Materials", href: "/resources/study-materials" },
  { label: "Syllabus (UPSC / UPPCS)", href: "/resources/syllabus" },
  { label: "Previous Year Question Papers", href: "/resources/pyqs" },
  { label: "Daily Current Affairs Sheets", href: "/resources/daily-sheets" },
  { label: "FAQs & Preparation Tips", href: "/faqs-preparation-tips" },
];

// A modest, hand-picked set of high-intent search phrases (from actual
// searcher language, not just page names) linked to their best-matching
// page — visible text + real internal links, unlike an invisible meta
// keywords tag, so it's one of the few footer additions that can
// actually move organic rankings rather than just look like SEO effort.
export const popularSearchLinks: NavLink[] = [
  { label: "UPPCS Coaching in Lucknow", href: "/courses" },
  { label: "Best UPPCS Foundation Course in Lucknow", href: "/courses/uppcs/foundation" },
  { label: "UPPCS Prelims Coaching", href: "/courses/uppcs/prelims" },
  { label: "UPPCS Mains Coaching", href: "/courses/uppcs/mains" },
  { label: "UPPCS Prelims Mentorship Programme 2027", href: "/courses/uppcs/prelims-mentorship-2026" },
  { label: "UPPCS Test Series 2026", href: "/uppcs-test-series-2026" },
  { label: "UPPCS CSAT Batch", href: "/courses/uppcs/csat" },
  { label: "Assured Prelims Programme UPPCS 2026", href: "/assured-prelims-programme-uppcs-2026" },
  { label: "UPSC Foundation Course in Lucknow", href: "/courses/upsc/foundation" },
  { label: "Best IAS Coaching in Lucknow", href: "/courses" },
  { label: "BPSC Mentorship Programme", href: "/72th-bpsc-integrated-mentorship-2026" },
  { label: "UPPCS Coaching for Working Professionals", href: "/uppcs-working-professionals" },
  { label: "UPPCS Online Coaching", href: "/online-batches" },
  { label: "UPPCS Coaching Near Me", href: "/contact-us" },
];

export const footerCurrentAffairsLinks: NavLink[] = [
  { label: "All Current Affairs", href: "/current-affairs" },
  { label: "Daily Updates", href: "/current-affairs/category/daily-updates" },
  { label: "Compilations", href: "/current-affairs/category/compilations" },
  { label: "State Specific (UP)", href: "/current-affairs/category/state-specific" },
  { label: "Editorial", href: "/current-affairs/category/editorial" },
];

export const footerUsefulLinks: NavLink[] = [
  { label: "About Coaching", href: "/about-coaching" },
  { label: "Director's Desk", href: "/directors-desk" },
  { label: "Batch Details", href: "/batch-details" },
  { label: "Fee Details", href: "/fee-details" },
  { label: "Apply Now", href: "/apply-now" },
  { label: "Contact Us", href: "/contact-us" },
];

export const primaryCta = { label: "Apply Now", href: "/apply-now" };
