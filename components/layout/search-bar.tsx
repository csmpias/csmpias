"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fuzzySearch } from "@/lib/fuzzy-search";
import { SearchIcon, CloseIcon } from "@/components/ui/icons";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

type SearchIndexItem = {
  title: string;
  description?: string;
  href: string;
  group: string;
};

const CACHE_KEY = "csmp-search-index";
const CACHE_TTL_MS = 60 * 60 * 1000;
const MAX_RESULTS = 8;

type CachedIndex = { items: SearchIndexItem[]; fetchedAt: number };

function SearchResults({
  query,
  results,
  highlighted,
  onHover,
  onNavigate,
}: {
  query: string;
  results: SearchIndexItem[];
  highlighted: number;
  onHover: (index: number) => void;
  onNavigate: () => void;
}) {
  if (!query.trim()) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-96 overflow-y-auto rounded-[10px] border border-heading/10 bg-white py-2 shadow-[0_12px_32px_rgba(34,22,56,0.14)]">
      {results.length === 0 ? (
        <p className="px-4 py-3 text-sm text-muted">No matches for &quot;{query}&quot;</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={result.href}>
              <Link
                href={result.href}
                onClick={onNavigate}
                onMouseEnter={() => onHover(index)}
                className={cn("block px-4 py-2", index === highlighted && "bg-cream")}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-heading">{result.title}</span>
                  <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-wide text-brand">
                    {result.group}
                  </span>
                </div>
                {result.description && <p className="truncate text-xs text-muted">{result.description}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchIndexItem[]>([]);
  const [highlighted, setHighlighted] = useState(0);
  const hasLoaded = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  async function ensureIndexLoaded() {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    try {
      const cachedRaw = sessionStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as CachedIndex;
        if (Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
          setItems(cached.items);
          return;
        }
      }
    } catch {
      // sessionStorage unavailable (private mode etc.) — fall through to fetch
    }

    const res = await fetch("/api/search-index");
    if (!res.ok) return;
    const data = (await res.json()) as { items: SearchIndexItem[] };
    setItems(data.items);
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ items: data.items, fetchedAt: Date.now() }));
    } catch {
      // ignore quota errors (private mode, storage full)
    }
  }

  const results = query.trim()
    ? fuzzySearch(query, items, (item) => `${item.title} ${item.description ?? ""}`).slice(0, MAX_RESULTS)
    : [];

  useEffect(() => setHighlighted(0), [query]);

  useEffect(() => {
    if (!compact || !expanded) return;
    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [compact, expanded]);

  useEffect(() => {
    if (compact && expanded) inputRef.current?.focus();
  }, [compact, expanded]);

  function openAndLoad() {
    setExpanded(true);
    ensureIndexLoaded();
  }

  function reset() {
    setQuery("");
    setHighlighted(0);
    if (compact) setExpanded(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[highlighted] ?? results[0];
      if (target) {
        const href = target.href;
        reset();
        router.push(href);
      }
    } else if (event.key === "Escape") {
      reset();
      inputRef.current?.blur();
    }
  }

  if (compact) {
    return (
      <div ref={containerRef} className="relative hidden shrink-0 xl:block">
        <button
          type="button"
          onClick={openAndLoad}
          aria-label={t("search.label")}
          className={cn(
            "flex size-8 items-center justify-center rounded-[5px] border border-heading/15 text-heading hover:border-brand hover:text-brand",
            expanded && "invisible",
          )}
        >
          <SearchIcon className="size-4" />
        </button>

        {expanded && (
          <div className="absolute right-0 top-0 z-30 w-72 xl:w-80">
            <div className="flex items-center gap-2 rounded-[5px] border border-heading/15 bg-white px-3 py-2 shadow-[0_12px_32px_rgba(34,22,56,0.14)] focus-within:border-brand">
              <SearchIcon className="size-4 shrink-0 text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("search.placeholder")}
                className="w-full bg-transparent text-sm text-heading placeholder:text-muted focus:outline-none"
                aria-label="Site search"
              />
              <button
                type="button"
                onClick={reset}
                aria-label="Close search"
                className="shrink-0 text-muted hover:text-heading"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
            <SearchResults query={query} results={results} highlighted={highlighted} onHover={setHighlighted} onNavigate={reset} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center gap-2 rounded-[5px] border border-heading/15 bg-cream px-3 py-2 focus-within:border-brand">
        <SearchIcon className="size-4 shrink-0 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={openAndLoad}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("search.placeholder")}
          className="w-full bg-transparent text-sm text-heading placeholder:text-muted focus:outline-none"
          aria-label="Site search"
        />
      </div>
      <SearchResults query={query} results={results} highlighted={highlighted} onHover={setHighlighted} onNavigate={reset} />
    </div>
  );
}
