import type { HeroStat } from "@/types";
import Counter from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

export default function NumbersSection({ stats }: { stats: HeroStat[] }) {
  return (
    <section className="site-container pb-20 md:pb-32">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 border-t border-ink/10 pt-10 md:pt-14">
        <Reveal className="col-span-12 lg:col-span-5">
          <h2 className="text-sm font-semibold text-ink">DM23 in numbers</h2>
        </Reveal>
        <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:col-span-7">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="flex items-start text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-light tracking-[-0.05em] text-ink tabular-nums">
                <Counter value={stat.value} />
                <span className="mt-1 ml-1 text-[0.4em] tracking-normal text-clay">{stat.suffix}</span>
              </p>
              <p className="mt-4 text-[13px] leading-snug text-clay">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
