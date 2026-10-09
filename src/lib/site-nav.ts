import type { NavLink } from "@/types";

/** Header navigation for the public site. */
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  {
    label: "Solutions",
    href: "#",
    children: [
      { label: "Soft Services", href: "/solutions/soft-services" },
      { label: "Man Power Services", href: "/solutions/man-power" },
      { label: "Specialized Services", href: "/solutions/specialized-services" },
      { label: "Repair & Maintenance", href: "/solutions/repair-maintenance" },
    ],
  },
];

/** Pages column in the footer: the service sections sit in their own column. */
export const companyLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

/** Flat sitemap used by the mobile menu. */
export const siteLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/process" },
  { label: "Soft Services", href: "/solutions/soft-services" },
  { label: "Man Power Services", href: "/solutions/man-power" },
  { label: "Specialized Services", href: "/solutions/specialized-services" },
  { label: "Repair & Maintenance", href: "/solutions/repair-maintenance" },
  { label: "Waste Management", href: "/waste-management" },
  { label: "Contact", href: "/contact" },
];
