import Link from "next/link";
import Counter from "@/components/motion/Counter";
import ImageReveal from "@/components/motion/ImageReveal";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageHeroStat {
  value: string;
  label: string;
  suffix?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  /** Trail after "Home". The last crumb without an href is the current page. */
  breadcrumbs?: Breadcrumb[];
  className?: string;
  /** Height of the image band and the spacing around it. */
  size?: "sm" | "md" | "lg";
  /** Photo shown as a full-width band under the heading. */
  bgImage?: string;
  /** Kept for compatibility; the editorial hero is always left-aligned. */
  centered?: boolean;
  /** Alt text for the image band (defaults to the title). */
  imageAlt?: string;
  /**
   * Show the whole photo at its 3:2 shape instead of a cropped full-width
   * band (service photos, where cropping cut off the subject).
   */
  fullImage?: boolean;
  /** Figures shown in a row under the hero. */
  stats?: PageHeroStat[];
}

const IMAGE_HEIGHT: Record<NonNullable<PageHeroProps["size"]>, string> = {
  sm: "h-[32svh] md:h-[44svh]",
  md: "h-[40svh] md:h-[56svh]",
  lg: "h-[46svh] md:h-[68svh]",
};

/** Illustrations (svg) and the old popsy.co default never render as a photo band. */
const isPhoto = (src: string | undefined): src is string =>
  !!src && !src.includes("popsy.co") && !/\.svg(\?|#|$)/i.test(src);

const formatCount = (n: number) => Math.round(n).toLocaleString("en-IN");

/**
 * Splits "5,000+" into a count and its symbol suffix. Returns null unless the
 * number reads back exactly as written (so "2023", "09", "5K+" or "24/7"
 * stay as static text instead of being reformatted by the counter).
 */
function splitStat(value: string): { count: number; rest: string } | null {
  const match = /^(\d[\d,]*)([^\w\s]*)$/.exec(value.trim());
  if (!match) return null;
  const count = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(count) || formatCount(count) !== match[1]) return null;
  return { count, rest: match[2] };
}

interface StatFigureProps {
  value: string;
  suffix?: string;
  className?: string;
}

/** Large light figure; counts up when the value is a plain number. */
export function StatFigure({ value, suffix = "", className }: StatFigureProps) {
  const split = splitStat(value);
  const tail = `${split ? split.rest : ""}${suffix}`;

  return (
    <span
      className={cn(
        "flex items-start text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-light tracking-[-0.05em] text-ink tabular-nums",
        className,
      )}>
      {split ? <Counter value={split.count} /> : value}
      {tail && <span className="mt-1 ml-1 text-[0.4em] tracking-normal text-clay">{tail}</span>}
    </span>
  );
}

/** Inner-page hero: display heading, badge, description, optional photo band and figures. */
export default function PageHero({
  badge,
  title,
  titleAccent,
  description,
  breadcrumbs,
  className,
  size = "md",
  bgImage,
  imageAlt,
  fullImage = false,
  stats,
}: PageHeroProps) {
  const image = isPhoto(bgImage) ? bgImage : undefined;

  return (
    <section
      className={cn(
        "site-container pt-32 md:pt-40",
        size === "sm" ? "pb-8 md:pb-12" : "pb-12 md:pb-16",
        className,
      )}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Reveal y={12} className="mb-8 md:mb-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">
              <li>
                <Link href="/" className="-my-3 inline-block py-3 transition-colors duration-500 hover:text-ink">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-x-2">
                  <span aria-hidden className="text-tan">
                    /
                  </span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="-my-3 inline-block py-3 transition-colors duration-500 hover:text-ink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      )}

      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-6">
        <h1 className="col-span-12 text-[clamp(2.4rem,5.6vw,6rem)] leading-[0.95] font-normal tracking-[-0.04em] break-words text-ink uppercase lg:col-span-9">
          <MaskLine delay={0.05}>{title}</MaskLine>
          {titleAccent && <MaskLine delay={0.15}>{titleAccent}</MaskLine>}
        </h1>
        {badge && (
          <Reveal
            delay={0.35}
            className="col-span-12 lg:col-span-3 lg:justify-self-end lg:pt-3 lg:text-right">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">{badge}</p>
          </Reveal>
        )}
      </div>

      {description && (
        <div className="mt-8 grid grid-cols-12 gap-x-6 md:mt-12">
          <Reveal
            delay={0.45}
            className="col-span-12 md:col-span-8 md:col-start-4 lg:col-span-5 lg:col-start-4">
            <p className="max-w-xl text-[15px] leading-[1.7] text-clay">{description}</p>
          </Reveal>
        </div>
      )}

      {image && (
        <ImageReveal
          src={image}
          alt={imageAlt ?? [title, titleAccent].filter(Boolean).join(" ")}
          sizes="100vw"
          play
          parallax={!fullImage}
          priority
          delay={0.25}
          className={cn("mt-10 md:mt-14", fullImage ? "aspect-[3/2] bg-sand" : IMAGE_HEIGHT[size])}
          curtainClassName="bg-paper"
        />
      )}

      {stats && stats.length > 0 && (
        <div className="mt-12 md:mt-16">
          <Rule />
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 pt-8 md:grid-cols-3 md:pt-10 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <li key={stat.label}>
                <Reveal delay={i * 0.08}>
                  <StatFigure value={stat.value} suffix={stat.suffix} />
                  <p className="mt-4 text-[13px] leading-snug text-clay">{stat.label}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
