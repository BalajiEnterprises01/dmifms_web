import Link from "next/link";
import { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import { StaffingData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal, Rule } from "@/components/motion/Reveal";
import RuledRows from "@/components/pages/RuledRows";

export const metadata: Metadata = {
  title: "Staffing Solutions",
  description:
    "End-to-end staffing solutions: recruitment, onboarding, payroll, and MIS reporting.",
};

const benefits = [
  "Skilled, semi-skilled, technical and non-technical roles",
  "End-to-end BGV, documentation, induction, and site readiness",
  "Accurate payroll with statutory deductions and benefits admin",
  "Real-time MIS dashboards for performance and compliance tracking",
  "Dedicated compliance support for all statutory requirements",
];

export default function StaffingPage() {
  const data = readJSON<StaffingData>("staffing");

  return (
    <>
      <PageHero
        badge={data.hero.badge}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        description={data.hero.description}
        bgImage={data.hero.image}
      />

      {/* ── Highlight ── */}
      <section className="site-container py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <Reveal className="col-span-12 md:col-span-3">
            <h2 className="text-base font-semibold text-ink">At a glance</h2>
          </Reveal>
          <div className="col-span-12 md:col-span-9">
            <Reveal delay={0.08}>
              <blockquote className="max-w-5xl text-[clamp(1.625rem,3.3vw,3.25rem)] leading-[1.1] tracking-[-0.03em] text-ink">
                “{data.hero.highlight}”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Offerings ── */}
      <section className="site-container py-20 md:py-32">
        <SectionIntro label="Our staffing offerings" />
        <RuledRows items={data.offerings} className="mt-12 md:mt-16" />
      </section>

      {/* ── Benefits + enquiry ── */}
      <section className="site-container py-20 md:py-32">
        <SectionIntro label="Why choose our staffing?" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <Rule />
            <ul>
              {benefits.map((point) => (
                <li key={point}>
                  <Reveal className="py-6 md:py-8">
                    <p className="text-lg leading-[1.4] tracking-[-0.01em] text-ink md:text-xl">{point}</p>
                  </Reveal>
                  <Rule />
                </li>
              ))}
            </ul>
          </div>

          <Reveal
            delay={0.12}
            className="col-span-12 self-start bg-night p-8 text-paper md:p-10 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-gold-soft uppercase">
              Get started
            </p>
            <h3 className="mt-6 text-[clamp(1.875rem,3vw,2.75rem)] leading-[0.98] font-normal tracking-[-0.035em] text-paper uppercase">
              Need the right people?
            </h3>
            <p className="mt-6 max-w-md text-base leading-[1.7] text-paper/70">
              Tell us your staffing requirement and we&apos;ll build a customized workforce
              solution for your facility.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-paper px-6 py-3 text-[12px] font-semibold tracking-[0.16em] text-ink uppercase transition-colors duration-500 hover:bg-sand">
              Discuss your needs
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
