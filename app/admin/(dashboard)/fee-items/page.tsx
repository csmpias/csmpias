import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteFeeItem } from "@/lib/actions/admin/fee-items";
import { deleteFeeInstallment } from "@/lib/actions/admin/fee-installments";
import type { FeeItem, FeeInstallment } from "@/lib/types";

export default async function AdminFeeItemsPage() {
  const supabase = await createClient();
  const [{ data: feeItemsData }, { data: feeInstallmentsData }] = await Promise.all([
    supabase.from("fee_items").select("*").order("display_order", { ascending: true }),
    supabase.from("fee_installments").select("*").order("display_order", { ascending: true }),
  ]);
  const feeItems = (feeItemsData ?? []) as FeeItem[];
  const feeInstallments = (feeInstallmentsData ?? []) as FeeInstallment[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Fee Table</h1>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Fee Items</h2>
          <Link href="/admin/fee-items/new" className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
            New Fee Item
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto rounded-[4px] border border-rule">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Course Name</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {feeItems.map((item) => (
                <tr key={item.id} className="border-b border-rule last:border-0">
                  <td className="px-4 py-3 font-medium">{item.track}</td>
                  <td className="px-4 py-3">{item.course_name}</td>
                  <td className="px-4 py-3">{item.fee ?? "—"}</td>
                  <td className="px-4 py-3">{item.duration ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Link href={`/admin/fee-items/${item.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                        Edit
                      </Link>
                      <DeleteButton action={deleteFeeItem.bind(null, item.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {feeItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-ink/70">
                    No fee items yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Installments</h2>
          <Link
            href="/admin/fee-installments/new"
            className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink"
          >
            New Installment
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto rounded-[4px] border border-rule">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
                <th className="px-4 py-3">Track</th>
                <th className="px-4 py-3">Course Name</th>
                <th className="px-4 py-3">Total Fee</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {feeInstallments.map((installment) => (
                <tr key={installment.id} className="border-b border-rule last:border-0">
                  <td className="px-4 py-3 font-medium">{installment.track}</td>
                  <td className="px-4 py-3">{installment.course_name}</td>
                  <td className="px-4 py-3">{installment.total_fee ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/fee-installments/${installment.id}/edit`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteFeeInstallment.bind(null, installment.id)} />
                    </div>
                  </td>
                </tr>
              ))}
              {feeInstallments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-ink/70">
                    No installments yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
