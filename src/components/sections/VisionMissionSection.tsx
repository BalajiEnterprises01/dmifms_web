import type { VisionMissionData } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";

interface VisionMissionSectionProps {
  data: VisionMissionData;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function VisionMissionSection({ data }: VisionMissionSectionProps) {
  return (
    <section id="vision-mission" className="site-container py-20 md:py-32">
      <SectionIntro label="Vision & Mission">
        Every facility we manage reflects our commitment to excellence, sustainability, and people.
      </SectionIntro>

      <h3 className="mt-12 text-[clamp(2rem,4.8vw,4.75rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase md:mt-16">
        <MaskLine>Our Purpose</MaskLine>
        <MaskLine delay={0.08}>&amp; Direction</MaskLine>
      </h3>

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-16 md:mt-20">
        <article className="col-span-12 lg:col-span-5">
          <Rule />
          <Reveal className="pt-6 md:pt-8">
            <div className="flex items-baseline justify-between gap-6">
              <h4 className="text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">
                {data.vision.title}
              </h4>
              <span className="text-[11px] text-tan tabular-nums">(01)</span>
            </div>
            <p className="mt-8 text-[clamp(1.5rem,2.8vw,2.625rem)] leading-[1.18] tracking-[-0.025em] text-ink md:mt-12">
              {data.vision.description}
            </p>
          </Reveal>
        </article>

        <article className="col-span-12 lg:col-span-6 lg:col-start-7">
          <Rule />
          <Reveal className="pt-6 md:pt-8">
            <div className="flex items-baseline justify-between gap-6">
              <h4 className="text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">
                {data.mission.title}
              </h4>
              <span className="text-[11px] text-tan tabular-nums">(02)</span>
            </div>
          </Reveal>
          <ol className="mt-6 md:mt-10">
            {data.mission.points.map((point, i) => (
              <li key={point} className="border-t border-ink/10 first:border-t-0">
                <Reveal delay={i * 0.08} className="grid grid-cols-12 gap-x-6 py-6 md:py-8">
                  <span className="col-span-2 pt-1.5 text-[11px] text-tan tabular-nums">
                    ({pad(i + 1)})
                  </span>
                  <p className="col-span-10 text-base leading-[1.55] text-ink md:text-lg">{point}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
