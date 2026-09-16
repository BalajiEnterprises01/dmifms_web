"use client";

import { cn } from "@/lib/utils";

interface BracketButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

/** "( ‹ )" slider control: thin parentheses around a chevron. */
export default function BracketButton({
  direction,
  onClick,
  disabled,
  label,
  className,
}: BracketButtonProps) {
  const chevron = direction === "prev" ? "M27 14 L19 24 L27 34" : "M21 14 L29 24 L21 34";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label ?? (direction === "prev" ? "Previous" : "Next")}
      className={cn(
        "group relative flex h-12 w-12 items-center justify-center text-ink transition-opacity duration-500 md:h-16 md:w-16",
        "disabled:cursor-default disabled:opacity-25",
        className,
      )}>
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full" aria-hidden>
        <path
          d="M12 4 C3 14 3 34 12 44"
          stroke="currentColor"
          strokeWidth="1.25"
          className="transition-transform duration-500 ease-soft group-hover:-translate-x-0.75"
        />
        <path
          d="M36 4 C45 14 45 34 36 44"
          stroke="currentColor"
          strokeWidth="1.25"
          className="transition-transform duration-500 ease-soft group-hover:translate-x-0.75"
        />
        <path d={chevron} stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </button>
  );
}
