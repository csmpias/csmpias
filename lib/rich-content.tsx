/**
 * A small, dependency-free markdown-like renderer for CMS `content` fields
 * (courses, posts). Supports just enough structure for well-formatted course
 * pages — headings, lists, tables, callouts, fact boxes, and YouTube embeds —
 * without pulling in a markdown library or allowing raw HTML injection.
 *
 * Supported syntax (see /admin course editor hint text):
 *   # Heading                  -> top-level heading (largest)
 *   ## Heading                 -> large section heading
 *   ### Subheading             -> smaller subheading
 *   - item / * item            -> bullet list
 *   > quoted text              -> callout box
 *   | a | b |                  -> GFM-style table (needs a |---|---| separator row)
 *   ```youtube
 *   VIDEO_ID_OR_URL
 *   ```                        -> embedded YouTube player
 *   ```box
 *   Label: Value
 *   Label: Value
 *   ```                        -> inline grid of highlighted fact/date cards
 *                                  (a label on its own line followed by the
 *                                  value on the next line also works, if a
 *                                  line has no colon)
 *   ```flowchart
 *   > Branch Name
 *   Label: Value
 *   Label: Value
 *   > Another Branch
 *   Label: Value
 *   ```                        -> top-down flowchart: a root node branching
 *                                  into each `> Branch Name`, with that
 *                                  branch's `Label: Value` lines as boxes
 *                                  underneath (e.g. Online/Offline pricing)
 *   ---                        -> divider
 *   **bold** __underline__ ==highlight== _italic_ ~~strikethrough~~   -> inline formatting
 *   [link text](https://example.com)                -> link (opens in a new tab)
 *
 *   ~~strikethrough~~ is meant for a crossed-out original price right next
 *   to the discounted one, e.g. ~~Rs. 49,000~~ **Rs. 35,000** (offer price).
 */

