"use client";

import Image from "next/image";
import { renderRichContent } from "@/lib/rich-content";
import { cn } from "@/lib/utils";
import type { CourseResourceFile } from "@/lib/types";

// Same fallback as the real course page (components/courses/course-detail.tsx)
// — a lecture-hall/podium photo — so the preview matches what a course with
// no cover image actually looks like live.
const FALLBACK_COVER_IMAGE = "/about-coaching-hero.webp";

export function CoursePreviewPanel({
  name,
  examType,
  description,
  content,
  coverImageUrl,
  resourceFiles,
}: {
  name: string;
  examType: string;
  description: string;
  content: string;
  coverImageUrl: string | null;
  resourceFiles: CourseResourceFile[];
}) {
  const richContent = renderRichContent(content);

  return (
    <div className="sticky top-6 flex flex-col gap-2">
      <p className="font-data text-[0.6875rem] uppercase tracking-[0.06em] text-ink/60">
        Live Preview — how this looks on the course page
      </p>
      {/* A fixed-height scrollable box (not the full page) so this stays a
          compact side panel regardless of how long the content is. */}
      <div className="max-h-[42rem] overflow-y-auto rounded-[4px] border border-rule bg-white [overscroll-behavior:contain]">
        <div className={cn("relative aspect-[16/9] w-full overflow-hidden", coverImageUrl ? "bg-cream" : undefined)}>
          <Image
            src={coverImageUrl || FALLBACK_COVER_IMAGE}
            alt={name || "Course cover"}
            fill
            sizes="24rem"
            className={coverImageUrl ? "object-contain" : "object-cover object-right"}
          />
        </div>

        <div className="p-4">
          {examType ? (
            <p className="font-body text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">{examType}</p>
          ) : null}
          <h2 className="mt-1 font-display text-lg font-bold leading-snug text-heading">{name || "Untitled course"}</h2>
          {description ? <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p> : null}

          <div className="mt-4 text-sm">
            {richContent ?? <p className="text-sm text-muted">Details for this program are being updated.</p>}
          </div>

          {resourceFiles.length > 0 ? (
            <div className="mt-6 flex flex-col gap-2">
              <p className="font-body text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">
                Resource Files
              </p>
              {resourceFiles.map((file, i) => (
                <div key={file.url + i} className="rounded-[8px] border border-heading/10 bg-cream px-3 py-2">
                  <p className="truncate text-sm font-semibold text-heading">{file.title || "Download"}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
