"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";

export type FeeItemFormState = { error?: string };

function readFeeItemFields(formData: FormData) {
  const displayOrderInput = String(formData.get("display_order") ?? "").trim();

  return {
    track: String(formData.get("track") ?? "").trim(),
    course_name: String(formData.get("course_name") ?? "").trim(),
    fee: String(formData.get("fee") ?? "").trim() || null,
    otp: String(formData.get("otp") ?? "").trim() || null,
    installment: String(formData.get("installment") ?? "").trim() || null,
    duration: String(formData.get("duration") ?? "").trim() || null,
    display_order: displayOrderInput ? Number.parseInt(displayOrderInput, 10) : 0,
  };
}

function revalidateFeeRoutes() {
  revalidatePath("/admin/fee-items");
  revalidatePath("/fee-details");
}

export async function createFeeItem(_prevState: FeeItemFormState, formData: FormData): Promise<FeeItemFormState> {
  const { supabase } = await requireAdmin();
  const fields = readFeeItemFields(formData);

  if (!fields.track || !fields.course_name) {
    return { error: "Track and course name are required." };
  }

  const { error } = await supabase.from("fee_items").insert(fields);
  if (error) return { error: error.message };

  revalidateFeeRoutes();
  redirect("/admin/fee-items");
}

export async function updateFeeItem(id: string, _prevState: FeeItemFormState, formData: FormData): Promise<FeeItemFormState> {
  const { supabase } = await requireAdmin();
  const fields = readFeeItemFields(formData);

  if (!fields.track || !fields.course_name) {
    return { error: "Track and course name are required." };
  }

  const { error } = await supabase.from("fee_items").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateFeeRoutes();
  redirect("/admin/fee-items");
}

export async function deleteFeeItem(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("fee_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateFeeRoutes();
}
