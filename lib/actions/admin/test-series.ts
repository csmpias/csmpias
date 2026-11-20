"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export type TestSeriesFormState = { error?: string };

function readTestSeriesFields(formData: FormData) {
  const startDate = String(formData.get("start_date") ?? "").trim();

  return {
    name: String(formData.get("name") ?? "").trim(),
    exam_type: String(formData.get("exam_type") ?? "").trim() || null,
    start_date: startDate || null,
    subject: String(formData.get("subject") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    file_url: String(formData.get("file_url") ?? "").trim() || null,
    file_public_id: String(formData.get("file_public_id") ?? "").trim() || null,
  };
}

export async function createTestSeries(_prevState: TestSeriesFormState, formData: FormData): Promise<TestSeriesFormState> {
  const { supabase } = await requireAdmin();
  const fields = readTestSeriesFields(formData);

  if (!fields.name) {
    return { error: "Name is required." };
  }

  const { error } = await supabase.from("test_series").insert(fields);
  if (error) return { error: error.message };

  revalidatePath("/admin/test-series");
  redirect("/admin/test-series");
}

export async function updateTestSeries(
  id: string,
  _prevState: TestSeriesFormState,
  formData: FormData,
): Promise<TestSeriesFormState> {
  const { supabase } = await requireAdmin();
  const fields = readTestSeriesFields(formData);

  if (!fields.name) {
    return { error: "Name is required." };
  }

  const { data: existing } = await supabase.from("test_series").select("file_public_id").eq("id", id).single();
  if (existing?.file_public_id && existing.file_public_id !== fields.file_public_id) {
    await deleteCloudinaryAsset(existing.file_public_id);
  }

  const { error } = await supabase.from("test_series").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/test-series");
  redirect("/admin/test-series");
}

export async function deleteTestSeries(id: string) {
  const { supabase } = await requireAdmin();
  const { data: testSeries } = await supabase.from("test_series").select("file_public_id").eq("id", id).single();

  await deleteCloudinaryAsset(testSeries?.file_public_id);
  const { error } = await supabase.from("test_series").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/test-series");
}
