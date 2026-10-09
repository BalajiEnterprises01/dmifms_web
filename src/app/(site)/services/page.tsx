import { Suspense } from "react";
import type { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import { getSections, getServices } from "@/lib/services";
import type { ServicesPageData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import CTASection from "@/components/sections/CTASection";
import ServicesIndex from "@/components/services/ServicesIndex";

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = readJSON<ServicesPageData>("services-page");
  return { title: hero.badge, description: hero.description };
}

export default function ServicesPage() {
  const { hero } = readJSON<ServicesPageData>("services-page");
  const services = getServices();
  const sections = getSections();

  return (
    <>
      <PageHero
        badge={hero.badge}
        title={hero.title}
        titleAccent={hero.titleAccent}
        description={hero.description}
        breadcrumbs={[{ label: "Services" }]}
        bgImage={hero.image}
      />

      {/* The filter reads ?category= on the client (useSearchParams). */}
      <Suspense fallback={null}>
        <ServicesIndex services={services} sections={sections} />
      </Suspense>

      <CTASection />
    </>
  );
}
