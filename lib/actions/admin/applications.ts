"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";
import type { ApplicationStatus } from "@/lib/types";

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("applications").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}
