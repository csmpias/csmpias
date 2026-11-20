"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { EyeIcon } from "@/components/ui/icons";

export function PostViewCounter({
  postId,
  slug,
  initialCount,
}: {
  postId: string;
  slug: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;

    const supabase = createClient();

    // Counts this visit once (guarded above against React StrictMode's
    // double-invoke in dev), then subscribes so every other open reader's
    // counter updates live as new views come in.
    supabase.rpc("increment_post_view", { p_slug: slug }).then(({ data }) => {
      if (typeof data === "number") setCount(data);
      // bigint RPC returns are serialized as strings over the REST API —
      // never trust `typeof x === "number"` here.
      else if (data != null) setCount(Number(data));
    });

    const channel = supabase
      .channel(`post-views-${postId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_view_counts", filter: `post_id=eq.${postId}` },
        (payload) => {
          const next = (payload.new as { view_count?: unknown } | null)?.view_count;
          if (next != null) setCount(Number(next));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, slug]);

  return (
    <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-muted">
      <EyeIcon className="size-3.5" />
      {count.toLocaleString("en-IN")} views
    </span>
  );
}
