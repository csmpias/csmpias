import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/post-body";
import { PostBodyHtml } from "@/components/blog/post-body-html";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { PostCard } from "@/components/blog/post-card";
import { PostViewCounter } from "@/components/blog/post-view-counter";
import { Reveal } from "@/components/ui/reveal";
import { DownloadIcon } from "@/components/ui/icons";
import { getPostBySlug, getRelatedPosts, getPostViewCount } from "@/lib/queries";
import { parsePostContent, extractHeadings } from "@/lib/post-content";
import { addHeadingIds, extractHtmlHeadings } from "@/lib/html-content";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { createPublicClient } from "@/lib/supabase/public";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

// Pre-render every published post at build time so Google can crawl fast,
// cached HTML instead of falling back to per-request dynamic rendering.
export async function generateStaticParams() {
  const supabase = createPublicClient();
  const { data } = await supabase.from("posts").select("slug").eq("status", "published");
  return (data ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const seoTitle = post.seo_title ?? post.title;
  // Some imported posts already have the site name baked into seo_title
  // (e.g. "Post Title - CSMP IAS : tagline"). The root layout's title
  // template appends " | CSMP IAS" to every plain string title, which
  // would double it up for those — `absolute` opts out of the template.
  const titleAlreadyBranded = seoTitle.toLowerCase().includes(siteConfig.name.toLowerCase());
  return {
    title: titleAlreadyBranded ? { absolute: seoTitle } : seoTitle,
    description: post.seo_description ?? post.excerpt ?? undefined,
    keywords: post.seo_keywords ?? undefined,
    alternates: { canonical: `/current-affairs/${slug}` },
    openGraph: {
      type: "article",
      title: seoTitle,
      description: post.seo_description ?? post.excerpt ?? undefined,
      url: `${siteConfig.url}/current-affairs/${slug}`,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const isHtml = post.content_format === "html";
  const htmlWithIds = isHtml ? addHeadingIds(post.content) : "";
  const blocks = isHtml ? [] : parsePostContent(post.content);
  const headings = isHtml ? extractHtmlHeadings(htmlWithIds) : extractHeadings(blocks);
  const [related, initialViewCount] = await Promise.all([
    getRelatedPosts(post.category, post.slug),
    getPostViewCount(post.id),
  ]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/current-affairs/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Current Affairs", item: `${siteConfig.url}/current-affairs` },
      { "@type": "ListItem", position: 2, name: post.title, item: `${siteConfig.url}/current-affairs/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="border-b border-cream-2 bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="font-body text-[0.75rem] font-bold uppercase tracking-[0.04em] text-teal">
            <Link href="/current-affairs" className="hover:text-brand">
              Current Affairs
            </Link>
            {post.category ? (
              <>
                {" / "}
                <Link href={`/current-affairs/category/${post.category}`} className="hover:text-brand">
                  {post.category.replace(/-/g, " ")}
                </Link>
              </>
            ) : null}
          </nav>
          <h1 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.15] text-heading md:text-[2.5rem]">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 font-body text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-muted">
            {post.published_at ? <span>{formatDate(post.published_at)}</span> : null}
            <PostViewCounter postId={post.id} slug={post.slug} initialCount={initialViewCount} />
            <a
              href={`/api/current-affairs/${post.slug}/pdf`}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-teal/40 px-3 py-1.5 text-[0.75rem] font-bold normal-case tracking-normal text-teal-dark transition-colors hover:border-teal hover:bg-teal/10"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              Save as PDF
            </a>
          </div>
        </div>
      </div>

      {post.cover_image_url ? (
        // object-contain, not cover: same reasoning as the post-card grid
        // and course covers — most of these are text-heavy promotional
        // graphics, and cover crops that text off at the edges.
        <div className="relative mx-auto mt-8 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-[10px] bg-cream-2 shadow-[0_4px_24px_rgba(34,22,56,0.08)]">
          <Image src={post.cover_image_url} alt={post.title} fill sizes="100vw" className="object-contain" priority />
        </div>
      ) : null}

      {/* Not wrapped in <Reveal>: its IntersectionObserver-based fade-in
          can never fire for content taller than ~6.7x the viewport (a
          mathematical property of its area-ratio threshold), and reliably
          failed to fire at all for some above-the-fold content even when
          well under that — full article bodies hit both cases regularly.
          That left the entire article invisible (opacity 0) while the
          sibling table of contents, not wrapped in Reveal, rendered fine —
          exactly the "blank page with just the ToC" bug this fixes. */}
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_260px] lg:px-8">
        {isHtml ? <PostBodyHtml html={htmlWithIds} /> : <PostBody blocks={blocks} />}
        <TableOfContents headings={headings} />
      </div>

      {related.length > 0 ? (
        <div className="border-t border-cream-2 bg-cream">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <Reveal as="h2" className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Related Reading
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
