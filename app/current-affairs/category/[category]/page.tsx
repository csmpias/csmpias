import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PostCard } from "@/components/blog/post-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Pagination } from "@/components/blog/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublishedPosts } from "@/lib/queries";
import { blogCategories, blogCategoryLabels as categoryLabels } from "@/lib/blog-categories";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

const PAGE_SIZE = 12;

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] ?? category;
  return {
    title: `${label} — Current Affairs`,
    alternates: { canonical: `/current-affairs/category/${category}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const label = categoryLabels[category] ?? category;

  const { posts, count } = await getPublishedPosts({ category, page, pageSize: PAGE_SIZE });
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <>
      <PageHeader eyebrow="Current Affairs" title={label} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <CategoryFilter active={category} />
        <div className="mt-10">
          {posts.length === 0 ? (
            <EmptyState description={`No posts published under ${label} yet.`} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        <Pagination basePath={`/current-affairs/category/${category}`} page={page} totalPages={totalPages} />
      </div>
    </>
  );
}
