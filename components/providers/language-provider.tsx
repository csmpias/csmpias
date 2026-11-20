"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionary, type DictionaryKey } from "@/lib/i18n/dictionary";

type Language = "en" | "hi";

const STORAGE_KEY = "csmp-lang";

const LanguageContext = createContext<{
  lang: Language;
  toggle: () => void;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "hi") setLang(stored);
    } catch {
      // localStorage unavailable (private mode etc.) — stay on default
    }
  }, []);

  function toggle() {
    setLang((current) => {
      const next = current === "en" ? "hi" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }

  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>;
}

/** Reads chrome strings from the dictionary in the current language, falling back to English. */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  const lang = ctx?.lang ?? "en";
  function t(key: DictionaryKey): string {
    return dictionary[key][lang] ?? dictionary[key].en;
  }
  return { lang, toggle: ctx?.toggle ?? (() => {}), t };
}
