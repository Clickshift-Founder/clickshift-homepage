import Link from "next/link";
import { Mark } from "./Logo";
import { Container } from "./ui";
import { SITE } from "@/lib/site";
import NewsletterForm from "./NewsletterForm";

const COLS = [
  {
    title: "Factory",
    links: [
      { href: "/work", label: "All work" },
      { href: "/work#programmes", label: "Development programmes" },
      { href: "/work#companies", label: "Companies" },
      { href: "/work#products", label: "Products we built" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/automation", label: "Automation as a Service" },
      { href: "/automation#audit", label: "Automation Audit" },
      { href: "/templates", label: "CRM templates" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/standard", label: "The 2045 Standard" },
      { href: "/about", label: "About" },
      { href: "/blog", label: "Journal" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <Container className="pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Mark size={40} variant="signal" />
              <span className="font-display text-2xl font-semibold tracking-[-0.035em]">ClickShift</span>
            </div>
            <p className="mt-5 max-w-sm text-paper/65">
              The solutions factory. We build software, AI agents and automations that will still be worth using in 2045.
            </p>
            <div className="mt-8 max-w-md">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">The Journal, monthly</p>
              <NewsletterForm />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">{col.title}</p>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-block py-1.5 text-[15px] text-paper/75 transition-colors hover:text-signal">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">Reach us</p>
              <ul className="mt-4 space-y-1 text-[15px]">
                <li>
                  <a href={`mailto:${SITE.email}`} className="inline-block py-1.5 text-paper/75 hover:text-signal">
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-paper/75 hover:text-signal">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={SITE.socials.x} target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 text-paper/75 hover:text-signal">
                    X (Twitter)
                  </a>
                </li>
                <li className="py-1.5 text-paper/50">{SITE.location}</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div aria-hidden className="mt-16 select-none overflow-hidden">
        <p className="whitespace-nowrap text-center font-display text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.04]">
          built for 2045
        </p>
      </div>

      <Container className="flex flex-col gap-3 border-t border-white/8 py-6 text-[13px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ClickShift. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-paper">Privacy</Link>
          <Link href="/terms" className="hover:text-paper">Terms</Link>
        </div>
      </Container>
    </footer>
  );
}
