"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Process", href: "/process" },
      { label: "Staffing Solutions", href: "/staffing" },
      { label: "Waste Management", href: "/waste-management" },
      { label: "Additional Services", href: "/additional-services" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-slate-100 py-1">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link
              href="/"
              aria-label="DMIFMS"
              className="flex items-center flex-shrink-0">
              <Image
                src="/images/logo/mobile_logo.png"
                alt="DMIFMS"
                width={40}
                height={40}
                className="h-20 w-20 lg:hidden"
                priority
              />
              <Image
                src="/images/logo/desktop_logo.png"
                alt="DMIFMS"
                width={170}
                height={40}
                className="hidden h-32 w-auto  lg:block"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}>
                    <button
                      className="flex items-center gap-1.5 py-2 text-sm font-semibold text-slate-700 hover:text-brand-blue transition-colors">
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === link.label ? "rotate-180" : "",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 min-w-[220px]">
                          <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-colors font-medium">
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "py-2 text-sm font-semibold transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left",
                      isActive(link.href)
                        ? "text-brand-blue after:scale-x-100 after:bg-brand-blue"
                        : "text-slate-700 hover:text-brand-blue after:bg-brand-blue",
                    )}>
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-5">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold bg-brand-navy text-white hover:bg-brand-blue transition-all duration-300 rounded">
                Get a Quote
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-slate-900 transition-colors">
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Inside header so it naturally flows down) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-40 lg:hidden bg-white shadow-2xl border-b border-slate-100 max-h-[calc(100vh-60px)] overflow-y-auto">
              <nav className="p-4 space-y-2">
                {navLinks.map((link) =>
                  link.children ? (
                    <div
                      key={link.label}
                      className="border-b border-slate-50 last:border-0 pb-2">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.label ? null : link.label,
                          )
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-bold text-slate-800 hover:bg-slate-50 transition-colors">
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-slate-400 transition-transform duration-300",
                            activeDropdown === link.label
                              ? "rotate-180 text-brand-blue"
                              : "",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden">
                            <div className="pl-4 pr-2 py-2 mt-1 space-y-1 bg-slate-50/50 rounded-xl border border-slate-100/50 mx-2">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:text-brand-blue hover:bg-white font-medium transition-all shadow-sm shadow-transparent hover:shadow-sm">
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div
                      key={link.href}
                      className="border-b border-slate-50 last:border-0 pb-2">
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 rounded-xl text-[15px] font-bold transition-all",
                          isActive(link.href)
                            ? "text-brand-blue bg-blue-50/50"
                            : "text-slate-800 hover:bg-slate-50",
                        )}>
                        {link.label}
                      </Link>
                    </div>
                  ),
                )}
                <div className="pt-4 mt-2 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-[15px] font-bold bg-brand-navy hover:bg-brand-blue text-white shadow-lg shadow-brand-navy/20 transition-all active:scale-[0.98]">
                    Get a Free Quote
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
