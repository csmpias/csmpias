import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { LogoutButton } from "@/components/admin/logout-button";

// Auth-gated, per-user, always-live data — never statically prerender any
// admin page (also avoids build-time execution of client widgets like the
// Cloudinary signer that only make sense against a real logged-in request).
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <AdminSidebar />
      {/* min-w-0: this column is a flex item on a row axis (sidebar |
          content); without it, a wide table further down the tree (an
          overflow-x-auto wrapper's min-w-[Nrem] child) can force this whole
          item — and the page — wider than the viewport instead of scrolling
          inside its own box. No max-w-* cap here on purpose: a hard cap
          wastes space on a wide monitor, especially for the post editor's
          two-column layout with the SEO panel. */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-rule px-4 py-3 md:hidden">
          <div className="flex items-center gap-3">
            <AdminMobileNav />
            <span className="font-display text-lg font-bold">CSMP IAS Admin</span>
          </div>
          <LogoutButton />
        </div>
        <main id="main-content" className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
