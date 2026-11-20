/**
 * Minimal fzf-style fuzzy matcher: a subsequence test plus a scoring
 * heuristic (contiguous runs, start/word-boundary bonuses, length penalty).
 * Not a port of fzf's algorithm, just the same spirit, dependency-free.
 */

function score(query: string, target: string): number | null {
  if (!query) return 0;

  let queryIndex = 0;
  let runLength = 0;
  let total = 0;
  let firstMatchIndex = -1;

  for (let i = 0; i < target.length && queryIndex < query.length; i++) {
    if (target[i] !== query[queryIndex]) {
      runLength = 0;
      continue;
    }

    if (firstMatchIndex === -1) firstMatchIndex = i;

    const prevChar = target[i - 1];
    const atBoundary = i === 0 || prevChar === " " || prevChar === "-" || prevChar === "/";

    runLength += 1;
    total += 10; // base credit per matched character
    total += Math.min(runLength, 8) * 6; // reward consecutive runs, capped
    if (atBoundary) total += 15;

    queryIndex += 1;
  }

  if (queryIndex < query.length) return null; // not every query char found in order

  total += Math.max(0, 10 - firstMatchIndex); // earlier first match is better
  total -= Math.min(target.length, 60) * 0.3; // tighter/shorter targets edge out noisy ones

  return total;
}

export function fuzzySearch<T>(query: string, items: T[], getText: (item: T) => string): T[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const scored: { item: T; score: number }[] = [];
  for (const item of items) {
    const s = score(trimmed, getText(item).toLowerCase());
    if (s !== null) scored.push({ item, score: s });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((entry) => entry.item);
}
