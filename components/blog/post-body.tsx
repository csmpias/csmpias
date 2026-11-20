import type { PostBlock } from "@/lib/post-content";

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="mx-auto flex max-w-[70ch] flex-col gap-5 font-body [overflow-wrap:anywhere]">
      {blocks.map((block, i) =>
        block.type === "heading" ? (
          <h2
            key={block.id}
            id={block.id}
            className="mt-8 scroll-mt-24 border-l-4 border-teal pl-4 font-display text-xl font-bold leading-snug text-heading sm:text-2xl"
          >
            {block.text}
          </h2>
        ) : block.type === "list" ? (
          <ul key={i} className="flex flex-wrap gap-2">
            {block.items.map((item, j) => (
              <li
                key={j}
                className="min-w-[8rem] flex-1 rounded-[10px] border border-heading/10 bg-cream px-4 py-2.5 text-[0.9375rem] leading-snug text-muted sm:text-[1.0625rem]"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : block.type === "timeline-entry" ? (
          <div key={i} className="flex flex-col gap-1.5 border-l-4 border-teal/40 pl-4">
            <span className="w-fit shrink-0 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
              {block.date}
            </span>
            <p className="text-[0.9375rem] leading-[1.8] text-muted sm:text-[1.0625rem]">{block.text}</p>
          </div>
        ) : (
          <p key={i} className="text-[0.9375rem] leading-[1.8] text-muted sm:text-[1.0625rem]">
            {block.text}
          </p>
        ),
      )}
    </div>
  );
}
