import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  /** Small section label, rendered as the section's h2. */
  label: string;
  /** Short supporting paragraph beside the label. */
  children?: React.ReactNode;
  /** Right-aligned slot for controls or a link. */
  aside?: React.ReactNode;
  className?: string;
}

/** The label / paragraph / aside row that opens every public section. */
export default function SectionIntro({ label, children, aside, className }: SectionIntroProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-4", className)}>
      <Reveal className="col-span-12 md:col-span-3">
        <h2 className="text-sm font-semibold text-ink">{label}</h2>
      </Reveal>
      {children && (
        <Reveal delay={0.08} className="col-span-12 md:col-span-6 lg:col-span-5">
          <div className="max-w-xl text-[15px] leading-[1.7] text-clay">{children}</div>
        </Reveal>
      )}
      {aside && (
        <Reveal
          delay={0.16}
          className={cn(
            "col-span-12 flex items-end md:justify-end",
            children ? "md:col-span-3 lg:col-span-4" : "md:col-span-9",
          )}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}
