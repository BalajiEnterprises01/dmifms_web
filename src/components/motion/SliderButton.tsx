"use client";

import { cn } from "@/lib/utils";

interface SliderButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/**
 * Round slider control in the logo navy: solid fill, paper arrow, deeper
 * navy on hover. Disabled state drops to an outline so the end of a
 * carousel is obvious.
 */
export default function SliderButton({
  direction,
  onClick,
  disabled,
  label,
  className,
}: SliderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label ?? (direction === "prev" ? "Previous" : "Next")}
      className={cn(
        "group flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-paper transition-colors duration-500 hover:bg-brand-deep md:size-14",
        "disabled:cursor-default disabled:border disabled:border-brand/25 disabled:bg-transparent disabled:text-brand/35",
        className,
      )}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={cn(
          "size-5 transition-transform duration-500 ease-soft",
          direction === "prev"
            ? "group-enabled:group-hover:-translate-x-0.5"
            : "group-enabled:group-hover:translate-x-0.5",
        )}>
        <path
          d={direction === "prev" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
