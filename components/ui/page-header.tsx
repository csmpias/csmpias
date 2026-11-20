export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="relative overflow-hidden bg-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,74,85,0.22),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(107,162,146,0.16),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        {eyebrow ? (
          <p className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 font-display text-[1.75rem] font-bold leading-[1.15] text-white md:text-[2.75rem]">{title}</h1>
        {description ? (
          <p className="mx-auto mt-4 max-w-2xl text-[0.9375rem] leading-[1.65] text-white/75 sm:text-[1.0625rem]">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
