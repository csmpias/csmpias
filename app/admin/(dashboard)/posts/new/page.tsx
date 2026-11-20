import { PostForm } from "@/components/admin/post-form";
import { createPost } from "@/lib/actions/admin/posts";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Post</h1>
      <div className="mt-6">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}
