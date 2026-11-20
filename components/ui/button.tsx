import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "cta" | "teal";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "rounded-[5px] bg-brand px-6 py-3 font-bold text-white shadow-sm hover:bg-brand-dark transition-colors",
  outline:
    "rounded-[5px] border-2 border-heading/15 px-5 py-2.5 font-bold text-heading hover:border-brand hover:text-brand transition-colors",
  cta: "rounded-[5px] bg-brand-cta px-6 py-3 font-bold text-ink hover:bg-brand-cta-dark transition-colors",
  teal: "rounded-[5px] bg-teal px-6 py-3 font-bold text-white shadow-sm hover:bg-teal-dark transition-colors",
};

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className={cn(variantClasses[variant], "inline-flex items-center justify-center gap-2", className)} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonAsButton({
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(variantClasses[variant], "inline-flex items-center justify-center gap-2 disabled:opacity-60", className)} {...rest}>
      {children}
    </button>
  );
}
