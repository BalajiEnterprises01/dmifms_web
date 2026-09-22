import type { VisionMissionData } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";

interface VisionMissionSectionProps {
  data: VisionMissionData;
}

export default function VisionMissionSection({ data }: VisionMissionSectionProps) {
  return (
    <section id="vision-mission" className="site-container py-20 md:py-32">
      <SectionIntro label="Vision & Mission">
        Every facility we manage reflects our commitment to excellence, sustainability, and people.
      </SectionIntro>

      <h3 className="mt-12 text-heading leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase md:mt-16">
        <MaskLine>Our Purpose</MaskLine>
        <MaskLine delay={0.08}>&amp; Direction</MaskLine>
      </h3>

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-16 md:mt-20">
        <article className="col-span-12 lg:col-span-5">
          <Rule />
          <Reveal className="pt-6 md:pt-8">
            <h4 className="text-eyebrow font-semibold tracking-[0.16em] text-clay uppercase">
              {data.vision.title}
            </h4>
            <p className="mt-8 text-statement leading-[1.18] tracking-[-0.025em] text-ink md:mt-12">
              {data.vision.description}
            </p>
          </Reveal>
        </article>

        <article className="col-span-12 lg:col-span-6 lg:col-start-7">
          <Rule />
          <Reveal className="pt-6 md:pt-8">
            <h4 className="text-eyebrow font-semibold tracking-[0.16em] text-clay uppercase">
              {data.mission.title}
            </h4>
          </Reveal>
          <ul className="mt-6 md:mt-10">
            {data.mission.points.map((point, i) => (
              <li key={point} className="border-t border-ink/10 first:border-t-0">
                <Reveal delay={i * 0.08} className="py-6 md:py-8">
                  <p className="text-base leading-[1.55] text-ink md:text-lg">{point}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
