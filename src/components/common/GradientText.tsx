import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  variant?: "navy" | "light" | "emerald";
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function GradientText({
  children,
  variant = "navy",
  className,
  as: Tag = "span",
}: GradientTextProps) {
  const variants = {
    navy: "gradient-text",
    light: "gradient-text-light",
    emerald: "gradient-text-emerald",
  };

  const Component = Tag as React.ElementType;

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
}
