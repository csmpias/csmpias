import { cn } from "@/lib/utils";

// Default palette — this is what app/admin/(dashboard)/posts and
// app/admin/(dashboard)/resources render today via <StatusTag status={..} />
// with no variant passed. Keep this object and the "admin" output byte-for-
// byte identical to before the Phase 3 reskin: the admin dashboard UI must
// stay exactly as-is (see task.md hard constraints).
// Solid pre-mixed tint tokens, not Tailwind opacity modifiers (bg-accent/10
// etc.) — those compile to color-mix() with a fully-opaque fallback for
// browsers lacking it, which would make text-on-tint badges invisible. See
// the --color-*-tint tokens in globals.css.
const adminPalettes: Record<string, string> = {
  published: "bg-[var(--color-accent-tint)] text-accent",
  draft: "bg-paper-dim text-ink/70",
  new: "bg-[var(--color-accent-tint)] text-accent",
  contacted: "bg-[var(--color-accent-2-tint)] text-accent-2",
  enrolled: "bg-[var(--color-brand-cta-tint)] text-brand-cta-dark",
  rejected: "bg-[var(--color-danger-tint)] text-danger",
};

// eCademy-style palette, reserved for future public-facing usage of this
// component (none of the current public pages render a StatusTag). Opt in
// explicitly with variant="brand" — admin call sites are untouched.
const brandPalettes: Record<string, string> = {
  published: "bg-teal/10 text-teal-dark",
  draft: "bg-cream-2 text-muted",
  new: "bg-brand/10 text-brand-dark",
  contacted: "bg-teal/10 text-teal-dark",
  enrolled: "bg-teal/15 text-teal-dark",
  rejected: "bg-brand/10 text-brand-dark",
};

export function StatusTag({ status, variant = "admin" }: { status: string; variant?: "admin" | "brand" }) {
  if (variant === "brand") {
    return (
      <span
        className={cn(
          "inline-flex rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.06em]",
          brandPalettes[status] ?? "bg-cream-2 text-muted",
        )}
      >
        {status}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex rounded-[3px] px-2 py-0.5 font-data text-[0.6875rem] uppercase tracking-[0.04em]",
        adminPalettes[status] ?? "bg-paper-dim text-ink/70",
      )}
    >
      {status}
    </span>
  );
}
