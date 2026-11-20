import { FeeItemForm } from "@/components/admin/fee-item-form";
import { createFeeItem } from "@/lib/actions/admin/fee-items";

export default function NewFeeItemPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Fee Item</h1>
      <div className="mt-6">
        <FeeItemForm action={createFeeItem} />
      </div>
    </div>
  );
}
