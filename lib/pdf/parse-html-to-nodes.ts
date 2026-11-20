import { parseDocument } from "htmlparser2";
import type { ChildNode, Element } from "domhandler";

export type PdfTextRun = { text: string; bold: boolean; link?: string };

export type PdfNode =
  | { type: "heading"; level: 2 | 3; runs: PdfTextRun[] }
  | { type: "paragraph"; runs: PdfTextRun[] }
  | { type: "list"; ordered: boolean; items: PdfTextRun[][] }
  | { type: "blockquote"; runs: PdfTextRun[] }
  | { type: "image"; src: string };

function isElement(node: ChildNode): node is Element {
  return node.type === "tag";
}

function collectRuns(node: ChildNode, bold = false, link?: string): PdfTextRun[] {
  if (node.type === "text") {
    return node.data ? [{ text: node.data, bold, link }] : [];
  }
  if (!isElement(node)) return [];
  const tag = node.name.toLowerCase();
  if (tag === "br") return [{ text: "\n", bold, link }];
  const nextBold = bold || tag === "strong" || tag === "b";
  const nextLink = tag === "a" ? (node.attribs?.href ?? link) : link;
  return (node.children ?? []).flatMap((c) => collectRuns(c, nextBold, nextLink));
}

/** Converts TipTap-authored post HTML (p/h2/h3/ul/ol/blockquote/img + inline marks) into a flat node list for PDF rendering. */
export function parseHtmlToPdfNodes(html: string): PdfNode[] {
  const doc = parseDocument(html);
  const nodes: PdfNode[] = [];

  function walk(el: ChildNode) {
    if (!isElement(el)) return;
    const tag = el.name.toLowerCase();

    switch (tag) {
      case "h1":
      case "h2":
        nodes.push({ type: "heading", level: 2, runs: collectRuns(el) });
        return;
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        nodes.push({ type: "heading", level: 3, runs: collectRuns(el) });
        return;
      case "p": {
        const runs = collectRuns(el);
        if (runs.some((r) => r.text.trim())) nodes.push({ type: "paragraph", runs });
        return;
      }
      case "blockquote": {
        const runs = collectRuns(el);
        if (runs.some((r) => r.text.trim())) nodes.push({ type: "blockquote", runs });
        return;
      }
      case "ul":
      case "ol": {
        const items = (el.children ?? [])
          .filter((c): c is Element => isElement(c) && c.name.toLowerCase() === "li")
          .map((li) => collectRuns(li));
        if (items.length) nodes.push({ type: "list", ordered: tag === "ol", items });
        return;
      }
      case "img": {
        const src = el.attribs?.src;
        if (src) nodes.push({ type: "image", src });
        return;
      }
      case "script":
      case "style":
        return;
      default:
        (el.children ?? []).forEach(walk);
    }
  }

  doc.children.forEach(walk);
  return nodes;
}
