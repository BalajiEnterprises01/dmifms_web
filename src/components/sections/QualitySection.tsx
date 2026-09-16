import type { CSSProperties } from "react";
import type { QualityData } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/** Supervision hierarchy as a stepped editorial list (each level indents a little on desktop). */
export default function QualitySection({ data }: { data: QualityData }) {
  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro label={data.badge}>{data.description}</SectionIntro>

      <h3 className="mt-12 text-[clamp(2rem,4.8vw,4.75rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase md:mt-16">
        <MaskLine>{data.title}</MaskLine>
      </h3>

      <ol className="mt-12 md:mt-20">
        <Rule />
        {data.hierarchy.map((level, i) => (
          <li key={level.id}>
            <Reveal
              delay={Math.min(i, 3) * 0.06}
              className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-7 md:py-9">
              <span className="col-span-12 text-[11px] font-semibold tracking-[0.16em] text-tan tabular-nums sm:col-span-2 md:col-span-1">
                L{pad(level.id)}
              </span>
              <h4
                style={{ "--step": i } as CSSProperties}
                className="col-span-12 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase sm:col-span-10 md:col-span-6 md:text-[2rem] lg:pl-[calc(var(--step)*1.75rem)]">
                ({level.level})
              </h4>
              <p className="col-span-12 max-w-md text-[15px] leading-[1.7] text-clay sm:col-span-10 sm:col-start-3 md:col-span-5 md:col-start-auto">
                {level.description}
              </p>
            </Reveal>
            <Rule />
          </li>
        ))}
      </ol>

      <Reveal>
        <p className="mt-8 text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">
          Quality hierarchy flows from Deployments → Director level
        </p>
      </Reveal>
    </section>
  );
}
