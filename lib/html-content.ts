function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Seeds the TipTap editor when opening a legacy plain-text post: TipTap's
 * `content` prop is parsed as HTML, and a raw plain-text blob (paragraphs
 * separated by blank lines, per lib/post-content.ts) would collapse into a
 * single run-on paragraph — losing the paragraph/heading structure the
 * reader currently sees. Converts it to real <p>/<h2> tags first so editing
 * an old post starts from what's actually there.
 */
export function legacyTextToHtml(text: string): string {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return paragraphs
    .map((p) => {
      const isHeading = p.length <= 70 && p.split(/\s+/).length <= 12 && !/[.?!]$/.test(p) && !p.includes("\n");
      const tag = isHeading ? "h2" : "p";
      return `<${tag}>${escapeHtml(p)}</${tag}>`;
    })
    .join("\n");
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export type HtmlHeading = { id: string; text: string };

/**
 * Injects an `id` on every <h2>/<h3> in TipTap-authored HTML (it doesn't
 * add its own) so anchors and a table of contents work the same way they
 * do for the legacy plain-text posts (see lib/post-content.ts).
 */
export function addHeadingIds(html: string): string {
  const usedIds = new Set<string>();
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    if (/\bid\s*=/.test(attrs)) return match;
    const text = stripTags(inner);
    let id = slugifyHeading(text) || "section";
    let suffix = 2;
    while (usedIds.has(id)) id = `${slugifyHeading(text)}-${suffix++}`;
    usedIds.add(id);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

export function extractHtmlHeadings(htmlWithIds: string): HtmlHeading[] {
  const headings: HtmlHeading[] = [];
  const regex = /<h[23][^>]*\bid="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(htmlWithIds))) {
    headings.push({ id: match[1], text: stripTags(match[2]) });
  }
  return headings;
}
