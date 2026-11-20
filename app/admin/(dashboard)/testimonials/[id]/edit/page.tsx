import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { updateTestimonial } from "@/lib/actions/admin/testimonials";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  const testimonial = data as Testimonial | null;
  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Edit Testimonial</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={action} />
      </div>
    </div>
  );
}
