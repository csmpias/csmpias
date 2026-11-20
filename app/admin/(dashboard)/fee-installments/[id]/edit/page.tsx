import { notFound } from "next/navigation";
import { FeeInstallmentForm } from "@/components/admin/fee-installment-form";
import { updateFeeInstallment } from "@/lib/actions/admin/fee-installments";
import { createClient } from "@/lib/supabase/server";
import type { FeeInstallment } from "@/lib/types";

export default async function EditFeeInstallmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("fee_installments").select("*").eq("id", id).maybeSingle();
  const feeInstallment = data as FeeInstallment | null;
  if (!feeInstallment) notFound();

  const action = updateFeeInstallment.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Installment</h1>
      <div className="mt-6">
        <FeeInstallmentForm feeInstallment={feeInstallment} action={action} />
      </div>
    </div>
  );
}
