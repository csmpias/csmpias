import type { PostBlock } from "@/lib/post-content";
import type { PdfNode } from "./parse-html-to-nodes";

/** Converts the plain-text-derived heading/paragraph blocks (legacy posts) into the same node shape the HTML parser produces. */
export function legacyBlocksToPdfNodes(blocks: PostBlock[]): PdfNode[] {
  return blocks.map((block) => {
    if (block.type === "heading") {
      return { type: "heading", level: 2, runs: [{ text: block.text, bold: false }] };
    }
    if (block.type === "list") {
      return {
        type: "list",
        ordered: false,
        items: block.items.map((text) => [{ text, bold: false }]),
      };
    }
    if (block.type === "timeline-entry") {
      return {
        type: "paragraph",
        runs: [
          { text: `${block.date} — `, bold: true },
          { text: block.text, bold: false },
        ],
      };
    }
    return { type: "paragraph", runs: [{ text: block.text, bold: false }] };
  });
}
