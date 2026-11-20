"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";

export type BatchFormState = { error?: string };

function readBatchFields(formData: FormData) {
  const courseId = String(formData.get("course_id") ?? "").trim();
  const startDate = String(formData.get("start_date") ?? "").trim();

  return {
    course_id: courseId || null,
    name: String(formData.get("name") ?? "").trim(),
    start_date: startDate || null,
    status: String(formData.get("status") ?? "upcoming").trim() || "upcoming",
    center: String(formData.get("center") ?? "").trim() || null,
  };
}

export async function createBatch(_prevState: BatchFormState, formData: FormData): Promise<BatchFormState> {
  const { supabase } = await requireAdmin();
  const fields = readBatchFields(formData);

  if (!fields.name) {
    return { error: "Name is required." };
  }

  const { error } = await supabase.from("batches").insert(fields);
  if (error) return { error: error.message };

  revalidatePath("/admin/batches");
  redirect("/admin/batches");
}

export async function updateBatch(id: string, _prevState: BatchFormState, formData: FormData): Promise<BatchFormState> {
  const { supabase } = await requireAdmin();
  const fields = readBatchFields(formData);

  if (!fields.name) {
    return { error: "Name is required." };
  }

  const { error } = await supabase.from("batches").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/batches");
  redirect("/admin/batches");
}

export async function deleteBatch(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("batches").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/batches");
}
