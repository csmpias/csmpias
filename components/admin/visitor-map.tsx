"use client";

import type { VisitorPoint } from "@/lib/queries";

// Equirectangular projection (1 SVG unit = 1 degree), so plotting a point is
// just x = lon + 180, y = 90 - lat — no map-projection library needed. No
// background world-map graphic (self-hosted, no external asset/API) — just
// dots against a plain lat/long grid, which is honest about what this is:
// a basic self-hosted visitor scatter, not a full mapping product.
export function VisitorMap({ points }: { points: VisitorPoint[] }) {
  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[4px] border border-rule bg-paper">
      <svg viewBox="0 0 360 180" className="absolute inset-0 h-full w-full" role="img" aria-label="Visitor locations">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 36} y1={0} x2={i * 36} y2={180} stroke="var(--color-rule)" strokeWidth={0.4} />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 36} x2={360} y2={i * 36} stroke="var(--color-rule)" strokeWidth={0.4} />
        ))}
        <line x1={180} y1={0} x2={180} y2={180} stroke="var(--color-rule)" strokeWidth={0.8} />
        <line x1={0} y1={90} x2={360} y2={90} stroke="var(--color-rule)" strokeWidth={0.8} />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.longitude + 180}
            cy={90 - p.latitude}
            r={2.4}
            fill="var(--color-accent)"
            fillOpacity={0.65}
            stroke="var(--color-paper)"
            strokeWidth={0.5}
          >
            <title>{p.location}</title>
          </circle>
        ))}
      </svg>
      {points.length === 0 ? (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-ink/50">
          No geolocated visits yet
        </p>
      ) : null}
    </div>
  );
}
