"use client";

import { useEffect, useState } from "react";

type DraftPreview = {
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  category: string | null;
};

// Deliberately outside the (dashboard) route group — no admin sidebar here,
// so this reads as close as possible to the real public article page.
// Reads the in-progress form state a same-origin tab wrote to
// sessionStorage right before opening this one; no save/reload round trip
// needed to see what an unsaved draft will look like.
export default function PostPreviewPage() {
  const [draft, setDraft] = useState<DraftPreview | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("csmp-post-preview");
      if (raw) setDraft(JSON.parse(raw) as DraftPreview);
    } catch {
      // ignore malformed/unavailable storage
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!draft) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="font-medium text-ink">No draft to preview.</p>
        <p className="mt-1 text-sm text-ink/60">
          Open this from the post editor's "Preview in new tab" button.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-rule bg-paper-dim px-6 py-2 text-center font-data text-[0.6875rem] uppercase tracking-[0.06em] text-ink/70">
        Preview — unsaved draft, not what's currently published
      </div>
      <article className="mx-auto max-w-3xl px-6 py-12">
        {draft.category ? (
          <p className="font-data text-xs uppercase tracking-[0.06em] text-accent">{draft.category}</p>
        ) : null}
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">{draft.title || "Untitled"}</h1>
        {draft.excerpt ? <p className="mt-4 text-lg text-ink/70">{draft.excerpt}</p> : null}
        {draft.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={draft.coverImageUrl}
            alt=""
            className="mt-6 aspect-video w-full rounded-[4px] border border-rule object-cover"
          />
        ) : null}
        <div
          className="prose-admin mt-8"
          dangerouslySetInnerHTML={{ __html: draft.content || "<p>Nothing written yet.</p>" }}
        />
      </article>
    </div>
  );
}
