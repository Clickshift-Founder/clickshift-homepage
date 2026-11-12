import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Factory-floor label: "UNIT 02 — WORK" */
export function Eyebrow({ n, children, tone = "light" }: { n?: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.22em] ${tone === "dark" ? "text-signal" : "text-cobalt"}`}
    >
      {n && <span className={tone === "dark" ? "text-stone" : "text-mute"}>{n} — </span>}
      {children}
    </p>
  );
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-[2.1rem] leading-[1.05] tracking-[-0.035em] sm:text-5xl ${className}`}>{children}</h2>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "signal" | "ink" | "cobalt" | "ghost-dark" | "ghost-light";
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "ink", className = "", external }: BtnProps) {
  const styles: Record<NonNullable<BtnProps["variant"]>, string> = {
    signal: "bg-signal text-ink hover:bg-white",
    ink: "bg-ink text-paper hover:bg-cobalt",
    cobalt: "bg-cobalt text-white hover:bg-cobalt-dark",
    "ghost-dark": "border border-white/20 text-paper hover:border-signal hover:text-signal",
    "ghost-light": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  };
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors duration-200 ${styles[variant]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden className={className}>
      <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden className={className}>
      <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wide ${
        tone === "dark" ? "bg-white/8 text-paper/80" : "bg-ink/6 text-ink/75"
      }`}
    >
      {children}
    </span>
  );
}

/** Page hero used by inner pages */
export function PageHero({
  n,
  eyebrow,
  title,
  intro,
  children,
}: {
  n: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="grid-dark relative overflow-hidden bg-ink pb-16 pt-32 text-paper sm:pb-24 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-signal/10 blur-3xl" />
      <Container>
        <Eyebrow n={n} tone="dark">
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] leading-[1] tracking-[-0.045em] sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">{intro}</p>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
