"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";

export type FeeInstallmentFormState = { error?: string };

function readFeeInstallmentFields(formData: FormData) {
  const displayOrderInput = String(formData.get("display_order") ?? "").trim();

  return {
    track: String(formData.get("track") ?? "").trim(),
    course_name: String(formData.get("course_name") ?? "").trim(),
    installment_1: String(formData.get("installment_1") ?? "").trim() || null,
    installment_2: String(formData.get("installment_2") ?? "").trim() || null,
    installment_3: String(formData.get("installment_3") ?? "").trim() || null,
    total_fee: String(formData.get("total_fee") ?? "").trim() || null,
    display_order: displayOrderInput ? Number.parseInt(displayOrderInput, 10) : 0,
  };
}

function revalidateFeeRoutes() {
  revalidatePath("/admin/fee-items");
  revalidatePath("/fee-details");
}

export async function createFeeInstallment(
  _prevState: FeeInstallmentFormState,
  formData: FormData,
): Promise<FeeInstallmentFormState> {
  const { supabase } = await requireAdmin();
  const fields = readFeeInstallmentFields(formData);

  if (!fields.track || !fields.course_name) {
    return { error: "Track and course name are required." };
  }

  const { error } = await supabase.from("fee_installments").insert(fields);
  if (error) return { error: error.message };

  revalidateFeeRoutes();
  redirect("/admin/fee-items");
}

export async function updateFeeInstallment(
  id: string,
  _prevState: FeeInstallmentFormState,
  formData: FormData,
): Promise<FeeInstallmentFormState> {
  const { supabase } = await requireAdmin();
  const fields = readFeeInstallmentFields(formData);

  if (!fields.track || !fields.course_name) {
    return { error: "Track and course name are required." };
  }

  const { error } = await supabase.from("fee_installments").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateFeeRoutes();
  redirect("/admin/fee-items");
}

export async function deleteFeeInstallment(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("fee_installments").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateFeeRoutes();
}
