"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/actions/admin/require-auth";

export type NavLinkFormState = { error?: string };

function readNavLinkFields(formData: FormData) {
  const displayOrderInput = String(formData.get("display_order") ?? "").trim();

  return {
    group_label: String(formData.get("group_label") ?? "").trim(),
    label: String(formData.get("label") ?? "").trim(),
    href: String(formData.get("href") ?? "").trim(),
    display_order: displayOrderInput ? Number.parseInt(displayOrderInput, 10) : 0,
    is_active: formData.get("is_active") === "on",
  };
}

function revalidateNavRoutes() {
  revalidatePath("/admin/navigation");
  // Nav appears in the root layout on every page.
  revalidatePath("/", "layout");
  // The search-index API route flattens the same nav structure into its
  // own cached response — not reachable via the "/" layout revalidation
  // above since it's a route handler, not a page in the layout tree.
  revalidatePath("/api/search-index");
}

export async function createNavLink(_prevState: NavLinkFormState, formData: FormData): Promise<NavLinkFormState> {
  const { supabase } = await requireAdmin();
  const fields = readNavLinkFields(formData);

  if (!fields.group_label || !fields.label || !fields.href) {
    return { error: "Section, label, and link are required." };
  }

  const { error } = await supabase.from("nav_links").insert(fields);
  if (error) return { error: error.message };

  revalidateNavRoutes();
  redirect("/admin/navigation");
}

export async function updateNavLink(id: string, _prevState: NavLinkFormState, formData: FormData): Promise<NavLinkFormState> {
  const { supabase } = await requireAdmin();
  const fields = readNavLinkFields(formData);

  if (!fields.group_label || !fields.label || !fields.href) {
    return { error: "Section, label, and link are required." };
  }

  const { error } = await supabase.from("nav_links").update(fields).eq("id", id);
  if (error) return { error: error.message };

  revalidateNavRoutes();
  redirect("/admin/navigation");
}

export async function deleteNavLink(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("nav_links").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateNavRoutes();
}
