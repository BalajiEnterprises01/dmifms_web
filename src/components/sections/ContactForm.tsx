import { readJSON } from "@/lib/jsonCMS";
import type { Service } from "@/types";
import ContactFormClient from "@/components/sections/ContactFormClient";

/**
 * Server wrapper: builds the "I'm looking for" options from the services
 * content, so the enquiry form always matches what the site offers.
 */
export default function ContactForm() {
  const serviceOptions = readJSON<Service[]>("services")
    .filter((s) => s.status)
    .sort((a, b) => a.order - b.order)
    .map((s) => s.title);

  return (
    <ContactFormClient
      serviceOptions={[...serviceOptions, "Total Facility Management (TFM)", "Other"]}
    />
  );
}
