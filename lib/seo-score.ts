// A deliberately basic, self-computed on-page checklist for content
// writers — not Google Search Console data, and not a real Rank Math/Yoast
// score. No focus-keyword/keyword-density checks on purpose: those ask a
// non-technical writer to reason about keyword placement, which is exactly
// the complexity this tool exists to avoid.

export type SeoBand = "red" | "amber" | "green";

export type SeoCheckId =
  | "titleLength"
  | "excerpt"
  | "coverImage"
  | "hasHeading"
  | "wordCount"
  | "imageAlt";

export type SeoCheck = {
  id: SeoCheckId;
  label: string;
  passed: boolean;
};

export type SeoScoreResult = {
  score: number;
  band: SeoBand;
  bandLabel: string;
  checks: SeoCheck[];
  isLegacy: boolean;
};

// Real long-form content already on this site averages ~1,600 words (min
// 643) across the 139 migrated posts — a generic 300-word blog-post bar
// would pass almost anything and tell writers nothing useful here.
export const MIN_WORD_COUNT = 800;

// Legacy content imported from the old site wasn't written with this
// scoring system in mind and would land at an alarming, meaningless low
// score under any ruleset built for the new editor. This baseline must stay
// the single source of truth — both the live editor panel and the posts
// listing page import it from here so the same post never shows two
// different numbers depending on which screen you're looking at.
export const LEGACY_BASELINE_SCORE = 84;

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, " ");
}

function countWords(html: string): number {
  const text = stripTags(html).replace(/&[a-z]+;|&#\d+;/gi, " ").trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function hasHeading(html: string): boolean {
  return /<h[1-6][\s>]/i.test(html);
}

/** An <img> with no alt attribute at all fails; alt="" (explicitly marked decorative) passes. */
function allImagesHaveAlt(html: string): boolean {
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  if (imgTags.length === 0) return true;
  return imgTags.every((tag) => /\balt\s*=\s*["'][^"']*["']/i.test(tag));
}

export function computeSeoChecks(input: {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
}): SeoCheck[] {
  const titleLength = input.title.trim().length;
  const excerptLength = input.excerpt.trim().length;
  const wordCount = countWords(input.content);

  return [
    { id: "titleLength", label: "Title is 30–60 characters", passed: titleLength >= 30 && titleLength <= 60 },
    { id: "excerpt", label: "Excerpt present, 50–160 characters", passed: excerptLength >= 50 && excerptLength <= 160 },
    { id: "coverImage", label: "Has a cover image", passed: Boolean(input.coverImageUrl) },
    { id: "hasHeading", label: "Has at least one heading", passed: hasHeading(input.content) },
    { id: "wordCount", label: `Meets minimum length (${MIN_WORD_COUNT}+ words)`, passed: wordCount >= MIN_WORD_COUNT },
    { id: "imageAlt", label: "All images have alt text", passed: allImagesHaveAlt(input.content) },
  ];
}

export function bandForScore(score: number): { band: SeoBand; label: string } {
  if (score >= 80) return { band: "green", label: "Good" };
  if (score >= 50) return { band: "amber", label: "Needs Work" };
  return { band: "red", label: "Poor" };
}

export function getSeoScore(input: {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  isLegacy: boolean;
}): SeoScoreResult {
  if (input.isLegacy) {
    const { band, label } = bandForScore(LEGACY_BASELINE_SCORE);
    return { score: LEGACY_BASELINE_SCORE, band, bandLabel: label, checks: [], isLegacy: true };
  }

  const checks = computeSeoChecks(input);
  const score = Math.round((checks.filter((c) => c.passed).length / checks.length) * 100);
  const { band, label } = bandForScore(score);
  return { score, band, bandLabel: label, checks, isLegacy: false };
}
