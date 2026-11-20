"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";
import { urlSlugForResourceType } from "@/lib/resource-routes";
import type { ResourceType } from "@/lib/types";

export type ResourceFormState = { error?: string };

function revalidateResourceRoutes(type: ResourceType, slug?: string | null) {
  const urlSlug = urlSlugForResourceType(type);
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  revalidatePath(`/resources/${urlSlug}`);
  if (slug) revalidatePath(`/resources/${urlSlug}/${slug}`);
  // sitemap.ts lists every published long-form resource and isn't reached
  // by any of the page revalidations above (it's a separate metadata route).
  revalidatePath("/sitemap.xml");
}

function readResourceFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const yearInput = String(formData.get("year") ?? "").trim();

  return {
    type: String(formData.get("type") ?? "") as ResourceType,
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    description: String(formData.get("description") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim() || null,
    exam_type: String(formData.get("exam_type") ?? "").trim() || null,
    subject: String(formData.get("subject") ?? "").trim() || null,
    year: yearInput ? Number.parseInt(yearInput, 10) : null,
    file_url: String(formData.get("file_url") ?? "").trim() || null,
    file_public_id: String(formData.get("file_public_id") ?? "").trim() || null,
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
    status: String(formData.get("status") ?? "draft") as "draft" | "published",
  };
}

export async function createResource(_prevState: ResourceFormState, formData: FormData): Promise<ResourceFormState> {
  const { supabase } = await requireAdmin();
  const fields = readResourceFields(formData);

  if (!fields.type || !fields.title) {
    return { error: "Type and title are required." };
  }

  const published_at = fields.status === "published" ? new Date().toISOString() : null;

  const { error } = await supabase.from("resources").insert({ ...fields, published_at });
  if (error) return { error: error.message };

  revalidateResourceRoutes(fields.type, fields.slug);
  redirect("/admin/resources");
}

export async function updateResource(
  id: string,
  _prevState: ResourceFormState,
  formData: FormData,
): Promise<ResourceFormState> {
  const { supabase } = await requireAdmin();
  const fields = readResourceFields(formData);

  if (!fields.type || !fields.title) {
    return { error: "Type and title are required." };
  }

  const { data: existing } = await supabase
    .from("resources")
    .select("status, published_at, slug, type")
    .eq("id", id)
    .single();
  const published_at =
    fields.status === "published" ? (existing?.published_at ?? new Date().toISOString()) : (existing?.published_at ?? null);

  const { error } = await supabase.from("resources").update({ ...fields, published_at }).eq("id", id);
  if (error) return { error: error.message };

  if (existing?.type && existing.slug) revalidateResourceRoutes(existing.type as ResourceType, existing.slug);
  revalidateResourceRoutes(fields.type, fields.slug);
  redirect("/admin/resources");
}

export async function deleteResource(id: string) {
  const { supabase } = await requireAdmin();
  const { data: resource } = await supabase
    .from("resources")
    .select("file_public_id, slug, type")
    .eq("id", id)
    .single();

  await deleteCloudinaryAsset(resource?.file_public_id);
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (resource?.type) revalidateResourceRoutes(resource.type as ResourceType, resource.slug);
  else {
    revalidatePath("/admin/resources");
    revalidatePath("/resources");
  }
}
