import Link from "next/link";
import type { ProcessStep } from "@/types";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";

interface ProcessSectionProps {
  steps: ProcessStep[];
  /** Adds a "View detailed process" link (omit on the process page itself). */
  href?: string;
}

/** Sticky heading beside the numbered transition steps. */
export default function ProcessSection({ steps, href }: ProcessSectionProps) {
  const active = steps.filter((s) => s.status);

  return (
    <section className="site-container py-20 md:py-32">
      <SectionIntro
        label="Our methodology"
        aside={
          href ? (
            <Link href={href} className="link-wipe">
              View detailed process <span aria-hidden>↗</span>
            </Link>
          ) : undefined
        }>
        A proven eight-step transition methodology, from site assessment to full stabilization. We
        leave nothing to chance.
      </SectionIntro>

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-16">
        <div className="col-span-12 self-start lg:sticky lg:top-32 lg:col-span-5">
          <h3 className="text-[clamp(2rem,4.8vw,4.75rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase">
            <MaskLine>How We Deliver.</MaskLine>
            <MaskLine delay={0.08}>Flawless Execution.</MaskLine>
          </h3>
        </div>

        <ol className="col-span-12 lg:col-span-7">
          <Rule />
          {active.map((step) => (
            <li key={step.id}>
              <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 py-8 md:py-11">
                <p className="col-span-12 pt-1 text-[11px] font-semibold tracking-[0.16em] text-tan uppercase tabular-nums sm:col-span-3 md:pt-3">
                  Step {step.step}
                </p>
                <div className="col-span-12 sm:col-span-9">
                  <h4 className="text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:text-[2rem]">
                    ({step.title})
                  </h4>
                  <p className="mt-4 max-w-md text-[15px] leading-[1.7] text-clay">{step.description}</p>
                </div>
              </Reveal>
              <Rule />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
