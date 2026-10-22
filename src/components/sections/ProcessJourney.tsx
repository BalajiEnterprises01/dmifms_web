import type { ProcessJourneyData } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal, Rule } from "@/components/motion/Reveal";

/**
 * The four stages of an engagement, drawn rather than shown as a picture:
 * a numbered band of stages, then the outcome each one builds towards.
 */
export default function ProcessJourney({ data }: { data: ProcessJourneyData }) {
  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro label={data.label}>
        Every DM23 engagement runs through the same four stages, so you always know what happens
        next and who is accountable for it.
      </SectionIntro>

      <ol className="mt-12 grid grid-cols-1 gap-x-6 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
        {data.stages.map((stage, i) => (
          <li key={stage.id} className="relative">
            <Reveal delay={i * 0.08} className="h-full pt-6 pb-10 md:pt-8 md:pb-0">
              <Rule />
              <div className="flex items-baseline gap-4 pt-6 md:pt-8">
                <span className="text-eyebrow font-semibold tracking-[0.16em] text-tan tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* The thread that links one stage to the next, desktop only. */}
                <span aria-hidden className="hidden h-px flex-1 bg-gold/40 lg:block" />
              </div>

              <h3 className="mt-5 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:text-row">
                {stage.title}
              </h3>
              <p className="mt-4 max-w-sm text-body leading-[1.7] text-clay">{stage.lead}</p>

              <ul className="mt-6 border-t border-ink/10">
                {stage.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 border-b border-ink/10 py-3 text-base leading-snug text-ink">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* What the four stages add up to. */}
      <div className="mt-16 bg-night px-6 py-10 text-paper md:mt-24 md:px-10 md:py-12">
        <ol className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.outcomes.map((outcome, i) => (
            <li key={outcome.id}>
              <Reveal delay={i * 0.08}>
                <p className="text-eyebrow font-semibold tracking-[0.16em] text-gold-soft uppercase">
                  {outcome.title}
                </p>
                <p className="mt-3 text-lg leading-snug text-paper/80">{outcome.caption}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
