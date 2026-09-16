import Link from "next/link";
import { MaskLine, Reveal, Rule } from "@/components/motion/Reveal";

/** Rendered outside the site layout, so it sets its own paper background. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-paper text-ink">
      <div className="site-container flex w-full flex-1 flex-col justify-center py-20 md:py-32">
        <Reveal y={12}>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-clay uppercase">(Error)</p>
        </Reveal>

        <p
          aria-hidden
          className="mt-6 text-[clamp(7rem,26vw,22rem)] leading-[0.85] font-light tracking-[-0.06em] text-ink tabular-nums">
          <MaskLine>404</MaskLine>
        </p>

        <Rule className="mt-10 md:mt-14" />

        <div className="grid grid-cols-12 items-start gap-x-6 gap-y-6 pt-8 md:pt-10">
          <h1 className="col-span-12 text-2xl leading-[1.08] font-normal tracking-[-0.025em] text-ink uppercase md:col-span-4 md:text-[2rem]">
            (Page Not Found)
          </h1>
          <Reveal delay={0.08} className="col-span-12 md:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.7] text-clay">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </Reveal>
          <Reveal
            delay={0.16}
            className="col-span-12 flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-3 md:justify-end">
            <Link
              href="/"
              className="rounded-full bg-brand px-6 py-3 text-[11px] font-semibold tracking-[0.16em] text-paper uppercase transition-colors duration-500 hover:bg-brand-deep">
              Go Home
            </Link>
            <Link href="/contact" className="link-wipe">
              Contact Us <span aria-hidden>↗</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
