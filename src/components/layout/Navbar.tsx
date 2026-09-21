"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { primaryNav, siteLinks } from "@/lib/site-nav";
import { EASE_LUXE, EASE_SOFT } from "@/lib/animations";
import { useIntroDone } from "@/components/motion/IntroLoader";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const introDone = useIntroDone();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Tuck the header away while reading down the page; bring it back on any
  // upward scroll.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-paper transition-shadow duration-500",
          scrolled && !menuOpen && "shadow-[0_1px_0_0_var(--site-sand)]",
        )}
        initial={{ y: "-100%" }}
        animate={{ y: introDone && (!hidden || menuOpen) ? "0%" : "-100%" }}
        transition={{ duration: 0.8, ease: EASE_LUXE }}>
        <div className="mx-auto grid h-20 max-w-screen-2xl grid-cols-[1fr_auto] items-center gap-x-4 px-5 md:h-24 md:px-12 lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" aria-label="DM23 IFMS home" className="group justify-self-start">
            {/* Client logo (2026-09-21), taken from the transparent artwork in
                their brochure and cropped tight. */}
            <Image
              src="/images/logo/dm23_logo.png"
              alt="DM23 IFMS Pvt Ltd"
              width={1343}
              height={420}
              priority
              className="h-10 w-auto transition-transform duration-500 ease-soft group-hover:scale-[1.03] min-[360px]:h-12 md:h-15"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}>
                  <button
                    type="button"
                    aria-expanded={dropdownOpen}
                    onClick={() => setDropdownOpen((v) => !v)}
                    className={cn(
                      "nav-link py-3",
                      link.children.some((c) => isActive(c.href)) && "nav-link-active",
                    )}>
                    {link.label}
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35, ease: EASE_SOFT }}
                        className="absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3">
                        <ul className="border border-ink/10 bg-paper py-3 shadow-xl shadow-night/10">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center justify-between px-5 py-2.5 text-[13px] font-medium text-clay transition-colors hover:text-ink",
                                  isActive(child.href) && "text-ink",
                                )}>
                                {child.label}
                                <span aria-hidden className="text-tan">↗</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn("nav-link py-3", isActive(link.href) && "nav-link-active")}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center justify-self-end gap-4 md:gap-5">
            {/* Visible at every width: the old header hid this below md, so
                phones never showed a quote CTA. */}
            <Link
              href="/contact"
              className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-brand px-4 text-[11px] font-bold tracking-[0.12em] whitespace-nowrap text-paper uppercase transition-colors duration-500 hover:bg-brand-deep sm:px-6 sm:text-xs sm:tracking-[0.14em]">
              Get a quote
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-10 items-center gap-3 text-[11px] font-semibold tracking-[0.16em] text-ink uppercase lg:hidden">
              <span className="hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-500 ease-luxe",
                    menuOpen && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-500 ease-luxe",
                    menuOpen && "-translate-y-1.25 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: EASE_LUXE }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper px-5 pt-28 pb-10 md:px-12 md:pt-32 lg:hidden">
            <nav aria-label="Mobile" className="flex-1">
              <ul>
                {siteLinks.map((link, i) => (
                  <li key={link.href} className="border-b border-ink/10">
                    <Link
                      href={link.href}
                      className="flex items-baseline justify-between gap-4 overflow-hidden py-4">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.05, ease: EASE_SOFT }}
                        className={cn(
                          "block text-3xl font-normal tracking-tight uppercase sm:text-4xl",
                          isActive(link.href) ? "text-ink" : "text-ink/60",
                        )}>
                        {link.label}
                      </motion.span>
                      <span className="text-xs font-medium text-tan tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-xs font-semibold tracking-[0.16em] text-paper uppercase">
                Get a quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
