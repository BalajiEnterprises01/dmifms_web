import type { Service, ServiceSection } from "@/types";

/**
 * Where a service card links: its own page, an override (waste management
 * keeps its own page), or the section page that lists it.
 *
 * Kept free of `jsonCMS` so client components can import it without pulling
 * `fs` into the browser bundle.
 */
export function serviceHref(service: Service, sections: ServiceSection[]): string {
  if (service.href) return service.href;
  if (service.detail) return `/services/${service.slug}`;
  const section = sections.find((s) => s.id === service.category);
  return section ? `/solutions/${section.slug}` : "/services";
}
