import Link from "next/link";
import { cn } from "@/lib/utils";

export function Pagination({ basePath, page, totalPages }: { basePath: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap justify-center gap-2">
      {pages.map((p) => (
        <Link
          key={p}
          href={p === 1 ? basePath : `${basePath}?page=${p}`}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            "flex size-10 items-center justify-center rounded-full border font-body text-sm font-bold transition-colors",
            p === page
              ? "border-brand bg-brand text-white"
              : "border-heading/15 text-heading/70 hover:border-brand hover:text-brand",
          )}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}
