import Link from "next/link";

/**
 * The ClickShift mark: "the sawtooth shift".
 * Three rising teeth draw a factory's sawtooth roof and a growth curve at once; the square spark ahead of the
 * last tooth is the click: the next thing, already in motion. Works from 16px favicons to billboards.
 */
export function Mark({
  size = 36,
  variant = "tile",
  className = "",
  title = "ClickShift",
}: {
  size?: number;
  variant?: "tile" | "signal" | "mono";
  className?: string;
  title?: string;
}) {
  const tile = variant === "tile" ? "#0B0C10" : variant === "signal" ? "#D4FF3A" : "none";
  const teeth = variant === "tile" ? "#D4FF3A" : variant === "signal" ? "#0B0C10" : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant !== "mono" && <rect width="48" height="48" rx="12" fill={tile} />}
      <path d="M9 37 L18 29 L18 37 Z M18 37 L27 21 L27 37 Z M27 37 L36 13 L36 37 Z" fill={teeth} />
      <rect x="37" y="6" width="5.5" height="5.5" rx="1.2" fill={teeth} />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  // tone = colour of the background the logo sits on
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="ClickShift home">
      <Mark size={34} variant={tone === "dark" ? "signal" : "tile"} className="transition-transform duration-300 group-hover:-rotate-6" />
      <span
        className={`font-display text-[1.32rem] font-semibold tracking-[-0.035em] ${tone === "dark" ? "text-paper" : "text-ink"}`}
      >
        ClickShift
      </span>
    </Link>
  );
}
