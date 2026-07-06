"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const C = {
  bg:      "#05080F",
  s1:      "#090E1A",
  s2:      "#0D1424",
  border:  "#162035",
  green:   "#00C864",
  gdim:    "rgba(0,200,100,0.08)",
  purple:  "#7C3AED",
  pdim:    "rgba(124,58,237,0.08)",
  gold:    "#F59E0B",
  ydim:    "rgba(245,158,11,0.08)",
  coral:   "#F43F5E",
  cdim:    "rgba(244,63,94,0.08)",
  blue:    "#3B82F6",
  bdim:    "rgba(59,130,246,0.08)",
  text:    "#EDF2F7",
  mid:     "#94A3B8",
  muted:   "#475569",
  line:    "#1E2D45",
};

type PhaseStatus = "shipped" | "building" | "upcoming" | "vision";

interface Milestone {
  title: string;
  desc: string;
  tag: string;
  icon: string;
}

interface Phase {
  id: string;
  era: string;
  label: string;
  status: PhaseStatus;
  accent: string;
  dim: string;
  headline: string;
  sub: string;
  milestones: Milestone[];
}

interface StatusConfig {
  label: string;
  color: string;
  bg: string;
}

const STATUS_CONFIG: Record<PhaseStatus, StatusConfig> = {
  shipped:  { label: "Shipped",       color: C.green,  bg: C.gdim },
  building: { label: "Building now",  color: C.purple, bg: C.pdim },
  upcoming: { label: "Upcoming",      color: C.gold,   bg: C.ydim },
  vision:   { label: "Vision",        color: C.coral,  bg: C.cdim },
};

