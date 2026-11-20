import Link from "next/link";
import { cn } from "@/lib/utils";
import { blogCategories } from "@/lib/blog-categories";

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <nav
      aria-label="Filter by category"
      className="flex flex-wrap gap-2 rounded-[10px] bg-cream px-4 py-4 sm:px-5"
    >
      <Link
        href="/current-affairs"
        className={cn(
          "rounded-full px-4 py-1.5 font-body text-[0.8125rem] font-bold uppercase tracking-[0.03em] transition-colors",
          !active ? "bg-brand text-white shadow-sm" : "bg-white text-heading/70 hover:bg-teal/10 hover:text-teal",
        )}
      >
        All
      </Link>
      {blogCategories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/current-affairs/category/${cat.slug}`}
          className={cn(
            "rounded-full px-4 py-1.5 font-body text-[0.8125rem] font-bold uppercase tracking-[0.03em] transition-colors",
            active === cat.slug
              ? "bg-brand text-white shadow-sm"
              : "bg-white text-heading/70 hover:bg-teal/10 hover:text-teal",
          )}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
