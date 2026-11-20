import path from "node:path";
import { Font } from "@react-pdf/renderer";

export const FONT_LATIN = "NotoSans";
export const FONT_DEVANAGARI = "NotoSansDevanagari";

const FONTS_DIR = path.join(process.cwd(), "lib/pdf/fonts");

let registered = false;

/**
 * Blog content mixes Latin and Devanagari script (Hindi terms/quotes in
 * otherwise-English posts). react-pdf has no automatic script fallback like
 * a browser does, so both scripts are registered as separate families and
 * text runs are split per-script at render time (see split-script.ts).
 */
export function registerPdfFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: FONT_LATIN,
    fonts: [
      { src: path.join(FONTS_DIR, "NotoSans-Regular.ttf"), fontWeight: "normal" },
      { src: path.join(FONTS_DIR, "NotoSans-Bold.ttf"), fontWeight: "bold" },
    ],
  });

  Font.register({
    family: FONT_DEVANAGARI,
    fonts: [
      { src: path.join(FONTS_DIR, "NotoSansDevanagari-Regular.ttf"), fontWeight: "normal" },
      { src: path.join(FONTS_DIR, "NotoSansDevanagari-Bold.ttf"), fontWeight: "bold" },
    ],
  });

  // react-pdf hyphenates by default (splits words at line-wrap points),
  // which mangles Devanagari conjuncts. A no-op hyphenation callback
  // disables it globally.
  Font.registerHyphenationCallback((word) => [word]);
}