const PHASES: Phase[] = [
  {
    id: "shipped",
    era: "2025",
    label: "Foundation",
    status: "shipped",
    accent: C.green,
    dim: C.gdim,
    headline: "From idea to live infrastructure",
    sub: "Built the entire stack solo. Shipped to mainnet.",
    milestones: [
      { title: "ClickShift Alpha", icon: "📊", tag: "Shipped",
        desc: "AI-powered token risk scoring for Solana. Six on-chain signals. One verdict: Buy or Avoid." },
      { title: "ClickBot — Live on Solana Mainnet", icon: "🤖", tag: "Shipped",
        desc: "A Telegram-native financial super-app combining trading, yield, bills, and NGN bank withdrawals in a single chat interface." },
      { title: "NGN Fiat Bridge", icon: "🏦", tag: "Shipped",
        desc: "Live USDC-to-Naira settlement to 200+ Nigerian banks in under 45 seconds. CBN-licensed rails. No P2P. No exchange." },
      { title: "Utility Bill Payments", icon: "⚡", tag: "Shipped",
        desc: "Pay electricity, airtime, data, and cable TV with USDC directly from your crypto wallet. 13 DISCOs, 4 networks." },
      { title: "DeFi Suite", icon: "📈", tag: "Shipped",
        desc: "Spot trading, token sniper with MEV protection, copy trading, perpetuals, and 14% APY yield — all from one Telegram chat." },
      { title: "ClickBot Pal", icon: "🧠", tag: "Shipped",
        desc: "An AI-native financial assistant. 'Hey ClickBot, send 5000 naira to GTBank' — it understands and executes." },
      { title: "Leverage & SolanaFirst", icon: "🎯", tag: "Shipped",
        desc: "Futures intelligence and gamified onboarding for new Solana users." },
      { title: "Pulse — Agentic Wallet OS", icon: "🤖", tag: "Shipped",
        desc: "Six autonomous AI agents holding their own encrypted Solana wallets, signing real transactions 24/7. Superteam Nigeria bounty winner." },
    ],
  },
  {
    id: "building",
    era: "Q3 2026",
    label: "Intelligence",
    status: "building",
    accent: C.purple,
    dim: C.pdim,
    headline: "Making ClickBot smarter and more inclusive",
    sub: "Expanding what the product knows, accepts, and remembers.",
    milestones: [
      { title: "USDT Support Everywhere", icon: "💵", tag: "Building",
        desc: "USDC and USDT accepted interchangeably across all features. ClickBot automatically uses whichever stable covers the transaction." },
      { title: "ClickBot Account Statement", icon: "📄", tag: "Building",
        desc: "A printable PDF statement of every trade, bill, transfer, withdrawal, and yield transaction — structured exactly like a bank statement." },
      { title: "Pal Memory — RAG System", icon: "🧠", tag: "Building",
        desc: "ClickBot Pal remembers your meter numbers, bank accounts, and favourite tokens. Every interaction becomes more personalised." },
      { title: "Multichain Offramp", icon: "🌍", tag: "Building",
        desc: "Withdraw crypto profits to Nigerian banks from BNB Chain, Ethereum, and Tron — not just Solana." },
    ],
  },
  {
    id: "q4_2026",
    era: "Q4 2026",
    label: "Token & Payments",
    status: "upcoming",
    accent: C.gold,
    dim: C.ydim,
    headline: "The $SHIFT token and global payment corridors",
    sub: "Rewarding the community that built this with us.",
    milestones: [
      { title: "$SHIFT Token — TGE", icon: "🪙", tag: "Q4 2026",
        desc: "The ClickShift governance and utility token. Fee discounts, staking yield, monthly cashback, and governance voting." },
      { title: "$SHIFT Utility System", icon: "⚙️", tag: "Q4 2026",
        desc: "Hold $SHIFT to unlock fee discounts up to 50%, premium Pal features, and priority access to new products." },
      { title: "B2B Vendor Payments", icon: "🏭", tag: "Q4 2026",
        desc: "Pay Chinese and Japanese suppliers in CNY and JPY using USDC. No SWIFT. No correspondent bank delays." },
      { title: "Delaware Incorporation", icon: "🏛️", tag: "Q4 2026",
        desc: "ClickShift Inc. formally incorporated in Delaware, enabling US and EU investor participation and global partnerships." },
    ],
  },
  {
    id: "q1_2027",
    era: "Q1 2027",
    label: "Cards & Corridors",
    status: "upcoming",
    accent: C.blue,
    dim: C.bdim,
    headline: "Spending crypto anywhere, sending money everywhere",
    sub: "The features that make ClickBot a complete financial life.",
    milestones: [
      { title: "ClickBot Virtual Debit Card", icon: "💳", tag: "Q1 2027",
        desc: "A Visa/Mastercard virtual card linked to your USDC balance. Spend crypto anywhere cards are accepted — no pre-load required." },
      { title: "Tokenized Stock Trading", icon: "📊", tag: "Q1 2027",
        desc: "Buy Apple, Tesla, NVIDIA, and 170+ stocks and ETFs with USDC. No US brokerage account. Fractional shares from $1, 24/7." },
      { title: "Dollar & JPY/CNY Offramp", icon: "💱", tag: "Q1 2027",
        desc: "Withdraw to US bank accounts in USD, Japanese banks in JPY, and Chinese banks in CNY. One USDC balance. Any currency." },
      { title: "Multi-Country Expansion", icon: "🌍", tag: "Q1 2027",
        desc: "ClickBot fiat rails extended to Ghana (GHS), Kenya (KES), and Egypt (EGP)." },
    ],
  },
  {
    id: "2027",
    era: "2027+",
    label: "Infrastructure",
    status: "vision",
    accent: C.coral,
    dim: C.cdim,
    headline: "Becoming the payment layer for African DeFi",
    sub: "The rails others build on. The protocol that scales with the continent.",
    milestones: [
      { title: "ClickShift B2B API", icon: "🔌", tag: "2027+",
        desc: "White-label ClickShift's NGN fiat bridge and Solana payment rails as a REST API — the Stripe for African DeFi." },
      { title: "Pulse — Premium Agent Subscriptions", icon: "🤖", tag: "2027+",
        desc: "Your own AI agent swarm managing your Solana portfolio autonomously — DCA, trailing stop, risk manager — 24/7." },
      { title: "Physical ClickBot Card", icon: "💳", tag: "2027+",
        desc: "A ClickShift-branded Visa card delivered to your address. Spend your crypto balance anywhere in Nigeria and beyond." },
      { title: "ClickShift SDK", icon: "⚙️", tag: "2027+",
        desc: "Developer tools for building on ClickShift's payment infrastructure — NGN bridge, stablecoin payments, and DeFi as composable modules." },
    ],
  },
];

