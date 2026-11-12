"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Mark } from "@/components/Logo";
import { logout } from "./actions";

type Item = { href: string; label: string; short: string; icon: ReactNode; badge?: number };

const I = {
  home: <path d="M3 10.5 10 4l7 6.5V17a1 1 0 0 1-1 1h-3.5v-4.5h-5V18H4a1 1 0 0 1-1-1z" />,
  inbox: <path d="M3 11h4l1.5 2.5h3L13 11h4M3 11l2-6h10l2 6v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />,
  chart: <path d="M4 16V9m4 7V5m4 11v-5m4 5V7M3 17.5h14" />,
  pen: <path d="M4 16l1-4 8-8 3 3-8 8zM12 5l3 3" />,
  mail: <path d="M3 5.5h14v9H3zM3 6l7 5 7-5" />,
  users: <path d="M7.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM2.5 16c.5-3 2.5-4.5 5-4.5s4.5 1.5 5 4.5M13 4.5a2.5 2.5 0 0 1 0 5M15 11.5c1.5.5 2.5 2 2.8 4.5" />,
  cog: <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" />,
  more: <path d="M5 10h.01M10 10h.01M15 10h.01" strokeWidth="3" />,
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

export default function AdminShell({ email, unread, newCount, children }: { email: string; unread: number; newCount: number; children: ReactNode }) {
  const pathname = usePathname();
  const [more, setMore] = useState(false);
  useEffect(() => setMore(false), [pathname]);

  const items: Item[] = [
    { href: "/admin", label: "Overview", short: "Home", icon: I.home, badge: unread },
    { href: "/admin/enquiries", label: "Enquiries", short: "Leads", icon: I.inbox, badge: newCount },
    { href: "/admin/analytics", label: "Visitors", short: "Visitors", icon: I.chart },
    { href: "/admin/posts", label: "Journal", short: "Journal", icon: I.pen },
    { href: "/admin/email", label: "Email", short: "Email", icon: I.mail },
    { href: "/admin/subscribers", label: "Subscribers", short: "Subs", icon: I.users },
    { href: "/admin/settings", label: "Settings", short: "Settings", icon: I.cog },
  ];
  const on = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  const primary = items.slice(0, 4);
  const rest = items.slice(4);

  return (
    <div className="min-h-dvh bg-paper lg:pl-60">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-ink text-paper lg:flex">
        <Link href="/admin" className="flex items-center gap-2.5 px-5 py-6">
          <Mark size={28} variant="signal" />
          <span className="font-display text-lg tracking-tight">ClickShift</span>
          <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-signal">Admin</span>
        </Link>
        <nav className="flex-1 space-y-0.5 px-3" aria-label="Admin">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[14px] transition-colors ${on(it.href) ? "bg-white/10 text-paper" : "text-paper/60 hover:bg-white/5 hover:text-paper"}`}
            >
              <Icon>{it.icon}</Icon>
              {it.label}
              {!!it.badge && <span className="ml-auto rounded-full bg-signal px-2 font-mono text-[11px] font-medium text-ink">{it.badge}</span>}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-[12px] text-paper/50">{email}</p>
          <div className="mt-2 flex items-center gap-3 text-[13px]">
            <Link href="/" className="text-paper/70 hover:text-signal" target="_blank">
              View site ↗
            </Link>
            <form action={logout}>
              <button className="text-paper/70 hover:text-signal">Sign out</button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-ink/8 bg-paper/90 px-4 backdrop-blur lg:hidden" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <Link href="/admin" className="flex items-center gap-2">
          <Mark size={26} variant="tile" />
          <span className="font-display text-[17px] tracking-tight">Admin</span>
        </Link>
        <Link href="/admin" aria-label={`${unread} unread notifications`} className="relative inline-flex h-11 w-11 items-center justify-center rounded-full">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M5 8a5 5 0 0 1 10 0c0 4 1.5 5.5 1.5 5.5h-13S5 12 5 8zM8.5 16.5a1.5 1.5 0 0 0 3 0" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {unread > 0 && <span className="absolute right-1.5 top-1.5 min-w-4 rounded-full bg-cobalt px-1 text-center font-mono text-[10px] text-white">{unread}</span>}
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-12 lg:pt-8">{children}</div>

      {/* Mobile bottom tabs */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-ink/10 bg-white/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Admin"
      >
        {primary.map((it) => (
          <Link key={it.href} href={it.href} className={`relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] ${on(it.href) ? "text-cobalt" : "text-mute"}`}>
            <Icon>{it.icon}</Icon>
            {it.short}
            {!!it.badge && <span className="absolute right-[22%] top-1.5 min-w-4 rounded-full bg-cobalt px-1 text-center font-mono text-[10px] text-white">{it.badge}</span>}
          </Link>
        ))}
        <button type="button" onClick={() => setMore((v) => !v)} aria-expanded={more} className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] ${rest.some((r) => on(r.href)) || more ? "text-cobalt" : "text-mute"}`}>
          <Icon>{I.more}</Icon>
          More
        </button>
        {more && (
          <div className="absolute bottom-full right-2 mb-2 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-xl">
            {rest.map((it) => (
              <Link key={it.href} href={it.href} className="flex min-h-12 items-center gap-3 px-4 text-[15px] hover:bg-paper">
                <Icon>{it.icon}</Icon>
                {it.label}
              </Link>
            ))}
            <Link href="/" className="flex min-h-12 items-center gap-3 border-t border-ink/8 px-4 text-[15px] hover:bg-paper">
              View site ↗
            </Link>
            <form action={logout}>
              <button className="flex min-h-12 w-full items-center gap-3 px-4 text-left text-[15px] hover:bg-paper">Sign out</button>
            </form>
          </div>
        )}
      </nav>
    </div>
  );
}
