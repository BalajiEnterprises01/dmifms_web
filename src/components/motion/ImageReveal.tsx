"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { EASE_LUXE, EASE_SOFT } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  /** Sizing/positioning for the frame (it must have a height). */
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
  /** Drift the image inside its frame while scrolling. */
  parallax?: boolean;
  /** Background behind the frame, so the curtains match it. */
  curtainClassName?: string;
  /** Start the reveal now instead of when scrolled into view. */
  play?: boolean;
}

/**
 * Image that opens from a centre seam: two curtains the colour of the
 * section slide apart while the photo settles from a slight zoom.
 * Transform-only, so it stays on the compositor.
 */
export default function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority,
  delay = 0,
  parallax = false,
  curtainClassName = "bg-paper",
  play,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const open = play ?? inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Parallax needs 8% overscan top and bottom to drift into; without it
          the photo fits the frame exactly, so nothing is cropped. */}
      <motion.div
        className={parallax ? "absolute -inset-y-[8%] inset-x-0" : "absolute inset-0"}
        style={parallax ? { y: drift } : undefined}>
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.18 }}
          animate={open ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, delay, ease: EASE_SOFT }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", imageClassName)}
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-[50.5%]", curtainClassName)}
        initial={{ y: "0%" }}
        animate={open ? { y: "-100%" } : undefined}
        transition={{ duration: 1.25, delay, ease: EASE_LUXE }}
      />
      <motion.div
        aria-hidden
        className={cn("absolute inset-x-0 bottom-0 h-[50.5%]", curtainClassName)}
        initial={{ y: "0%" }}
        animate={open ? { y: "100%" } : undefined}
        transition={{ duration: 1.25, delay, ease: EASE_LUXE }}
      />
    </div>
  );
}
