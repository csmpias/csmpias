import { notFound } from "next/navigation";
import { FeeItemForm } from "@/components/admin/fee-item-form";
import { updateFeeItem } from "@/lib/actions/admin/fee-items";
import { createClient } from "@/lib/supabase/server";
import type { FeeItem } from "@/lib/types";

export default async function EditFeeItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("fee_items").select("*").eq("id", id).maybeSingle();
  const feeItem = data as FeeItem | null;
  if (!feeItem) notFound();

  const action = updateFeeItem.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Fee Item</h1>
      <div className="mt-6">
        <FeeItemForm feeItem={feeItem} action={action} />
      </div>
    </div>
  );
}
