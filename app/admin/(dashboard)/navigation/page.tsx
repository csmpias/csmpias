import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteNavLink } from "@/lib/actions/admin/nav-links";
import type { NavLinkRow } from "@/lib/types";

export default async function AdminNavigationPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("nav_links").select("*").order("group_label").order("display_order");
  const navLinks = (data ?? []) as NavLinkRow[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Navigation</h1>
          <p className="mt-1 text-sm text-ink/60">
            Extra links added to the site's nav dropdowns. UPSC and UPPCS already list every active course
            automatically — use this for anything else (a new page, a promo, an external link).
          </p>
        </div>
        <Link
          href="/admin/navigation/new"
          className="shrink-0 rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink"
        >
          New Link
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Link</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {navLinks.map((link) => (
              <tr key={link.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{link.group_label}</td>
                <td className="px-4 py-3">{link.label}</td>
                <td className="max-w-56 truncate px-4 py-3 text-ink/70">{link.href}</td>
                <td className="px-4 py-3">{link.is_active ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/navigation/${link.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteNavLink.bind(null, link.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {navLinks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                  No extra nav links yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