function MilestoneCard({ m, accent }: { m: Milestone; accent: string }) {
  return (
    <div style={{
      background: C.s1, border: `1px solid ${C.border}`,
      borderRadius: "12px", padding: "18px 20px",
      display: "flex", gap: "14px", alignItems: "flex-start",
    }}>
      <div style={{ fontSize: "22px", lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>
        {m.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          display: "flex", alignItems: "center",
          gap: "8px", flexWrap: "wrap" as const, marginBottom: "6px",
        }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: C.text }}>{m.title}</span>
          <span style={{
            fontSize: "10px", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase" as const,
            padding: "2px 8px", borderRadius: "4px",
            color: accent, background: `${accent}15`,
            border: `1px solid ${accent}30`, flexShrink: 0,
          }}>{m.tag}</span>
        </div>
        <p style={{ fontSize: "13px", color: C.mid, lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
      </div>
    </div>
  );
}

function PhaseSection({ phase, isLast }: { phase: Phase; isLast: boolean }) {
  const cfg = STATUS_CONFIG[phase.status];
  const isActive = phase.status === "building";

  return (
    <div style={{ display: "flex", gap: 0, position: "relative" }}>
      <div style={{
        display: "flex", flexDirection: "column" as const,
        alignItems: "center", width: "48px", flexShrink: 0, paddingTop: "4px",
      }}>
        <div style={{
          width: "14px", height: "14px", borderRadius: "50%",
          background: phase.accent, border: `2px solid ${phase.accent}`,
          boxShadow: isActive ? `0 0 20px ${phase.accent}` : "none",
          flexShrink: 0, zIndex: 1,
          animation: isActive ? "pulse-node 2.5s ease-in-out infinite" : "none",
        }} />
        {!isLast && (
          <div style={{
            width: "2px", flex: 1, minHeight: "40px",
            background: `linear-gradient(180deg, ${phase.accent}60 0%, ${C.line} 100%)`,
            marginTop: "8px",
          }} />
        )}
      </div>

      <div style={{
        flex: 1, paddingLeft: "24px",
        paddingBottom: isLast ? 0 : "64px", minWidth: 0,
      }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{
            display: "flex", alignItems: "center",
            gap: "10px", flexWrap: "wrap" as const, marginBottom: "6px",
          }}>
            <span style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase" as const,
              color: phase.accent,
            }}>{phase.era}</span>
            <span style={{
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              padding: "3px 10px", borderRadius: "4px",
              color: cfg.color, background: cfg.bg,
              border: `1px solid ${cfg.color}30`,
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              {isActive && (
                <span style={{
                  display: "inline-block", width: "6px", height: "6px",
                  borderRadius: "50%", background: cfg.color,
                  animation: "pulse-dot 2s ease-in-out infinite",
                }} />
              )}
              {cfg.label}
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700,
            color: C.text, letterSpacing: "-0.02em",
            lineHeight: 1.2, marginBottom: "6px",
          }}>
            {phase.label} —{" "}
            <span style={{ color: phase.accent }}>{phase.headline}</span>
          </h2>
          <p style={{ fontSize: "14px", color: C.mid, lineHeight: 1.6 }}>{phase.sub}</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "10px",
        }}>
          {phase.milestones.map((m: Milestone, i: number) => (
            <MilestoneCard key={i} m={m} accent={phase.accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filteredPhases = activeFilter === "all"
    ? PHASES
    : PHASES.filter(p => p.status === activeFilter);

  const FILTERS: { id: string; label: string }[] = [
    { id: "all",      label: "All" },
    { id: "shipped",  label: "Shipped" },
    { id: "building", label: "Building now" },
    { id: "upcoming", label: "Upcoming" },
    { id: "vision",   label: "Vision" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse-node {
          0%, 100% { box-shadow: 0 0 8px currentColor; }
          50% { box-shadow: 0 0 24px currentColor; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-a { animation: fade-up 0.5s ease both; }
        .hero-b { animation: fade-up 0.5s 0.08s ease both; }
        .hero-c { animation: fade-up 0.5s 0.16s ease both; }
        * { box-sizing: border-box; }
        @media (max-width: 640px) {
          .stat-row { flex-wrap: wrap !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: `rgba(5,8,15,${Math.min(scrollY / 80, 0.97)})`,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrollY > 20 ? C.border : "transparent"}`,
        padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        height: "56px",
        transition: "border-color 0.3s",
      }}>
        <Link href="/" style={{
          fontSize: "15px", fontWeight: 700, color: C.text,
          textDecoration: "none", letterSpacing: "-0.02em",
        }}>ClickShift</Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link href="/about" style={{ fontSize: "13px", color: C.mid, textDecoration: "none" }}>About</Link>
          <a href="https://t.me/clicksolbot" target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: "13px", fontWeight: 600, color: "#000",
              background: C.green, padding: "7px 16px", borderRadius: "8px", textDecoration: "none",
            }}>Try ClickBot →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 24px 64px", maxWidth: "860px", margin: "0 auto", position: "relative" }}>
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(0,200,100,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="hero-a" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: `${C.purple}15`, border: `1px solid ${C.purple}40`,
          borderRadius: "20px", padding: "5px 14px",
          fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em",
          color: C.purple, textTransform: "uppercase", marginBottom: "20px",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: C.purple, animation: "pulse-dot 2s ease-in-out infinite",
          }} />
          ClickShift Roadmap
        </div>

        <h1 className="hero-b" style={{
          fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 800,
          letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "20px",
        }}>
          Building the rails<br />
          <span style={{ color: C.green }}>crypto needs to work</span><br />
          in real life.
        </h1>

        <p className="hero-c" style={{
          fontSize: "clamp(15px, 2vw, 18px)", color: C.mid,
          lineHeight: 1.7, maxWidth: "600px", marginBottom: "36px",
        }}>
          ClickShift is an infrastructure company. We build the products that connect
          Solana DeFi to everyday African financial life — starting with ClickBot,
          expanding to the continent, and eventually powering the payment rails
          that other builders deploy on.
        </p>

        <div className="stat-row hero-c" style={{ display: "flex", gap: "12px", flexWrap: "wrap" as const }}>
          {[
            { val: "110+",    label: "Wallets" },
            { val: "50+",     label: "Countries" },
            { val: "$8.7K",   label: "Volume" },
            { val: "8",       label: "Products shipped" },
            { val: "Q4 2026", label: "$SHIFT TGE" },
          ].map((s, i) => (
            <div key={i} style={{
              background: C.s1, border: `1px solid ${C.border}`,
              borderRadius: "10px", padding: "12px 18px", textAlign: "center", minWidth: "80px",
            }}>
              <div style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "18px", fontWeight: 700, color: C.green,
                lineHeight: 1, marginBottom: "3px",
              }}>{s.val}</div>
              <div style={{ fontSize: "11px", color: C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER TABS */}
      <div style={{ padding: "0 24px 40px", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
          {FILTERS.map(f => {
            const cfg = f.id !== "all" ? STATUS_CONFIG[f.id as PhaseStatus] : null;
            const active = activeFilter === f.id;
            return (
              <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{
                padding: "7px 16px", borderRadius: "8px",
                fontSize: "13px", fontWeight: 500, cursor: "pointer",
                transition: "all 0.15s",
                background: active ? (cfg?.color ?? C.green) : "transparent",
                color: active ? "#000" : C.mid,
                border: `1px solid ${active ? (cfg?.color ?? C.green) : C.border}`,
              }}>{f.label}</button>
            );
          })}
        </div>
      </div>

      {/* TIMELINE */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 100px" }}>
        {filteredPhases.map((phase, i) => (
          <PhaseSection key={phase.id} phase={phase} isLast={i === filteredPhases.length - 1} />
        ))}
      </div>

      {/* MISSION */}
      <section style={{
        borderTop: `1px solid ${C.border}`, padding: "80px 24px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em",
            color: C.green, textTransform: "uppercase", marginBottom: "20px",
          }}>The mission</div>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 700,
            color: C.text, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "20px",
          }}>
            500 million people hold crypto.<br />
            <span style={{ color: C.green }}>Most can&apos;t use it where they live.</span>
          </h2>
          <p style={{ fontSize: "16px", color: C.mid, lineHeight: 1.8, marginBottom: "40px" }}>
            The Naira lost 68% against the dollar in 18 months.
            P2P spreads eat 5–8% every time someone tries to convert.
            There is no product that lets a Nigerian hold USDC, earn yield on it,
            pay bills with it, and cash out to their bank account in one place —
            without switching apps, trusting a stranger, or waiting days.
            ClickShift is building that product. It is live today.
          </p>
          <a href="https://t.me/clicksolbot" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: C.green, color: "#000",
              padding: "14px 28px", borderRadius: "10px",
              fontSize: "15px", fontWeight: 700, textDecoration: "none",
            }}>Try ClickBot free →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${C.border}`, padding: "24px",
        display: "flex", flexWrap: "wrap" as const,
        justifyContent: "space-between", alignItems: "center", gap: "12px",
        maxWidth: "860px", margin: "0 auto",
      }}>
        <span style={{ fontSize: "12px", color: C.muted }}>
          ClickShift Inc. · Building on Solana · Abuja, Nigeria
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="https://t.me/clicksolbot" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "12px", color: C.muted, textDecoration: "none" }}>Telegram</a>
          <a href="https://twitter.com/ClickShiftHQ" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "12px", color: C.muted, textDecoration: "none" }}>Twitter</a>
          <Link href="/future" style={{ fontSize: "12px", color: C.muted, textDecoration: "none" }}>
            Investor view
          </Link>
        </div>
      </footer>
    </div>
  );
}