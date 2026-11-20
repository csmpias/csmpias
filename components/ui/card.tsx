import { cn } from "@/lib/utils";

const variantClasses = {
  plain: "rounded-[4px] border border-rule bg-paper overflow-hidden transition-[border-color,border-width]",
  brand:
    "rounded-[10px] border border-heading/10 bg-white overflow-hidden shadow-[0_2px_16px_rgba(34,22,56,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(34,22,56,0.12)]",
};

const hoverableClasses = {
  plain: "hover:border-2 hover:border-ink",
  brand: "",
};

export function Card({
  className,
  hoverable = true,
  variant = "plain",
  children,
}: {
  className?: string;
  hoverable?: boolean;
  variant?: keyof typeof variantClasses;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(variantClasses[variant], hoverable && hoverableClasses[variant], className)}>
      {children}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}
