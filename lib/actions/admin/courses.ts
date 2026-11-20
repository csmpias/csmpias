"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";
import type { CourseResourceFile } from "@/lib/types";

export type CourseFormState = { error?: string };

/** The form serializes the resource-files list to JSON in a hidden input (see course-form.tsx). */
function readResourceFiles(formData: FormData): CourseResourceFile[] {
  const raw = String(formData.get("resource_files") ?? "[]");
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is CourseResourceFile => item && typeof item.url === "string" && item.url.trim() !== "")
      .map((item) => ({
        title: typeof item.title === "string" && item.title.trim() ? item.title.trim() : "Download",
        url: item.url,
        public_id: typeof item.public_id === "string" ? item.public_id : "",
      }));
  } catch {
    return [];
  }
}

function readCourseFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const displayOrderInput = String(formData.get("display_order") ?? "").trim();

  return {
    name,
    slug: slugInput ? slugify(slugInput) : slugify(name),
    exam_type: String(formData.get("exam_type") ?? "").trim() || null,
    duration: String(formData.get("duration") ?? "").trim() || null,
    mode: String(formData.get("mode") ?? "").trim() || null,
    medium: String(formData.get("medium") ?? "").trim() || null,
    fee: String(formData.get("fee") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim() || null,
    cover_image_url: String(formData.get("cover_image_url") ?? "").trim() || null,
    cover_image_public_id: String(formData.get("cover_image_public_id") ?? "").trim() || null,
    resource_files: readResourceFiles(formData),
    category: String(formData.get("category") ?? "").trim() || null,
    display_order: displayOrderInput ? Number.parseInt(displayOrderInput, 10) : 0,
    is_active: formData.get("is_active") === "on",
  };
}

function revalidateCourseRoutes() {
  revalidatePath("/admin/courses");
  revalidatePath("/");
  // Course detail (/courses/[...path]), state-pcs listings, and test-series
  // listings are all statically generated from the courses table.
  revalidatePath("/courses", "layout");
  revalidatePath("/test-series", "layout");
  // The root layout's footer lists every active course (see app/layout.tsx)
  // — revalidating the "/" layout propagates to every page, since they all
  // render inside it.
  revalidatePath("/", "layout");
  revalidatePath("/course-explorer");
  // sitemap.ts and the search-index API route both read the courses table
  // directly and are metadata/route-handler caches that the "/" layout
  // revalidation above does NOT reach (they aren't nested in the React
  // layout tree), so they need their own explicit invalidation.
  revalidatePath("/sitemap.xml");
  revalidatePath("/api/search-index");
}

export async function createCourse(_prevState: CourseFormState, formData: FormData): Promise<CourseFormState> {
  const { supabase } = await requireAdmin();
  const fields = readCourseFields(formData);

  if (!fields.name) {
    return { error: "Name is required." };
  }

  const { error } = await supabase.from("courses").insert(fields);
  if (error) return { error: error.message };

  revalidateCourseRoutes();
  redirect("/admin/courses");
}

export async function updateCourse(id: string, _prevState: CourseFormState, formData: FormData): Promise<CourseFormState> {
  const { supabase } = await requireAdmin();
  const fields = readCourseFields(formData);

  if (!fields.name) {
    return { error: "Name is required." };
  }

  const { error } = await supabase.from("courses").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateCourseRoutes();
  redirect("/admin/courses");
}

export async function deleteCourse(id: string) {
  const { supabase } = await requireAdmin();
  const { data: course } = await supabase
    .from("courses")
    .select("cover_image_public_id, resource_files")
    .eq("id", id)
    .single();

  const resourceFiles = (course?.resource_files ?? []) as CourseResourceFile[];
  await Promise.all([
    deleteCloudinaryAsset(course?.cover_image_public_id),
    ...resourceFiles.map((file) => deleteCloudinaryAsset(file.public_id)),
  ]);
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateCourseRoutes();
}
