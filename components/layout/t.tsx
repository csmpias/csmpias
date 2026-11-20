"use client";

import { useLanguage } from "@/components/providers/language-provider";
import type { DictionaryKey } from "@/lib/i18n/dictionary";

/** Drop-in translated text node — usable inside Server Components without converting them to client. */
export function T({ k }: { k: DictionaryKey }) {
  const { t } = useLanguage();
  return <>{t(k)}</>;
}
