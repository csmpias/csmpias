import { FeeInstallmentForm } from "@/components/admin/fee-installment-form";
import { createFeeInstallment } from "@/lib/actions/admin/fee-installments";

export default function NewFeeInstallmentPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Installment</h1>
      <div className="mt-6">
        <FeeInstallmentForm action={createFeeInstallment} />
      </div>
    </div>
  );
}
