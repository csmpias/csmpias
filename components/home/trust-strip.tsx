import { CountUp } from "@/components/ui/count-up";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { value: new Date().getFullYear() - siteConfig.established, suffix: "+", label: "Years of Mentorship" },
  { value: 50, suffix: "", label: "Students per Batch (by design)" },
  { value: 2, suffix: "", label: "Offline + Online Modes" },
  { value: 100, suffix: "%", label: "Focus on Prelims + Mains + CSAT" },
];

export function TrustStrip() {
  return (
    <section className="bg-heading">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-extrabold text-brand sm:text-4xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.05em] text-white/75">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
