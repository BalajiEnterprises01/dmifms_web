import { readJSON } from "@/lib/jsonCMS";
import type { SectionsData, Service, ServiceCategory, ServiceSection } from "@/types";


/** Active services, in display order. */
export function getServices(): Service[] {
  return readJSON<Service[]>("services")
    .filter((s) => s.status)
    .sort((a, b) => a.order - b.order);
}

/** The four service sections, in display order. */
export function getSections(): ServiceSection[] {
  return readJSON<SectionsData>("sections").sections;
}

export function getSection(slug: string): ServiceSection | undefined {
  return getSections().find((s) => s.slug === slug);
}

export function servicesInSection(id: ServiceCategory, services = getServices()): Service[] {
  return services.filter((s) => s.category === id);
}
