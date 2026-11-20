import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusTag } from "@/components/ui/status-tag";
import { SeoScoreBadge } from "@/components/admin/seo-score-badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePost } from "@/lib/actions/admin/posts";
import { formatDate } from "@/lib/utils";
import { getSeoScore } from "@/lib/seo-score";
import type { Post } from "@/lib/types";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*").order("updated_at", { ascending: false });
  const posts = (data ?? []) as Post[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Blog Posts</h1>
        <Link href="/admin/posts/new" className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
          New Post
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">SEO</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              // Same lib/seo-score.ts import the live editor panel uses, so
              // a post never shows two different scores depending on which
              // screen you're looking at.
              const seo = getSeoScore({
                title: post.title,
                excerpt: post.excerpt ?? "",
                content: post.content,
                coverImageUrl: post.cover_image_url,
                isLegacy: Boolean(post.import_batch),
              });
              return (
              <tr key={post.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3">
                  <StatusTag status={post.status} />
                </td>
                <td className="px-4 py-3">
                  <SeoScoreBadge score={seo.score} band={seo.band} isLegacy={seo.isLegacy} />
                </td>
                <td className="px-4 py-3 text-ink/70">{formatDate(post.updated_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/posts/${post.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deletePost.bind(null, post.id)} />
                  </div>
                </td>
              </tr>
              );
            })}
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No posts yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
