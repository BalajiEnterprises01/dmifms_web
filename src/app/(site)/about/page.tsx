import type { Metadata } from "next";
import { readJSON } from "@/lib/jsonCMS";
import type { AboutData, VisionMissionData } from "@/types";
import PageHero from "@/components/layout/PageHero";
import AboutSection from "@/components/sections/AboutSection";
import VisionMissionSection from "@/components/sections/VisionMissionSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DM23 IFMS, India's fast-growing facility management company with deep expertise in soft services.",
};

export default function AboutPage() {
  const aboutData = readJSON<AboutData>("about");
  const vmData = readJSON<VisionMissionData>("vision-mission");
  const { hero } = aboutData;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "About Us" }]}
        badge={hero.badge}
        title={hero.title}
        titleAccent={hero.titleAccent}
        description={hero.description}
        bgImage={hero.image}
        imageAlt="Team Collaboration"
        size="lg"
      />
      <AboutSection data={aboutData} />
      <VisionMissionSection data={vmData} />
    </>
  );
}
