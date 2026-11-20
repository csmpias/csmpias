"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";

export type FaqFormState = { error?: string };

function readFaqFields(formData: FormData) {
  const displayOrderInput = String(formData.get("display_order") ?? "").trim();

  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || null,
    display_order: displayOrderInput ? Number.parseInt(displayOrderInput, 10) : 0,
  };
}

function revalidateFaqRoutes() {
  revalidatePath("/admin/faqs");
  revalidatePath("/faqs-preparation-tips");
  revalidatePath("/");
}

export async function createFaq(_prevState: FaqFormState, formData: FormData): Promise<FaqFormState> {
  const { supabase } = await requireAdmin();
  const fields = readFaqFields(formData);

  if (!fields.question || !fields.answer) {
    return { error: "Question and answer are required." };
  }

  const { error } = await supabase.from("faqs").insert(fields);
  if (error) return { error: error.message };

  revalidateFaqRoutes();
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, _prevState: FaqFormState, formData: FormData): Promise<FaqFormState> {
  const { supabase } = await requireAdmin();
  const fields = readFaqFields(formData);

  if (!fields.question || !fields.answer) {
    return { error: "Question and answer are required." };
  }

  const { error } = await supabase.from("faqs").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateFaqRoutes();
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateFaqRoutes();
}
