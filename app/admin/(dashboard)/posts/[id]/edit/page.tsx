import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { updatePost } from "@/lib/actions/admin/posts";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  const post = data as Post | null;
  if (!post) notFound();

  const action = updatePost.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Post</h1>
      <div className="mt-6">
        <PostForm post={post} action={action} />
      </div>
    </div>
  );
}
