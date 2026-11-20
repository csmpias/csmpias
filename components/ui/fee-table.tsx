import type { FeeInstallment, FeeItem } from "@/lib/types";

export function FeeTable({ items }: { items: FeeItem[] }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-heading/10 bg-white shadow-[0_2px_16px_rgba(34,22,56,0.06)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-heading">
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">Course Name</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">Fee</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">OTP</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">Installment</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-heading/10">
          {items.map((item, i) => (
            <tr key={item.id} className={i % 2 === 1 ? "bg-cream/60" : "bg-white"}>
              <td className="px-5 py-3.5 font-semibold text-heading">{item.course_name}</td>
              <td className="px-5 py-3.5 font-bold text-brand">{item.fee}</td>
              <td className="px-5 py-3.5 text-muted">{item.otp}</td>
              <td className="px-5 py-3.5 text-muted">{item.installment}</td>
              <td className="px-5 py-3.5 text-muted">{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InstallmentTable({ items }: { items: FeeInstallment[] }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-heading/10 bg-white shadow-[0_2px_16px_rgba(34,22,56,0.06)]">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-teal">
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">Course</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">1st Installment</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">2nd Installment</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">3rd Installment</th>
            <th className="px-5 py-3.5 text-[0.75rem] font-bold uppercase tracking-[0.06em] text-white">Total Fee</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-heading/10">
          {items.map((item, i) => (
            <tr key={item.id} className={i % 2 === 1 ? "bg-cream/60" : "bg-white"}>
              <td className="px-5 py-3.5 font-semibold text-heading">{item.course_name}</td>
              <td className="px-5 py-3.5 text-muted">{item.installment_1}</td>
              <td className="px-5 py-3.5 text-muted">{item.installment_2}</td>
              <td className="px-5 py-3.5 text-muted">{item.installment_3}</td>
              <td className="px-5 py-3.5 font-bold text-brand">{item.total_fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
