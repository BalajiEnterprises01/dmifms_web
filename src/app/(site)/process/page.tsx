import type { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import type { ProcessPageData, ProcessStep } from "@/types";
import PageHero from "@/components/layout/PageHero";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "DM23 IFMS 9-step implementation process — from pre-deployment to stabilization.",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503945438517-f65904a52ce6?q=80&w=2670&auto=format&fit=crop";

export default function ProcessPage() {
  const steps = readJSON<ProcessStep[]>("process");
  const { hero } = readJSON<ProcessPageData>("process-page");

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Our Process" }]}
        badge={hero.badge}
        title={hero.title}
        titleAccent={hero.titleAccent}
        description={hero.description}
        bgImage={hero.image || FALLBACK_IMAGE}
        imageAlt="Process and Engineering"
        stats={hero.stats}
      />
      <ProcessSection steps={steps} />
      <CTASection />
    </>
  );
}
