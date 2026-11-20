import { NavLinkForm } from "@/components/admin/nav-link-form";
import { createNavLink } from "@/lib/actions/admin/nav-links";

export default function NewNavLinkPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Nav Link</h1>
      <div className="mt-6">
        <NavLinkForm action={createNavLink} />
      </div>
    </div>
  );
}
