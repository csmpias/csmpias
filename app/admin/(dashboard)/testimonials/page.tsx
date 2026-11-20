import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTestimonial } from "@/lib/actions/admin/testimonials";
import type { Testimonial } from "@/lib/types";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").order("display_order", { ascending: true });
  const testimonials = (data ?? []) as Testimonial[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="rounded-[4px] bg-accent px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink">
          New Testimonial
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px] border border-rule">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule bg-paper-dim font-data text-[0.6875rem] uppercase tracking-[0.04em] text-ink/70">
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Exam Cleared</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-b border-rule last:border-0">
                <td className="px-4 py-3 font-medium">{testimonial.student_name}</td>
                <td className="px-4 py-3">{testimonial.exam_cleared ?? "—"}</td>
                <td className="px-4 py-3">{testimonial.is_active ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/testimonials/${testimonial.id}/edit`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteTestimonial.bind(null, testimonial.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink/70">
                  No testimonials yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
