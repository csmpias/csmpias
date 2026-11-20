import Image from "next/image";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { pdfThumbnailUrl, downloadUrl } from "@/lib/cloudinary";
import type { Resource } from "@/lib/types";

export function ResourceCard({ resource, urlSlug }: { resource: Resource; urlSlug: string }) {
  const thumb = resource.cover_image_url ?? (resource.file_public_id ? pdfThumbnailUrl(resource.file_public_id) : null);
  const hasDetail = Boolean(resource.content);

  const inner = (
    <Card variant="brand" className="flex h-full flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-2">
        {thumb ? (
          <Image src={thumb} alt={resource.title} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center font-body text-xs font-bold uppercase tracking-[0.06em] text-heading/30">
            {resource.type.replace(/_/g, " ")}
          </div>
        )}
      </div>
      <CardBody className="flex flex-1 flex-col">
        <div className="flex flex-wrap gap-1.5 font-body text-[0.6875rem] font-bold uppercase tracking-[0.03em] text-teal">
          {resource.exam_type ? <span className="rounded-full bg-teal/10 px-2.5 py-1">{resource.exam_type}</span> : null}
          {resource.subject ? <span className="rounded-full bg-teal/10 px-2.5 py-1">{resource.subject}</span> : null}
          {resource.year ? <span className="rounded-full bg-teal/10 px-2.5 py-1">{resource.year}</span> : null}
        </div>
        <h3 className="mt-2.5 font-display text-[1.0625rem] font-bold leading-snug text-heading">{resource.title}</h3>
        {resource.description ? <p className="mt-2 line-clamp-2 text-sm text-muted">{resource.description}</p> : null}
      </CardBody>
    </Card>
  );

  return (
    <Reveal className="h-full">
      {hasDetail ? (
        <Link href={`/resources/${urlSlug}/${resource.slug}`} className="block h-full">
          {inner}
        </Link>
      ) : resource.file_public_id ? (
        <a
          href={downloadUrl(resource.file_public_id, resource.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </Reveal>
  );
}
