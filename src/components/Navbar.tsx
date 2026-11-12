"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { NAV } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-white/8 bg-ink/85 backdrop-blur-xl" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8" aria-label="Main">
        <Logo tone="dark" />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-[14px] transition-colors ${
                  active(item.href) ? "bg-white/10 text-paper" : "text-paper/65 hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full bg-signal px-5 text-[14px] font-medium text-ink transition-colors hover:bg-white sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-64px)] overflow-y-auto bg-ink px-4 pb-10 pt-4 lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((item, i) => (
              <li key={item.href} className="animate-rise border-b border-white/8" style={{ animationDelay: `${i * 40}ms` }}>
                <Link href={item.href} className="flex items-center justify-between py-4 font-display text-2xl tracking-tight text-paper">
                  {item.label}
                  <span className="font-mono text-xs text-stone">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 flex min-h-14 items-center justify-center rounded-full bg-signal text-base font-medium text-ink"
          >
            Start a project
          </Link>
        </div>
      )}
    </header>
  );
}
