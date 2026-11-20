export type PostBlock =
  | { type: "heading"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "timeline-entry"; date: string; text: string };

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const MONTH_NAMES =
  "January|February|March|April|May|June|July|August|September|October|November|December";
// A bare year ("2014") or month/day-year ("August 2024", "5 June 2026") is a
// timeline marker in the source content, not a real section topic — but it
// still passes the short/unpunctuated heading-candidate check below, so on
// its own it renders as an oversized bold heading holding nothing but a
// date. Caught separately so it can be folded into the entry it labels.
const DATE_ONLY_RE = new RegExp(
  `^(\\d{4}|(${MONTH_NAMES})\\s+\\d{4}|\\d{1,2}(st|nd|rd|th)?\\s+(${MONTH_NAMES})\\s+\\d{4})$`,
);

/**
 * The migrated post content is plain text (paragraphs separated by blank
 * lines) rather than structured HTML/markdown headings. Short, unpunctuated
 * lines are treated as inferred subheadings so a table of contents can still
 * be built without a full content re-migration.
 */
export function parsePostContent(content: string): PostBlock[] {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    // A handful of legacy_text posts carry raw markdown syntax left over
    // from an AI-authoring/import step that predates this plain-text
    // rendering path (which never interprets markdown). A lone "#" is a
    // stray, contentless heading marker — drop it rather than rendering it
    // as a heading whose text is literally "#". A leading "* " is a literal
    // markdown bullet marker; strip it so the line reads as normal text
    // instead of a paragraph that visibly starts with an asterisk.
    .filter((p) => p.length > 0 && !/^#+$/.test(p))
    .map((p) => p.replace(/^\*\s+/, ""));
  const usedIds = new Set<string>();

  const candidates = paragraphs.map((text) => ({
    text,
    isHeadingCandidate:
      text.length <= 70 &&
      text.split(/\s+/).length <= 12 &&
      !/[.?!]$/.test(text) &&
      !text.includes("\n"),
  }));

  // A source table/stat-grid flattened into plain text (no markup survives
  // the migration) produces a run of short, unpunctuated "paragraphs" in a
  // row — e.g. "Article" / "Subject Matter" / "153" / "Governor of a state"
  // / "154" / ... — which the check above can't tell apart from a real
  // heading in isolation. Two or more of these back-to-back is never real
  // prose: a real article has substantial paragraph text between headings,
  // never one heading immediately followed by another. Group the whole run
  // into a single compact list block instead of individual headings/
  // paragraphs, so it reads as one grouped table-like fragment rather than
  // a wall of oversized bold headings or loosely spaced one-line paragraphs
  // — most jarring on mobile, where each one-line "heading" fills the
  // narrow viewport.
  const runs: Array<{ start: number; end: number }> = [];
  let runStart = -1;
  for (let i = 0; i <= candidates.length; i++) {
    const isCandidate = i < candidates.length && candidates[i].isHeadingCandidate;
    if (isCandidate) {
      if (runStart === -1) runStart = i;
    } else {
      if (runStart !== -1 && i - runStart >= 2) {
        runs.push({ start: runStart, end: i });
      }
      runStart = -1;
    }
  }
  const runForIndex = new Map<number, { start: number; end: number }>();
  for (const run of runs) runForIndex.set(run.start, run);
  const inRun = new Array(candidates.length).fill(false);
  for (const run of runs) for (let j = run.start; j < run.end; j++) inRun[j] = true;

  const blocks: PostBlock[] = [];
  for (let i = 0; i < candidates.length; i++) {
    const run = runForIndex.get(i);
    if (run) {
      blocks.push({ type: "list", items: candidates.slice(run.start, run.end).map((c) => c.text) });
      i = run.end - 1;
      continue;
    }

    const { text, isHeadingCandidate } = candidates[i];
    const next = candidates[i + 1];
    if (isHeadingCandidate && !inRun[i] && DATE_ONLY_RE.test(text) && next && !next.isHeadingCandidate) {
      blocks.push({ type: "timeline-entry", date: text, text: next.text });
      i += 1;
      continue;
    }

    if (isHeadingCandidate && !inRun[i]) {
      let id = slugifyHeading(text) || "section";
      let suffix = 2;
      while (usedIds.has(id)) {
        id = `${slugifyHeading(text)}-${suffix++}`;
      }
      usedIds.add(id);
      blocks.push({ type: "heading", text, id });
    } else {
      blocks.push({ type: "paragraph", text });
    }
  }

  return blocks;
}

export function extractHeadings(blocks: PostBlock[]) {
  return blocks.filter((b): b is Extract<PostBlock, { type: "heading" }> => b.type === "heading");
}
