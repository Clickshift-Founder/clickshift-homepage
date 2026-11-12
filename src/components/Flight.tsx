"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PILLARS } from "@/lib/pillars";

// The flight to 2045: an aircraft that travels from today to 2045 as you scroll.
// FlightProgress rides the bottom edge of the navbar on every page; FlightTo2045 is the full scene on the home page.

const START_YEAR = 2026;
const END_YEAR = 2045;

// Nose points along +x. Drawn around (0,0) so it can be rotated to the path's tangent.
const PLANE =
  "M16 0 C16 -1.6 14 -2.3 12 -2.3 L3 -2.3 L-5 -12.5 L-8.6 -12.5 L-3 -2.3 L-11 -2.3 L-14.6 -7 L-17 -7 L-15.6 -1.4 L-15.6 1.4 L-17 7 L-14.6 7 L-11 2.3 L-3 2.3 L-8.6 12.5 L-5 12.5 L3 2.3 L12 2.3 C14 2.3 16 1.6 16 0 Z";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/* ---------- A thin flight line under the navbar: how far through the page you are ---------- */
export function FlightProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-0">
      <div className="absolute inset-x-0 -bottom-px h-px bg-white/5" />
      <div className="absolute -bottom-px left-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-signal" style={{ width: `${p * 100}%` }} />
      <div
        className="absolute -bottom-[7px] flex items-center gap-1.5 transition-opacity duration-300"
        style={{ left: `calc(${p * 100}% - ${p * 16}px)`, opacity: p > 0.005 ? 1 : 0 }}
      >
        <svg width="14" height="14" viewBox="-18 -14 36 28" className="text-signal">
          <path d={PLANE} fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- The full scene on the home page ---------- */
const STOPS = PILLARS.map((p, i) => ({ ...p, at: 0.1 + i * 0.2, year: [2026, 2031, 2035, 2040, 2045][i] }));

// A gentle climb from the factory on the left to 2045 on the upper right.
const PATH = "M40 420 C 180 420, 230 330, 330 300 S 520 250, 600 200 S 780 110, 960 70";

