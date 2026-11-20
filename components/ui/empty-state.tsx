export function EmptyState({
  title = "Nothing here yet",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-[10px] border border-dashed border-heading/15 bg-cream/50 px-6 py-16 text-center">
      <p className="font-display text-lg font-semibold text-heading">{title}</p>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p> : null}
    </div>
  );
}
