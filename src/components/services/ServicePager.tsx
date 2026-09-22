import Link from "next/link";
import type { Service } from "@/types";
import { Reveal } from "@/components/motion/Reveal";

interface ServicePagerProps {
  prev: Service;
  next: Service;
}

const LABEL = "text-[12px] font-semibold tracking-[0.16em] text-clay uppercase";
const TITLE =
  "text-2xl leading-[1.08] font-normal tracking-[-0.025em] break-words text-ink uppercase transition-colors duration-500 group-hover:text-clay md:text-[1.875rem]";

/** Previous / next service across the whole catalogue. */
export default function ServicePager({ prev, next }: ServicePagerProps) {
  return (
    <nav aria-label="More services" className="site-container pb-20 md:pb-32">
      <Reveal className="grid grid-cols-1 border-y border-ink/10 sm:grid-cols-2">
        <Link
          href={`/services/${prev.slug}`}
          className="group flex flex-col gap-4 py-8 sm:border-r sm:border-ink/10 sm:py-12 sm:pr-6">
          <span className={LABEL}>
            <span aria-hidden>←</span> Previous service
          </span>
          <span className={TITLE}>({prev.title})</span>
        </Link>
        <Link
          href={`/services/${next.slug}`}
          className="group flex flex-col gap-4 border-t border-ink/10 py-8 sm:items-end sm:border-t-0 sm:py-12 sm:pl-6 sm:text-right">
          <span className={LABEL}>
            Next service <span aria-hidden>→</span>
          </span>
          <span className={TITLE}>({next.title})</span>
        </Link>
      </Reveal>
    </nav>
  );
}
