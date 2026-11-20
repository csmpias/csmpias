"use client";

import dynamic from "next/dynamic";
import type { VisitorPoint } from "@/lib/queries";

// next/dynamic's ssr:false is only usable from a Client Component, so this
// thin wrapper exists purely to keep the map out of the server render.
const VisitorMap = dynamic(() => import("@/components/admin/visitor-map").then((m) => m.VisitorMap), {
  ssr: false,
  loading: () => <div className="aspect-[2/1] w-full animate-pulse rounded-[4px] border border-rule bg-paper-dim" />,
});

export function VisitorMapLoader({ points }: { points: VisitorPoint[] }) {
  return <VisitorMap points={points} />;
}
