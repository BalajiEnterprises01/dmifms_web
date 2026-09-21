import Link from "next/link";
import { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import { StaffingData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal, Rule } from "@/components/motion/Reveal";
import NumberedRows from "@/components/pages/NumberedRows";
import StatFigures from "@/components/pages/StatFigures";

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

const pad = (n: number) => String(n).padStart(2, "0");

export default function StaffingPage() {
  const data = readJSON<StaffingData>("staffing");
  const stats = data.hero.stats ?? [];

  return (
    <>
      <PageHero
        badge={data.hero.badge}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        description={data.hero.description}
        bgImage={data.hero.image}
      />

      {/* ── Highlight + figures ── */}
      <section className="site-container py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <Reveal className="col-span-12 md:col-span-3">
            <h2 className="text-sm font-semibold text-ink">At a glance</h2>
          </Reveal>
          <div className="col-span-12 md:col-span-9">
            <Reveal delay={0.08}>
              <blockquote className="max-w-5xl text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-ink">
                “{data.hero.highlight}”
              </blockquote>
            </Reveal>
            {stats.length > 0 && (
              <div className="mt-14 border-t border-ink/10 pt-10 md:mt-20 md:pt-14">
                <StatFigures stats={stats} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Offerings ── */}
      <section className="site-container py-20 md:py-32">
        <SectionIntro label="Our staffing offerings" />
        <NumberedRows items={data.offerings} className="mt-12 md:mt-16" />
      </section>

      {/* ── Benefits + enquiry ── */}
      <section className="site-container py-20 md:py-32">
        <SectionIntro label="Why choose our staffing?" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <Rule />
            <ol>
              {benefits.map((point, i) => (
                <li key={point}>
                  <Reveal className="grid grid-cols-12 gap-x-6 py-6 md:py-8">
                    <span className="col-span-2 pt-1.5 text-[11px] font-semibold tracking-[0.16em] text-tan tabular-nums md:pt-2">
                      ({pad(i + 1)})
                    </span>
                    <p className="col-span-10 text-lg leading-[1.4] tracking-[-0.01em] text-ink md:text-xl">
                      {point}
                    </p>
                  </Reveal>
                  <Rule />
                </li>
              ))}
            </ol>
          </div>

          <Reveal
            delay={0.12}
            className="col-span-12 self-start bg-night p-8 text-paper md:p-10 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-tan uppercase">
              Get started
            </p>
            <h3 className="mt-6 text-[clamp(2rem,3.2vw,3rem)] leading-[0.98] font-normal tracking-[-0.035em] text-paper uppercase">
              Need the right people?
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-paper/70">
              Tell us your staffing requirement and we&apos;ll build a customized workforce
              solution for your facility.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-paper px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase transition-colors duration-500 hover:bg-sand">
              Discuss your needs
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
