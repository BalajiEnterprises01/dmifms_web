import { readJSON } from "@/lib/jsonCMS";
import type {
  AboutData,
  ContactData,
  Differentiator,
  HeroData,
  Industry,
  IndustriesPageData,
  ProcessPageData,
  ProcessStep,
  QualityData,
  Service,
  ServicesPageData,
  Testimonial,
  VisionMissionData,
} from "@/types";
import HomeHero from "@/components/home/HomeHero";
import WhySection from "@/components/home/WhySection";
import NumbersSection from "@/components/home/NumbersSection";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import CategoryIndex, { type CategoryGroup } from "@/components/home/CategoryIndex";
import IndustriesSlider from "@/components/home/IndustriesSlider";
import FoundationStack, { type FoundationCard } from "@/components/home/FoundationStack";
import Testimonials from "@/components/home/Testimonials";
import SectionIntro from "@/components/common/SectionIntro";
import ContactForm from "@/components/sections/ContactForm";

export default function HomePage() {
  const hero = readJSON<HeroData>("hero");
  const about = readJSON<AboutData>("about");
  const differentiators = readJSON<Differentiator[]>("why-choose-us");
  const services = readJSON<Service[]>("services")
    .filter((s) => s.status)
    .sort((a, b) => a.order - b.order);
  const servicesPage = readJSON<ServicesPageData>("services-page");
  const industries = readJSON<Industry[]>("industries")
    .filter((i) => i.status)
    .sort((a, b) => a.order - b.order);
  const industriesPage = readJSON<IndustriesPageData>("industries-page");
  const visionMission = readJSON<VisionMissionData>("vision-mission");
  const quality = readJSON<QualityData>("quality");
  const processSteps = readJSON<ProcessStep[]>("process").filter((s) => s.status);
  const processPage = readJSON<ProcessPageData>("process-page");
  const testimonials = readJSON<Testimonial[]>("testimonials");
  const contact = readJSON<ContactData>("contact");

  // Group services by category, keeping first-seen category order.
  const categories = services.reduce<CategoryGroup[]>((groups, service) => {
    const group = groups.find((g) => g.id === service.category);
    if (group) group.services.push(service);
    else groups.push({ id: service.category, label: service.categoryLabel, services: [service] });
    return groups;
  }, []);

  const foundation: FoundationCard[] = [
    {
      id: "vision",
      heading: visionMission.vision.title,
      lead: visionMission.vision.description,
      points: [],
      image: "/images/about/team.jpg",
      href: "/about",
      hrefLabel: "About DM23",
    },
    {
      id: "mission",
      heading: visionMission.mission.title,
      points: visionMission.mission.points,
      image: "/images/hero-slides/photo-1497366216548-37526070297c.avif",
    },
    {
      id: "quality",
      heading: quality.title,
      lead: quality.description,
      points: quality.hierarchy.map((level) => level.level),
      image: "/images/services/office-assistance-hd.jpg",
    },
    {
      id: "process",
      heading: "Our transition process",
      lead: processPage.hero.description,
      points: processSteps.map((step) => step.title),
      image: "/images/hero-slides/1774893480525-6s63deb81en.jpg",
      href: "/process",
      hrefLabel: "See the full process",
    },
  ];

  return (
    <>
      <HomeHero data={hero} />
      <WhySection intro={about.title} items={differentiators} />
      <NumbersSection stats={hero.stats} />
      <ServicesShowcase services={services} intro={servicesPage.hero.description} />
      <CategoryIndex categories={categories} intro={about.description} />
      <IndustriesSlider industries={industries} intro={industriesPage.hero.description} />
      <FoundationStack intro={hero.description} cards={foundation} />
      <Testimonials items={testimonials} />
      <section id="contact" className="site-container py-20 md:py-32">
        <SectionIntro label="Contact us">{contact.subtitle}</SectionIntro>
        <div className="mt-12 md:mt-16">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
