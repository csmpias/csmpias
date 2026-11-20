import { notFound } from "next/navigation";
import { FaqForm } from "@/components/admin/faq-form";
import { updateFaq } from "@/lib/actions/admin/faqs";
import { createClient } from "@/lib/supabase/server";
import type { Faq } from "@/lib/types";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
  const faq = data as Faq | null;
  if (!faq) notFound();

  const action = updateFaq.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit FAQ</h1>
      <div className="mt-6">
        <FaqForm faq={faq} action={action} />
      </div>
    </div>
  );
}
