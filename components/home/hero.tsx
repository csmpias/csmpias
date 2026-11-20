import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const HERO_IMAGE = "https://res.cloudinary.com/t6nm5hzp/image/upload/v1784361673/csmp-ias/site/uy-hero1.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <Image
        src={HERO_IMAGE}
        alt="A CSMP IAS aspirant studying at a library desk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[75%_center]"
      />
      {/* Dark scrim so white text stays readable over any part of the photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32">
        <div className="max-w-xl translate-y-5 animate-[hero-in_0.7s_cubic-bezier(0.16,1,0.3,1)_0.1s_forwards]">
          <span className="inline-block rounded-[4px] bg-teal px-3 py-1.5 text-[0.75rem] font-bold text-white">
            {`${siteConfig.name} Coaching – Your Path to Civil Services`}
          </span>
          <h1 className="mt-5 font-display text-[2rem] font-extrabold leading-[1.15] text-white sm:text-[2.5rem] md:text-[2.9rem]">
            Quality Education <span className="text-brand">|</span> Focused Preparation{" "}
            <span className="text-brand">|</span> Result&#8209;Oriented Approach
          </h1>
          <p className="mt-5 max-w-lg text-[0.9375rem] leading-[1.65] text-white/80 sm:text-[1.0625rem]">
            {siteConfig.name} Coaching provides UPSC aspirants with a strong academic foundation
            and exam-centric preparation. If you aim for IAS, IPS, or State Services, connect with
            us today and begin your journey toward success.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about-coaching"
              className="rounded-[5px] bg-white px-6 py-3 font-bold text-heading shadow-sm transition-colors hover:bg-cream"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="rounded-[5px] border-2 border-white/40 px-5 py-2.5 font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
