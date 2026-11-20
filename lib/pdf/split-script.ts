const DEVANAGARI_RUN = /[ऀ-ॿ]+|[^ऀ-ॿ]+/g;

/** Splits text into script-homogeneous chunks so each can be rendered in the matching font. */
export function splitByScript(text: string): { text: string; devanagari: boolean }[] {
  const matches = text.match(DEVANAGARI_RUN);
  if (!matches) return [];
  return matches.map((chunk) => ({ text: chunk, devanagari: /[ऀ-ॿ]/.test(chunk) }));
}
