"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export type TestimonialFormState = { error?: string };

function readTestimonialFields(formData: FormData) {
  const displayOrderInput = String(formData.get("display_order") ?? "").trim();

  return {
    student_name: String(formData.get("student_name") ?? "").trim(),
    exam_cleared: String(formData.get("exam_cleared") ?? "").trim() || null,
    rank: String(formData.get("rank") ?? "").trim() || null,
    quote: String(formData.get("quote") ?? "").trim(),
    photo_url: String(formData.get("photo_url") ?? "").trim() || null,
    photo_public_id: String(formData.get("photo_public_id") ?? "").trim() || null,
    display_order: displayOrderInput ? Number.parseInt(displayOrderInput, 10) : 0,
    is_active: formData.get("is_active") === "on",
  };
}

function revalidateTestimonialRoutes() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const { supabase } = await requireAdmin();
  const fields = readTestimonialFields(formData);

  if (!fields.student_name || !fields.quote) {
    return { error: "Student name and quote are required." };
  }

  const { error } = await supabase.from("testimonials").insert(fields);
  if (error) return { error: error.message };

  revalidateTestimonialRoutes();
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const { supabase } = await requireAdmin();
  const fields = readTestimonialFields(formData);

  if (!fields.student_name || !fields.quote) {
    return { error: "Student name and quote are required." };
  }

  const { error } = await supabase.from("testimonials").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateTestimonialRoutes();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireAdmin();
  const { data: testimonial } = await supabase.from("testimonials").select("photo_public_id").eq("id", id).single();

  await deleteCloudinaryAsset(testimonial?.photo_public_id);
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateTestimonialRoutes();
}
