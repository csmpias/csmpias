import { TestimonialForm } from "@/components/admin/testimonial-form";
import { createTestimonial } from "@/lib/actions/admin/testimonials";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">New Testimonial</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
