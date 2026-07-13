import { readJSON } from "@/lib/jsonCMS";
import { HeroData, AboutData, Service, Industry, ProcessStep, Differentiator } from "@/types";
import HeroSection from "@/components/sections/HeroSection";
import MarqueeBar from "@/components/sections/MarqueeBar";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  const heroData = readJSON<HeroData>("hero");
  const aboutData = readJSON<AboutData>("about");
  const services = readJSON<Service[]>("services");
  const industries = readJSON<Industry[]>("industries");
  const differentiators = readJSON<Differentiator[]>("why-choose-us");
  const processSteps = readJSON<ProcessStep[]>("process");

  return (
    <>
      <HeroSection data={heroData} />
      <MarqueeBar />
      <AboutSection data={aboutData} />
      <ServicesSection services={services} />
      <IndustriesSection industries={industries} />
      <WhyChooseUs differentiators={differentiators} />
      <ProcessSection steps={processSteps} />
      <CTASection />
    </>
  );
}
