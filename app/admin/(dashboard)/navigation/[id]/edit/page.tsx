import { notFound } from "next/navigation";
import { NavLinkForm } from "@/components/admin/nav-link-form";
import { updateNavLink } from "@/lib/actions/admin/nav-links";
import { createClient } from "@/lib/supabase/server";
import type { NavLinkRow } from "@/lib/types";

export default async function EditNavLinkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("nav_links").select("*").eq("id", id).maybeSingle();
  const navLink = data as NavLinkRow | null;
  if (!navLink) notFound();

  const action = updateNavLink.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Nav Link</h1>
      <div className="mt-6">
        <NavLinkForm navLink={navLink} action={action} />
      </div>
    </div>
  );
}
