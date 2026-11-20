export function TableOfContents({ headings }: { headings: { id: string; text: string }[] }) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden rounded-[10px] bg-cream p-5 lg:sticky lg:top-24 lg:block lg:self-start"
    >
      <p className="font-body text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand">On this page</p>
      <ul className="mt-3 flex flex-col gap-2.5 border-l-2 border-teal/20 pl-4 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-heading/70 transition-colors hover:text-teal">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
