import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface StatFigure {
  value: string;
  label: string;
}

interface StatFiguresProps {
  stats: StatFigure[];
  className?: string;
}

/**
 * Oversized figures with a small caption underneath. Values are rendered
 * as text ("5,000+", "Zero Landfill"), so no count-up.
 */
export default function StatFigures({ stats, className }: StatFiguresProps) {
  if (stats.length === 0) return null;

  return (
    <dl
      className={cn(
        "grid gap-x-6 gap-y-12",
        stats.length > 1 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1",
        className,
      )}>
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse gap-4">
          <dt className="text-[13px] leading-snug text-clay">{stat.label}</dt>
          <dd className="text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-light tracking-[-0.05em] text-ink tabular-nums">
            {stat.value}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
