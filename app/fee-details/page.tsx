import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { FeeTable, InstallmentTable } from "@/components/ui/fee-table";
import { getFeeInstallments, getFeeItems } from "@/lib/queries";

export const revalidate = false; // ISR: on-demand only - the admin action that edits this page's data calls revalidatePath here (see lib/actions/admin/*), so it never regenerates on a timer

export const metadata: Metadata = {
  title: "Fee Details",
  description:
    "UPPCS and IAS fee structure at CSMP IAS — course fees, one-time-payment discounts, and installment plans.",
  alternates: { canonical: "/fee-details" },
};

export default async function FeeDetailsPage() {
  const [uppcsItems, uppcsInstallments, iasItems, iasInstallments] = await Promise.all([
    getFeeItems("UPPCS"),
    getFeeInstallments("UPPCS"),
    getFeeItems("IAS"),
    getFeeInstallments("IAS"),
  ]);

  return (
    <>
      <PageHeader eyebrow="Admissions" title="Fee Details" />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal as="h2" className="flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          UPPCS Fee Structure
        </Reveal>
        <Reveal className="mt-6">
          <FeeTable items={uppcsItems} />
        </Reveal>

        <Reveal as="h3" className="mt-10 font-display text-xl font-bold text-heading">
          Installments
        </Reveal>
        <Reveal className="mt-4">
          <InstallmentTable items={uppcsInstallments} />
        </Reveal>

        <Reveal as="h2" className="mt-14 flex items-center gap-3 font-display text-2xl font-bold text-heading sm:text-3xl">
          <span aria-hidden className="h-6 w-1.5 shrink-0 rounded-full bg-brand" />
          IAS (UPSC) Fee Structure
        </Reveal>
        <Reveal className="mt-6">
          <FeeTable items={iasItems} />
        </Reveal>

        <Reveal as="h3" className="mt-10 font-display text-xl font-bold text-heading">
          Installments
        </Reveal>
        <Reveal className="mt-4">
          <InstallmentTable items={iasInstallments} />
        </Reveal>

        <Reveal as="div" className="mt-12 rounded-[10px] border border-brand/20 bg-cream p-5 text-sm text-muted sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.06em] text-brand">Note</p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5">
            <li>All fees above are inclusive of GST (18%).</li>
            <li>Duration of the course is subject to change in accordance with any uncertain conditions.</li>
            <li>
              For the payment of fees, the first installment is to be deposited at the time of admission, while the
              second, third and fourth installment is to be deposited within the time interval of 30-30 days.
            </li>
          </ol>
        </Reveal>
      </div>
    </>
  );
}
