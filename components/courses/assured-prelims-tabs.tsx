"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export function AssuredPrelimsTabs({ tabs, sidebar }: { tabs: TabItem[]; sidebar: React.ReactNode }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);

  return (
    <div>
      <div role="tablist" aria-label="Programme details" className="flex flex-wrap gap-2 border-b border-heading/10 pb-4">
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "rounded-[5px] px-4 py-2.5 text-sm font-bold transition-colors sm:text-[0.9375rem]",
                active ? "bg-brand text-white shadow-sm" : "bg-cream text-heading hover:bg-cream-2",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* min-w-0: a grid item's default min-width: auto lets wide content
            (e.g. a table) blow out this column and the page instead of
            scrolling internally — see the matching note in CourseDetail. */}
        <div className="min-w-0 lg:col-span-2">
          {tabs.map((tab) => (
            <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={tab.id !== activeId}>
              {tab.content}
            </div>
          ))}
        </div>
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">{sidebar}</div>
        </aside>
      </div>
    </div>
  );
}
