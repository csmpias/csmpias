"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";

export type PostFormState = { error?: string };

function readPostFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const keywords = String(formData.get("seo_keywords") ?? "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft") as "draft" | "published",
    seo_title: String(formData.get("seo_title") ?? "").trim() || null,
    seo_description: String(formData.get("seo_description") ?? "").trim() || null,
    seo_keywords:
      String(formData.get("seo_keywords") ?? "")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean) || null,
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
    cover_image_public_id: String(formData.get("cover_image_public_id") ?? "").trim() || null,
    // Every save through this form comes from the TipTap editor, which
    // always emits real HTML — so any post saved here is no longer the
    // bulk-migrated plain-text format, regardless of what it was before.
    content_format: "html" as const,
    import_batch: null,
  };
}

export async function createPost(_prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const { supabase } = await requireAdmin();
  const fields = readPostFields(formData);

  if (!fields.title || !fields.content) {
    return { error: "Title and content are required." };
  }

  const published_at = fields.status === "published" ? new Date().toISOString() : null;

  const { error } = await supabase.from("posts").insert({ ...fields, published_at });
  if (error) return { error: error.message };

  revalidatePath("/admin/posts");
  revalidatePath("/current-affairs");
  if (fields.category) revalidatePath(`/current-affairs/category/${fields.category}`);
  // sitemap.ts lists every published post and isn't reached by the page
  // revalidations above (it's a separate metadata route).
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts");
}

export async function updatePost(id: string, _prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const { supabase } = await requireAdmin();
  const fields = readPostFields(formData);

  if (!fields.title || !fields.content) {
    return { error: "Title and content are required." };
  }

  const { data: existing } = await supabase
    .from("posts")
    .select("status, published_at, slug, category")
    .eq("id", id)
    .single();
  const published_at =
    fields.status === "published" ? (existing?.published_at ?? new Date().toISOString()) : existing?.published_at ?? null;

  const { error } = await supabase.from("posts").update({ ...fields, published_at }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/posts");
  revalidatePath("/current-affairs");
  if (existing?.slug) revalidatePath(`/current-affairs/${existing.slug}`);
  revalidatePath(`/current-affairs/${fields.slug}`);
  if (existing?.category) revalidatePath(`/current-affairs/category/${existing.category}`);
  if (fields.category && fields.category !== existing?.category) {
    revalidatePath(`/current-affairs/category/${fields.category}`);
  }
  // sitemap.ts lists every published post and isn't reached by the page
  // revalidations above (it's a separate metadata route).
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const { supabase } = await requireAdmin();
  const { data: post } = await supabase
    .from("posts")
    .select("cover_image_public_id, slug, category")
    .eq("id", id)
    .single();

  await deleteCloudinaryAsset(post?.cover_image_public_id);
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/posts");
  revalidatePath("/current-affairs");
  if (post?.slug) revalidatePath(`/current-affairs/${post.slug}`);
  if (post?.category) revalidatePath(`/current-affairs/category/${post.category}`);
  // sitemap.ts lists every published post and isn't reached by the page
  // revalidations above (it's a separate metadata route).
  revalidatePath("/sitemap.xml");
}
