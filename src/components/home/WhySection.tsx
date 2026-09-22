import type { Differentiator } from "@/types";
import { Reveal, Rule } from "@/components/motion/Reveal";

interface WhySectionProps {
  intro: string;
  items: Differentiator[];
}

/** Sticky label column beside an editorial list of differentiators. */
export default function WhySection({ intro, items }: WhySectionProps) {
  return (
    <section className="site-container py-20 md:py-32">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-4 self-start lg:sticky lg:top-32 lg:col-span-5">
          <Reveal className="col-span-12 md:col-span-3 lg:col-span-5">
            <h2 className="text-base font-semibold text-ink">Why DM23</h2>
          </Reveal>
          <Reveal delay={0.08} className="col-span-12 md:col-span-6 lg:col-span-7">
            <p className="max-w-sm text-base leading-[1.7] text-clay">{intro}</p>
          </Reveal>
        </div>

        <ol className="col-span-12 lg:col-span-7">
          <Rule />
          {items.map((item) => (
            <li key={item.id}>
              <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-11">
                <h3 className="col-span-12 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:col-span-6 md:text-[1.875rem]">
                  ({item.title})
                </h3>
                <p className="col-span-12 max-w-md text-base leading-[1.7] text-clay md:col-span-6">
                  {item.description}
                </p>
              </Reveal>
              <Rule />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
