import { Reveal, Rule } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface NumberedRow {
  id: string | number;
  title: string;
  description?: string;
}

interface NumberedRowsProps {
  items: NumberedRow[];
  /**
   * "wide": index, title and copy side by side across a full-width grid.
   * "stacked": copy sits under the title, for narrower columns.
   */
  layout?: "wide" | "stacked";
  /** Heading level for each row title, to fit the surrounding outline. */
  as?: "h3" | "h4";
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Editorial list: "(01)" index, uppercase title and body copy between hairlines. */
export default function NumberedRows({
  items,
  layout = "wide",
  as: Heading = "h3",
  className,
}: NumberedRowsProps) {
  const wide = layout === "wide";

  return (
    <div className={className}>
      <Rule />
      <ol>
        {items.map((item, i) => (
          <li key={item.id}>
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-11">
              <span
                className={cn(
                  "col-span-2 pt-1.5 text-[11px] font-semibold tracking-[0.16em] text-tan tabular-nums md:pt-3",
                  wide && "md:col-span-3",
                )}>
                ({pad(i + 1)})
              </span>
              <Heading
                className={cn(
                  "col-span-10 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:text-[2rem]",
                  wide && "md:col-span-9 lg:col-span-5",
                )}>
                {item.title}
              </Heading>
              {item.description && (
                <p
                  className={cn(
                    "col-span-10 col-start-3 max-w-md text-[15px] leading-[1.7] text-clay",
                    wide && "md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-auto",
                  )}>
                  {item.description}
                </p>
              )}
            </Reveal>
            <Rule />
          </li>
        ))}
      </ol>
    </div>
  );
}