import { extractYouTubeId } from "@/lib/youtube";
import { cn } from "@/lib/utils";

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  // Capture groups by position (no named groups, for ES2017 target):
  // 1=bold 2=underline 3=mark 4=italic 5=linkText 6=linkHref 7=strikethrough
  const pattern = /\*\*(.+?)\*\*|__(.+?)__|==(.+?)==|_(.+?)_|\[([^\]]+)\]\((\S+?)\)|~~(.+?)~~/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, bold, underline, mark, italic, linkText, linkHref, strike] = match;
    const key = `${keyPrefix}-${i++}`;
    if (bold !== undefined) {
      nodes.push(
        <strong key={key} className="font-semibold text-heading">
          {bold}
        </strong>,
      );
    } else if (underline !== undefined) {
      nodes.push(
        <span key={key} className="underline decoration-brand decoration-2 underline-offset-2">
          {underline}
        </span>,
      );
    } else if (mark !== undefined) {
      nodes.push(
        <mark key={key} className="rounded-[3px] bg-brand-cta/50 px-1 py-0.5 font-semibold text-heading">
          {mark}
        </mark>,
      );
    } else if (italic !== undefined) {
      nodes.push(
        <em key={key} className="italic">
          {italic}
        </em>,
      );
    } else if (linkText !== undefined) {
      nodes.push(
        <a
          key={key}
          href={linkHref}
          target={linkHref.startsWith("http") ? "_blank" : undefined}
          rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="font-semibold text-brand underline decoration-brand/40 underline-offset-2 hover:decoration-brand"
        >
          {linkText}
        </a>,
      );
    } else if (strike !== undefined) {
      // For a crossed-out original price next to a discounted one, e.g.
      // ~~Rs. 49,000~~ **Rs. 35,000**.
      nodes.push(
        <del key={key} className="text-muted/70 decoration-2">
          {strike}
        </del>,
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

// h2, not h1: the page itself already has an <h1> for the resource/course
// title (via PageHeader) — a "# " line in content is a sub-section, just a
// more prominent one than "## ", so it stays one level below the page title.
function MainHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 font-display text-2xl font-bold text-heading first:mt-0 sm:text-3xl">{children}</h2>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 font-display text-xl font-bold text-heading first:mt-0 sm:text-2xl">{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-7 font-display text-[1.0625rem] font-bold text-heading">{children}</h3>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[0.9375rem] leading-[1.75] text-muted sm:text-[1.0625rem]">{children}</p>;
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 grid gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-[0.9375rem] leading-[1.65] text-muted sm:text-[1.0625rem]">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-6 rounded-[10px] border-l-4 border-brand bg-cream px-5 py-4 text-[0.9375rem] italic leading-[1.7] text-heading sm:text-[1.0625rem]">
      {children}
    </blockquote>
  );
}

function Divider() {
  return <hr className="mt-8 border-heading/10" />;
}

function RichTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-[10px] border border-heading/10">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm sm:text-[0.9375rem]">
        <thead>
          <tr className="bg-brand text-white">
            {head.map((cell, i) => (
              <th key={i} className="px-4 py-3 font-bold">
                {renderInline(cell, `th-${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-cream"}>
              {row.map((cell, ci) => (
                <td key={ci} className="border-t border-heading/10 px-4 py-3 font-semibold text-heading">
                  {renderInline(cell, `td-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FactBoxGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-[10px] border border-heading/10 bg-cream px-5 py-4">
          <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">{item.label}</dt>
          <dd className="mt-1.5 font-body text-[0.9375rem] font-bold leading-snug tracking-tight text-heading">
            {renderInline(item.value, `fb-${i}`)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type FlowchartBranch = { title: string; items: { label: string; value: string }[] };

function FlowchartDiagram({ branches }: { branches: FlowchartBranch[] }) {
  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="rounded-[10px] border-2 border-brand bg-brand px-5 py-2.5 text-center font-display text-sm font-bold text-white shadow-sm sm:text-base">
        Choose Your Mode
      </div>
      <div className="h-6 w-0.5 shrink-0 bg-heading/20" aria-hidden />

      <div className={cn("grid w-full gap-x-8 gap-y-8", branches.length > 1 && "sm:grid-cols-2")}>
        {branches.map((branch, bi) => (
          <div key={branch.title + bi} className="flex flex-col items-center">
            <div className="rounded-[10px] border border-heading/15 bg-cream px-5 py-2 text-center font-display text-sm font-bold uppercase tracking-[0.04em] text-heading">
              {branch.title}
            </div>
            <div className="h-6 w-0.5 shrink-0 bg-heading/20" aria-hidden />
            <div className="flex w-full flex-col gap-3">
              {branch.items.map((item, ii) => (
                <div
                  key={item.label + ii}
                  className="rounded-[10px] border border-heading/10 bg-white px-4 py-3 text-center shadow-[0_2px_10px_rgba(34,22,56,0.06)]"
                >
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">{item.label}</p>
                  <p className="mt-1 font-body text-lg font-extrabold tracking-tight text-heading">
                    {renderInline(item.value, `fc-${bi}-${ii}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="mt-6 aspect-video w-full overflow-hidden rounded-[10px] border border-heading/10 shadow-[0_4px_24px_rgba(34,22,56,0.08)]">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Course video"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

const TABLE_SEPARATOR = /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/;

/**
 * Parses ```box`/`flowchart` fenced-block lines into label/value pairs.
 * Accepts the documented "Label: Value" single-line form, and also pairs
 * up two consecutive lines ("Label" then "Value") when a line has no
 * colon — a natural way to type it that used to silently produce zero
 * items (and make the whole block vanish) instead of rendering anything.
 * Also tolerates a stray leading "- "/"* " bullet marker on any line.
 */
function parseLabelValuePairs(rawLines: string[]): { label: string; value: string }[] {
  const items: { label: string; value: string }[] = [];
  let pendingLabel: string | null = null;

  for (const raw of rawLines) {
    const line = raw.trim().replace(/^[-*]\s+/, "");
    if (!line) continue;

    if (line.includes(":")) {
      const [label, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      if (label.trim() && value) {
        items.push({ label: label.trim(), value });
        pendingLabel = null;
        continue;
      }
    }

    if (pendingLabel) {
      items.push({ label: pendingLabel, value: line });
      pendingLabel = null;
    } else {
      pendingLabel = line;
    }
  }

  return items;
}

/** A fenced block that failed to parse renders as plain text instead of disappearing, so a syntax mistake never loses content outright. */
function fallbackLines(rawLines: string[], keyOffset: number): React.ReactNode[] {
  const text = rawLines
    .map((l) => l.trim())
    .filter(Boolean)
    .join(" ");
  return text ? [<Paragraph key={`fallback-${keyOffset}`}>{text}</Paragraph>] : [];
}

export function renderRichContent(raw: string | null | undefined): React.ReactNode {
  if (!raw || !raw.trim()) return null;

  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    // Fenced code blocks: ```youtube or ```box
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim().toLowerCase();
      const bodyLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "```") {
        bodyLines.push(lines[i]);
        i++;
      }
      i++; // skip closing fence

      if (lang === "youtube") {
        const videoId = extractYouTubeId(bodyLines.join(" ").trim());
        if (videoId) blocks.push(<VideoEmbed key={key++} videoId={videoId} />);
      } else if (lang === "box") {
        const items = parseLabelValuePairs(bodyLines);
        if (items.length) {
          blocks.push(<FactBoxGrid key={key++} items={items} />);
        } else {
          // Never let a fenced block that failed to parse just disappear —
          // fall back to showing whatever was typed as plain text, so a
          // syntax mistake loses formatting, not the content itself.
          blocks.push(...fallbackLines(bodyLines, key));
          key += 1;
        }
      } else if (lang === "flowchart") {
        const branches: FlowchartBranch[] = [];
        for (const rawLine of bodyLines) {
          const l = rawLine.trim();
          if (!l) continue;
          if (l.startsWith("> ")) {
            branches.push({ title: l.slice(2).trim(), items: [] });
          }
        }
        // Re-parse each branch's own line range for Label: Value pairs
        // (including the two-line "Label" / "Value" fallback format).
        let currentBranch = -1;
        let pendingLines: string[] = [];
        const flushPending = () => {
          if (currentBranch >= 0) branches[currentBranch].items.push(...parseLabelValuePairs(pendingLines));
          pendingLines = [];
        };
        for (const rawLine of bodyLines) {
          const l = rawLine.trim();
          if (!l) continue;
          if (l.startsWith("> ")) {
            flushPending();
            currentBranch++;
            continue;
          }
          pendingLines.push(l);
        }
        flushPending();
        const validBranches = branches.filter((b) => b.items.length > 0);
        if (validBranches.length) {
          blocks.push(<FlowchartDiagram key={key++} branches={validBranches} />);
        } else {
          blocks.push(...fallbackLines(bodyLines, key));
          key += 1;
        }
      }
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      blocks.push(<SubHeading key={key++}>{renderInline(trimmed.slice(4), `h3-${key}`)}</SubHeading>);
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push(<SectionHeading key={key++}>{renderInline(trimmed.slice(3), `h2-${key}`)}</SectionHeading>);
      i++;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      blocks.push(<MainHeading key={key++}>{renderInline(trimmed.slice(2), `h1-${key}`)}</MainHeading>);
      i++;
      continue;
    }

    // Divider
    if (/^-{3,}$/.test(trimmed)) {
      blocks.push(<Divider key={key++} />);
      i++;
      continue;
    }

    // Table: current line + next line must be a separator row
    if (trimmed.startsWith("|") && i + 1 < lines.length && TABLE_SEPARATOR.test(lines[i + 1].trim())) {
      const head = splitTableRow(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push(<RichTable key={key++} head={head} rows={rows} />);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const text = quoteLines.join(" ");
      blocks.push(<Callout key={key++}>{renderInline(text, `q-${key}`)}</Callout>);
      continue;
    }

    // Bullet list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^[-*]\s+/, "");
        items.push(renderInline(itemText, `li-${key}-${items.length}`));
        i++;
      }
      blocks.push(<BulletList key={key++} items={items} />);
      continue;
    }

    // Paragraph: gather consecutive non-blank, non-special lines. The
    // current line fell through every block check above (including cases
    // like a malformed `|` table row or a stray `#`/`>` that didn't match
    // the exact block syntax) — it must still be consumed as plain text,
    // or `i` never advances and the outer loop spins forever on it.
    const paraLines: string[] = [lines[i].trim()];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("|") &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^-{3,}$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push(<Paragraph key={key++}>{renderInline(paraLines.join(" "), `p-${key}`)}</Paragraph>);
  }

  return blocks;
}
