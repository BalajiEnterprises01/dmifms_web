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
      { label: "Staffing Solutions", href: "/staffing" },
      { label: "Waste Management", href: "/waste-management" },
      { label: "Additional Services", href: "/additional-services" },
    ],
  },
];

/** Flat sitemap used by the mobile menu and the footer. */
export const siteLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/process" },
  { label: "Staffing Solutions", href: "/staffing" },
  { label: "Waste Management", href: "/waste-management" },
  { label: "Additional Services", href: "/additional-services" },
  { label: "Contact", href: "/contact" },
];
