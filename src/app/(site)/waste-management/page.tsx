import Link from "next/link";
import { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import { WasteData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionIntro from "@/components/common/SectionIntro";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";
import RuledRows from "@/components/pages/RuledRows";

export const metadata: Metadata = {
  title: "Waste Management Excellence | DMIFMS",
  description: "Sustainable waste management solutions: source segregation, organic composting, and tech-driven SOPs.",
};

// waste.json has no hero image; reuse the waste-management service photo.
const HERO_IMAGE = "/images/services/waste-management-hd.jpg";

const pillClass =
  "inline-flex rounded-full bg-brand px-6 py-3 text-[12px] font-semibold tracking-[0.16em] text-paper uppercase transition-colors duration-500 hover:bg-brand-deep";

export default function WasteManagementPage() {
  const data = readJSON<WasteData>("waste");

  return (
    <>
      <PageHero
        badge={data.hero.badge}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        description={data.hero.description}
        bgImage={HERO_IMAGE}
      />

      {/* ── Actions ── */}
      <section className="site-container pt-4 md:pt-8">
        <Reveal className="flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink/10 pt-10 md:pt-14">
          <Link href="/contact" className={pillClass}>
            Start your green journey
          </Link>
          <a href="#excellence" className="link-wipe">
            Explore our framework <span aria-hidden>↓</span>
          </a>
        </Reveal>
      </section>

      {/* ── Core levers ── */}
      <section className="site-container py-20 md:py-32">
        <SectionIntro label="Three pillars of waste excellence" />
        <ul className="mt-12 grid grid-cols-1 gap-x-6 md:mt-16 md:grid-cols-3">
          {data.levers.map((lever, i) => (
            <li key={lever.id}>
              <Rule delay={i * 0.08} />
              <Reveal delay={i * 0.08} className="pt-6 pb-12 md:pt-8 md:pb-0">
                <h3 className="text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase lg:text-[1.875rem]">
                  {lever.title}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-[1.7] text-clay">
                  {lever.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Excellence framework ── */}
      <section
        id="excellence"
        className="site-container scroll-mt-20 py-20 md:scroll-mt-24 md:py-32">
        <SectionIntro label="Our framework">
          We don&apos;t just manage waste; we implement a rigorous framework designed to protect
          health, ensure compliance, and maximize sustainability outcomes.
        </SectionIntro>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-16">
          <div className="col-span-12 self-start lg:sticky lg:top-32 lg:col-span-5">
            <h3 className="text-[clamp(1.875rem,3.7vw,3.5rem)] leading-[0.95] font-normal tracking-[-0.04em] text-ink uppercase">
              <MaskLine>Driving</MaskLine>
              <MaskLine delay={0.08}>Consistency &amp;</MaskLine>
              <MaskLine delay={0.16}>Compliance</MaskLine>
            </h3>
            <Reveal delay={0.24} className="mt-10">
              <Link href="/contact" className={pillClass}>
                Consult with an expert
              </Link>
            </Reveal>
          </div>

          <RuledRows
            items={data.excellence_factors}
            layout="stacked"
            as="h4"
            className="col-span-12 lg:col-span-7"
          />
        </div>
      </section>

      <CTASection />
    </>
  );
}