export function FlightTo2045() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const flown = useRef<SVGPathElement>(null);
  const plane = useRef<SVGGElement>(null);
  const [p, setP] = useState(0);
  const [pts, setPts] = useState<{ x: number; y: number }[]>([]);
  const [still, setStill] = useState(false);

  // Where each checkpoint sits on the path.
  useEffect(() => {
    const el = path.current;
    if (!el) return;
    const len = el.getTotalLength();
    setPts(STOPS.map((s) => el.getPointAtLength(len * s.at)));
    if (flown.current) flown.current.style.strokeDasharray = `${len}`;
    setStill(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const el = path.current;
    const box = wrap.current;
    if (!el || !box) return;
    const len = el.getTotalLength();
    let raf = 0;
    const place = (q: number) => {
      const at = Math.max(0.0001, Math.min(0.9999, q));
      const a = el.getPointAtLength(len * at);
      const b = el.getPointAtLength(len * Math.min(1, at + 0.004));
      const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      plane.current?.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${deg}) scale(1.6)`);
      if (flown.current) flown.current.style.strokeDashoffset = `${len * (1 - q)}`;
    };
    const update = () => {
      raf = 0;
      if (still) {
        place(1);
        setP(1);
        return;
      }
      const r = box.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const q = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
      place(q);
      setP(q);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [still]);

  const year = Math.round(START_YEAR + p * (END_YEAR - START_YEAR));
  const activeIdx = STOPS.reduce((acc, s, i) => (p >= s.at - 0.05 ? i : acc), 0);
  const active = STOPS[activeIdx];

  return (
    <section aria-labelledby="flight-title" className="relative bg-ink text-paper">
      <div ref={wrap} className={still ? "" : "h-[300vh]"}>
        <div className={`${still ? "" : "sticky top-0 h-dvh"} grid-dark flex flex-col overflow-hidden`}>
          <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-cobalt/20 blur-[120px]" />
          <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-24 sm:px-6 sm:pt-28 lg:px-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-signal">The flight to 2045</p>
                <h2 id="flight-title" className="mt-3 max-w-xl font-display text-[2rem] leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                  Every build flies through five checkpoints.
                </h2>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">Now flying</p>
                <p className="font-display text-5xl tabular-nums tracking-[-0.05em] text-signal sm:text-7xl" aria-live="off">
                  {year}
                </p>
              </div>
            </div>

            <div className="relative mt-4 min-h-0 flex-1">
              <svg viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet" className="h-full max-h-[52vh] w-full" role="img" aria-label="A flight path from today to 2045 through five checkpoints: learn, secure, trace, sustain and care">
                {/* the factory at departure: the sawtooth roof from the logo */}
                <g opacity="0.55" transform="translate(6 404)">
                  <path d="M0 52 L22 32 L22 52 Z M22 52 L44 16 L44 52 Z M44 52 L66 0 L66 52 Z" fill="#2A2E38" />
                  <rect x="69" y="-8" width="9" height="9" fill="#D4FF3A" />
                </g>
                <path ref={path} d={PATH} fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
                <path ref={flown} d={PATH} fill="none" stroke="url(#trail)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="trail" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#D4FF3A" stopOpacity="0.1" />
                    <stop offset="1" stopColor="#D4FF3A" />
                  </linearGradient>
                </defs>
                {pts.map((pt, i) => {
                  const on = p >= STOPS[i].at - 0.05;
                  return (
                    <g key={STOPS[i].key} transform={`translate(${pt.x} ${pt.y})`}>
                      <circle r={on ? 9 : 6} fill={on ? "#D4FF3A" : "#15171D"} stroke={on ? "#D4FF3A" : "rgb(255 255 255 / 0.35)"} strokeWidth="2" style={{ transition: "all .4s" }} />
                      {on && !still && <circle r="18" fill="none" stroke="#D4FF3A" strokeOpacity="0.35" strokeWidth="1.5" className="animate-ping-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }} />}
                      <text y={i % 2 ? 34 : -22} textAnchor="middle" className="font-mono max-sm:hidden" fontSize="15" fill={on ? "#F3F0E8" : "#8C9099"}>
                        {STOPS[i].year} · {STOPS[i].name}
                      </text>
                    </g>
                  );
                })}
                <g ref={plane} transform={`translate(40 420) scale(1.6)`}>
                  <path d={PLANE} fill="#F3F0E8" />
                </g>
              </svg>
            </div>

            <ol aria-hidden className="mb-3 grid grid-cols-5 gap-1.5 sm:hidden">
              {STOPS.map((s, i) => (
                <li key={s.key} className={`rounded-lg border px-1 py-1.5 text-center font-mono text-[10px] leading-tight transition-colors ${i <= activeIdx ? "border-signal/50 bg-signal/10 text-signal" : "border-white/10 text-stone"}`}>
                  {s.year}
                  <span className="block text-[9px] uppercase tracking-wider">{s.name}</span>
                </li>
              ))}
            </ol>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <div key={active.key} className="animate-rise rounded-2xl border border-white/10 bg-ink-2/80 p-5 backdrop-blur">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
                  Checkpoint {active.n} · {active.name}
                </p>
                <p className="mt-2 font-display text-xl leading-snug tracking-tight sm:text-2xl">{active.line}</p>
                <Link href={active.proof.href} className="mt-2 inline-block text-[14px] text-paper/60 underline decoration-white/20 underline-offset-4 hover:text-signal">
                  {active.proof.text}
                </Link>
              </div>
              <Link
                href="/standard"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-signal px-5 text-[14px] font-medium text-ink transition-colors hover:bg-white"
              >
                The 2045 Standard
              </Link>
            </div>
            {!still && (
              <p aria-hidden className={`mt-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-stone transition-opacity ${p > 0.03 ? "opacity-0" : "opacity-100"}`}>
                Scroll to fly
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
