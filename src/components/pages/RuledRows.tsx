import { Reveal, Rule } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface RuledRow {
  id: string | number;
  title: string;
  description?: string;
}

interface RuledRowsProps {
  items: RuledRow[];
  /**
   * "wide": title and copy side by side across a full-width grid.
   * "stacked": copy sits under the title, for narrower columns.
   */
  layout?: "wide" | "stacked";
  /** Heading level for each row title, to fit the surrounding outline. */
  as?: "h3" | "h4";
  className?: string;
}

/** Editorial list: uppercase title and body copy between hairlines. */
export default function RuledRows({
  items,
  layout = "wide",
  as: Heading = "h3",
  className,
}: RuledRowsProps) {
  const wide = layout === "wide";

  return (
    <div className={className}>
      <Rule />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-11">
              <Heading
                className={cn(
                  "col-span-12 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:text-[1.875rem]",
                  wide && "md:col-span-6",
                )}>
                {item.title}
              </Heading>
              {item.description && (
                <p
                  className={cn(
                    "col-span-12 max-w-md text-base leading-[1.7] text-clay",
                    wide && "md:col-span-5 md:col-start-8",
                  )}>
                  {item.description}
                </p>
              )}
            </Reveal>
            <Rule />
          </li>
        ))}
      </ul>
    </div>
  );
}
