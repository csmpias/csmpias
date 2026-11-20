import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { PostCard } from "@/components/blog/post-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Pagination } from "@/components/blog/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { getPublishedPosts } from "@/lib/queries";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

export const metadata: Metadata = {
  title: "Current Affairs",
  description:
    "Daily current affairs, weekly and monthly compilations, state-specific notes and editorial analysis for UPSC and UPPCS aspirants, by CSMP IAS.",
  alternates: { canonical: "/current-affairs" },
};

const PAGE_SIZE = 12;

export default async function CurrentAffairsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const { posts, count } = await getPublishedPosts({ page, pageSize: PAGE_SIZE });
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <>
      <PageHeader eyebrow="Current Affairs" title="Current Affairs &amp; Editorial Analysis" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <CategoryFilter />
        <div className="mt-10">
          {posts.length === 0 ? (
            <EmptyState description="No current affairs posts published yet. Check back soon." />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        <Pagination basePath="/current-affairs" page={page} totalPages={totalPages} />
      </div>
    </>
  );
}
