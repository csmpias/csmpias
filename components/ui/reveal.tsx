"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // threshold: 0 fires as soon as a single pixel is visible, so this
    // can never get stuck for a block taller than the viewport (a 0.15
    // area-ratio threshold requires 15% of the element's own height to be
    // on screen at once, which a long article/table/course page can
    // permanently fail to reach — leaving it invisible forever).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} data-visible={visible} className={cn("reveal", className)}>
      {children}
    </Component>
  );
}
