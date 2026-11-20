import { FaqForm } from "@/components/admin/faq-form";
import { createFaq } from "@/lib/actions/admin/faqs";

export default function NewFaqPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New FAQ</h1>
      <div className="mt-6">
        <FaqForm action={createFaq} />
      </div>
    </div>
  );
}
