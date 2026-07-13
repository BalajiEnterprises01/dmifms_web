// ─── Hero ───────────────────────────────────────────────────────────────────
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroCTA {
  label: string;
  href: string;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  cta_label?: string;
  cta_href?: string;
}

export interface HeroData {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  slides: HeroSlide[];
  cta_primary: HeroCTA;
  cta_secondary: HeroCTA;
  stats: HeroStat[];
  status: boolean;
}

// ─── About ──────────────────────────────────────────────────────────────────
export interface Differentiator {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface AboutStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface AboutHeroStat {
  value: string;
  label: string;
}

export interface AboutData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    image: string;
    stats: AboutHeroStat[];
  };
  title: string;
  description: string;
  stats: AboutStat[];
  image: string;
  status: boolean;
}

// ─── Vision & Mission ───────────────────────────────────────────────────────
export interface VisionMissionData {
  vision: {
    title: string;
    description: string;
    icon: string;
  };
  mission: {
    title: string;
    points: string[];
    icon: string;
  };
  status: boolean;
}

// ─── Services ───────────────────────────────────────────────────────────────
export type ServiceCategory = "facility" | "operational" | "business";

export interface ServicesPageData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    stats: { value: string; label: string }[];
    image: string;
    secondaryImage: string;
  };
  status: boolean;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  categoryLabel: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  status: boolean;
  order: number;
}

// ─── Industries ─────────────────────────────────────────────────────────────
export interface IndustriesPageData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    image: string;
  };
  status: boolean;
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  services: string[];
  status: boolean;
  order: number;
}

// ─── Process ────────────────────────────────────────────────────────────────
export interface ProcessPageData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    image: string;
    stats: { value: string; label: string }[];
  };
  status: boolean;
}

export interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: boolean;
}

// ─── Quality ────────────────────────────────────────────────────────────────
export interface HierarchyLevel {
  id: number;
  level: string;
  description: string;
  icon: string;
}

export interface QualityData {
  badge: string;
  title: string;
  description: string;
  hierarchy: HierarchyLevel[];
  status: boolean;
}

// ─── Staffing ───────────────────────────────────────────────────────────────
export interface StaffingOffering {
  id: string | number;
  title: string;
  description?: string;
  icon: string;
  features: string[];
  color?: string;
}

export interface StaffingData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    highlight: string;
    image: string;
    stats: { value: string; label: string }[];
  };
  offerings: StaffingOffering[];
  status: boolean;
}

// ─── Waste Management ───────────────────────────────────────────────────────
export interface WasteLever {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface WasteExcellenceFactor {
  id: string | number;
  title: string;
  description: string;
  icon: string;
}

export interface WasteData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    stats: { value: string; label: string }[];
  };
  badge: string;
  title: string;
  description: string;
  levers: WasteLever[];
  excellence_factors: WasteExcellenceFactor[];
  status: boolean;
}

// ─── Production ─────────────────────────────────────────────────────────────
export interface ProductionService {
  id: number;
  title: string;
  icon: string;
  status: boolean;
}

export interface ProductionData {
  badge: string;
  title: string;
  description: string;
  services: ProductionService[];
  status: boolean;
}

// ─── Additional Services ────────────────────────────────────────────────────
export interface AdditionalServiceItem {
  id: string | number;
  title: string;
  icon: string;
}

export interface AdditionalCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  services: AdditionalServiceItem[];
}

export interface AdditionalServicesData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
  };
  badge: string;
  title: string;
  description: string;
  categories: AdditionalCategory[];
  status: boolean;
}

// ─── Contact ────────────────────────────────────────────────────────────────
export interface ContactData {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    image: string;
    secondaryImage: string;
  };
  badge: string;
  title: string;
  subtitle: string;
  address: string;
  email: string;
  phone: string;
  map_embed: string;
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  status: boolean;
}

// ─── Common ─────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface AnimationProps {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  once?: boolean;
}

// ─── Leads (contact form submissions) ───────────────────────────────────────
export interface ContactLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}
