import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  size?: "sm" | "md" | "lg";
  bgImage?: string;
  centered?: boolean;
}

export default function PageHero({
  badge,
  title,
  titleAccent,
  description,
  breadcrumbs,
  className,
  size = "md",
  bgImage = "https://illustrations.popsy.co/blue/team-collaboration.svg",
  centered = true,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-brand-dark text-white flex items-center justify-center text-center",
        size === "sm"
          ? "pt-28 pb-14 min-h-[40vh]"
          : size === "lg"
            ? "pt-36 pb-24 min-h-[70vh]"
            : "pt-32 pb-20 min-h-[50vh]",
        className,
      )}>
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover object-center blur-2xl scale-110 opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-[#050D1E]/70" />

        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-brand-dark to-transparent" />
      </div>

      {/* ── Content ── */}
      <div
        className={cn(
          "relative z-10 w-full container-max section-padding flex flex-col items-center",
          centered && "text-center",
        )}>
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav
            className={cn(
              "flex items-center gap-2 mb-8 text-sm text-slate-300 font-medium bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10",
              centered && "justify-center",
            )}>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-500" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className={cn("mb-6", centered && "flex justify-center")}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase text-white/90 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              {badge}
            </div>
          </div>
        )}

        {/* Heading */}
        <h1
          className={cn(
            "font-black text-white leading-[1.1] tracking-tight drop-shadow-lg",
            size === "sm"
              ? "text-4xl md:text-5xl"
              : size === "lg"
                ? "text-6xl md:text-7xl lg:text-8xl"
                : "text-5xl md:text-6xl",
            centered && "max-w-4xl mx-auto",
          )}>
          {title}
          {titleAccent && (
            <>
              {" "}
              <span
                className="block mt-2 drop-shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #60A5FA 0%, #93C5FD 50%, #E0F2FE 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                {titleAccent}
              </span>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "mt-8 text-slate-300 leading-relaxed font-medium drop-shadow-md",
              size === "sm"
                ? "text-base max-w-2xl"
                : "text-lg md:text-xl max-w-3xl",
              centered && "mx-auto",
            )}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
