import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <Reveal className="h-full">
      <Link href={`/current-affairs/${post.slug}`} className="group block h-full">
        <Card variant="brand" className="flex h-full flex-col">
          {/* object-contain, not cover: most post covers are text-heavy
              promotional graphics (title/branding baked into the image,
              same as course covers elsewhere on the site) — cover crops
              that text off at the edges. */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-2">
            {post.cover_image_url ? (
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-body text-xs font-bold uppercase tracking-[0.06em] text-heading/30">
                CSMP IAS
              </div>
            )}
          </div>
          <CardBody className="flex flex-1 flex-col">
            {post.category ? (
              <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-2.5 py-1 font-body text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-teal">
                {post.category.replace(/-/g, " ")}
              </span>
            ) : null}
            <h3 className="mt-2 font-display text-[1.0625rem] font-bold leading-snug text-heading sm:text-[1.1875rem]">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-[1.55] text-muted">{post.excerpt}</p>
            ) : null}
            {post.published_at ? (
              <p className="mt-auto pt-3 font-body text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-heading/50">
                {formatDate(post.published_at)}
              </p>
            ) : null}
          </CardBody>
        </Card>
      </Link>
    </Reveal>
  );
}
