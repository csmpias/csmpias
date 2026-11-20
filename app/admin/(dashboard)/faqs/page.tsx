import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteFaq } from "@/lib/actions/admin/faqs";
import type { Faq } from "@/lib/types";

export default async function AdminFaqsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").order("display_order", { ascending: true });
  const faqs = (data ?? []) as Faq[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">FAQs</h1>
        <Link href="/admin/faqs/new" className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
          New FAQ
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{faq.question}</td>
                <td className="px-4 py-3">{faq.category ?? "—"}</td>
                <td className="px-4 py-3 text-ink/70">{faq.display_order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/faqs/${faq.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteFaq.bind(null, faq.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {faqs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink/70">
                  No FAQs yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
