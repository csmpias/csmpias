"use client";

import { useActionState, useState } from "react";
import type { PostFormState } from "@/lib/actions/admin/posts";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { SeoPanel } from "@/components/admin/seo-panel";
import { FieldLabel } from "@/components/admin/field-label";
import { slugify } from "@/lib/utils";
import { legacyTextToHtml } from "@/lib/html-content";
import { blogCategories } from "@/lib/blog-categories";
import type { Post } from "@/lib/types";

const initialState: PostFormState = {};

export function PostForm({
  post,
  action,
}: {
  post?: Post;
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  // A legacy post's content is plain text, not HTML (see lib/post-content.ts)
  // — convert it to real <p>/<h2> tags before handing it to the TipTap
  // editor, or its paragraph breaks collapse into one run-on paragraph.
  const [content, setContent] = useState(
    post?.content_format === "legacy_text" ? legacyTextToHtml(post.content) : (post?.content ?? ""),
  );
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(post?.cover_image_url ?? null);
  const isLegacy = Boolean(post?.import_batch);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function openPreview() {
    sessionStorage.setItem(
      "csmp-post-preview",
      JSON.stringify({ title, excerpt, content, coverImageUrl, category: post?.category ?? null }),
    );
    // No "noopener" here on purpose: browsers only copy sessionStorage into
    // a window.open()'d tab when it stays part of the opener's browsing
    // context group — noopener severs that, so the preview tab would load
    // with an empty sessionStorage and show "No draft to preview" even
    // though this tab just wrote the draft a line above. Same-origin,
    // same-app content, so there's no opener-hijack risk here.
    window.open("/admin/posts/preview", "_blank");
  }

  return (
    <form action={formAction} className="grid gap-6 xl:grid-cols-[1fr_20rem]">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            Title
            <FieldLabel help="The article headline. Shown on the listing page, at the top of the article, and used as the browser tab title unless an SEO title override is set below." />
          </span>
          <input
            name="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            Slug
            <FieldLabel help="The URL for this article, e.g. csmpias.com/current-affairs/your-slug-here. Auto-fills from the title — edit it directly if you want a different URL." />
          </span>
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="rounded-[4px] border border-rule px-3 py-2.5 font-data text-sm outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            Excerpt
            <FieldLabel help="A short summary shown on the listing page and used as the Google search snippet. Aim for 50–160 characters." />
          </span>
          <textarea
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <div className="flex flex-col gap-1.5 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            Content
            <FieldLabel help="The full article body. Use the toolbar for formatting — no HTML or Markdown knowledge needed." />
          </span>
          <input type="hidden" name="content" value={content} />
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              Category
              <FieldLabel help="Groups this article under a topic on the Current Affairs listing and its filter." />
            </span>
            <select
              name="category"
              defaultValue={post?.category ?? ""}
              className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
            >
              <option value="">None</option>
              {blogCategories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              Status
              <FieldLabel help="Draft is only visible in this dashboard. Published goes live on the public site immediately." />
            </span>
            <select
              name="status"
              defaultValue={post?.status ?? "draft"}
              className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            SEO Title
            <FieldLabel help="Optional. Overrides the Title above only in the browser tab and Google search results — leave blank to just reuse the Title." />
          </span>
          <input
            name="seo_title"
            defaultValue={post?.seo_title ?? ""}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            SEO Description
            <FieldLabel help="Optional. Overrides the Excerpt above only in the Google search snippet — leave blank to just reuse the Excerpt." />
          </span>
          <textarea
            name="seo_description"
            defaultValue={post?.seo_description ?? ""}
            rows={2}
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            SEO Keywords
            <FieldLabel help="Optional, comma-separated. Added as a meta keywords tag for search engines." />
          </span>
          <input
            name="seo_keywords"
            defaultValue={post?.seo_keywords?.join(", ") ?? ""}
            placeholder="e.g. UPPCS result 2025, UPPSC mains result"
            className="rounded-[4px] border border-rule px-3 py-2.5 outline-none focus:border-ink"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            Cover Image
            <FieldLabel help="Shown on the listing page, at the top of the article, and when the link is shared on social media." />
          </span>
          <CloudinaryUpload
            folder="csmp-ias/blog"
            label=""
            fileFieldName="cover_image_url"
            publicIdFieldName="cover_image_public_id"
            initialUrl={post?.cover_image_url}
            initialPublicId={post?.cover_image_public_id}
            onChange={({ url }) => setCoverImageUrl(url)}
          />
        </div>

        {state.error ? (
          <p role="alert" className="text-sm text-danger">
            {state.error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="w-fit rounded-[4px] bg-accent px-5 py-2.5 font-semibold text-paper hover:bg-ink disabled:opacity-60"
          >
            {pending ? "Saving..." : post ? "Save changes" : "Create"}
          </button>
          <button
            type="button"
            onClick={openPreview}
            className="w-fit rounded-[4px] border border-rule px-5 py-2.5 font-semibold text-ink hover:border-ink"
          >
            Preview in new tab
          </button>
        </div>
      </div>

      <div>
        <SeoPanel title={title} excerpt={excerpt} content={content} coverImageUrl={coverImageUrl} isLegacy={isLegacy} />
      </div>
    </form>
  );
}
