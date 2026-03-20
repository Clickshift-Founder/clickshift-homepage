"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Brain,
  HeartPulse,
  Cpu,
  ShieldCheck,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPE
───────────────────────────────────────────────────────────────────────────── */
interface Product {
  id: string;
  logo: React.ReactNode;
  name: string;
  tagline: string;
  color: string;          // tailwind text color class
  borderHover: string;    // tailwind hover:border class
  badgeGradient: string;  // tailwind bg-gradient classes for badge/button
  consoleBg: string;
  consoleLines: Array<{ text: string; color: string }>;
  taglineQuote: string;
  features: Array<{ label: string; detail: string }>;
  cta: string;
  href: string;
  ctaIcon?: React.ReactNode;
  isNew?: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCTS DATA
───────────────────────────────────────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  {
    id: "clickbot",
    logo: (
      <div className="w-12 h-12 relative flex-shrink-0 mt-1">
        <Image src="/clickbot-logo.png" alt="ClickBot" fill className="rounded-full object-cover" />
      </div>
    ),
    name: "ClickBot",
    tagline: "Autonomous Trading Agent",
    color: "text-green-400",
    borderHover: "hover:border-green-500/50",
    badgeGradient: "from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700",
    consoleBg: "bg-slate-900/60",
    taglineQuote: '"Powered by the ClickShift Chip. Maximize profit, minimize risk."',
    consoleLines: [
      { text: "Agent Status: ACTIVE", color: "text-green-400" },
      { text: "🤖 Last Action: $BONK Exit Optimization", color: "text-blue-400" },
      { text: "📈 Result: Set 2x target, took 5.2x profit.", color: "text-slate-300" },
      { text: "🔒 Security: AES-256 (Bank-Level)", color: "text-orange-400" },
      { text: "👥 Used by 525+ traders daily", color: "text-purple-400" },
    ],
    features: [
      { label: "Trailing Profit", detail: "Intelligently exits near the peak (e.g., 5x on a 6x run)." },
      { label: "Rug Detection", detail: "Active monitoring to avoid malicious contracts." },
      { label: "Non-Custodial", detail: "Bank-level security (AES-256). You control your keys." },
      { label: "One-Tap Trading", detail: "Best price execution via Jupiter integration." },
    ],
    cta: "Start ClickBot on Telegram",
    href: "https://clickbot.clickshift.io",
  },
  {
    id: "alpha",
    logo: <div className="text-4xl flex-shrink-0">🔮</div>,
    name: "ClickShift Alpha",
    tagline: "Solana Signals",
    color: "text-blue-400",
    borderHover: "hover:border-blue-500/50",
    badgeGradient: "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    consoleBg: "bg-slate-900/60",
    taglineQuote: '"See the future before it happens"',
    consoleLines: [
      { text: "BONK Analysis — Completed in 1.9s", color: "text-green-400" },
      { text: "🎯 BUY Signal | HIGH Confidence (87%)", color: "text-blue-400" },
      { text: "📊 Entry: $0.000019 | Stop: $0.000016 | Target: $0.000034", color: "text-slate-300" },
      { text: "⏰ Prediction expires in 43 minutes", color: "text-orange-400" },
      { text: "💡 Pattern Match: Similar to WIF 3 days before 340% run", color: "text-purple-400" },
    ],
    features: [
      { label: "15-min pump warnings", detail: "73%+ accuracy on entry/exit signals." },
      { label: "Whale exit detection", detail: "Tracks large wallet movements across all DEXs." },
      { label: "Holder distribution", detail: "Real-time rug risk assessment before you ape." },
      { label: "Confidence scores", detail: "Smart entry/exit recommendations you can trust." },
    ],
    cta: "Launch Alpha",
    href: "https://alpha.clickshift.io",
  },
  {
    id: "leverage",
    logo: <div className="text-4xl flex-shrink-0">⚡</div>,
    name: "Click Leverage",
    tagline: "Capital Multiplier",
    color: "text-orange-400",
    borderHover: "hover:border-orange-500/50",
    badgeGradient: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
    consoleBg: "bg-slate-900/60",
    taglineQuote: '"Never lose your portfolio to Futures Trading again"',
    consoleLines: [
      { text: "BTC/USDT Analysis — Completed in 2.3s", color: "text-green-400" },
      { text: "📈 LONG Signal | MODERATE Risk", color: "text-blue-400" },
      { text: "💰 Position Size: 3% of portfolio recommended", color: "text-slate-300" },
      { text: "🎯 Entry: $95,500 | Liquidation: $91,800 | Target: $105,100", color: "text-slate-300" },
      { text: "⚖️ Risk/Reward: 1:2.8 | Win Probability: 74%", color: "text-purple-400" },
    ],
    features: [
      { label: "Liquidation risk calculator", detail: "Know your exact liquidation price before entering." },
      { label: "MACD + OBV fusion", detail: "Patent-pending algorithm for futures precision." },
      { label: "Multi-exchange validation", detail: "Aggregated data from all major perps venues." },
      { label: "Smart position sizing", detail: "Dynamic exposure management based on volatility." },
    ],
    cta: "Launch Futures",
    href: "https://leverage.clickshift.io",
    ctaIcon: <ExternalLink className="h-4 w-4" />,
  },
  {
    id: "pulse",
    logo: (
      <div className="w-12 h-12 flex-shrink-0 mt-1 rounded-full bg-gradient-to-br from-cyan-500/30 to-teal-600/30 border border-cyan-500/40 flex items-center justify-center">
        <HeartPulse className="h-6 w-6 text-cyan-400" />
      </div>
    ),
    name: "Pulse",
    tagline: "Agentic Wallet OS",
    color: "text-cyan-400",
    borderHover: "hover:border-cyan-500/50",
    badgeGradient: "from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700",
    consoleBg: "bg-slate-900/60",
    taglineQuote: '"Fund the vault. Set a mission. Walk away. Your agents don\'t sleep."',
    consoleLines: [
      { text: "⏰ Orchestrator AWAKE — 6 agents active", color: "text-cyan-400" },
      { text: "🧠 DCA Agent: BONK position building (+0.01 SOL/round)", color: "text-blue-400" },
      { text: "🛡️ Governor: All 7 safety checks PASSED", color: "text-green-400" },
      { text: "📡 Mission: Grow portfolio conservatively", color: "text-purple-400" },
      { text: "✅ On-chain proof: 5 real txs confirmed on devnet", color: "text-teal-400" },
    ],
    features: [
      { label: "Autonomous Swarm", detail: "6 AI agents with their own wallets, capital, and heartbeats — active 24/7." },
      { label: "Governor Safety", detail: "7-layer safety system. AI cannot override it. Every transaction gated." },
      { label: "HKDF-SHA256 Security", detail: "Private key never stored. Same model as Signal and TLS 1.3." },
      { label: "Natural Language Control", detail: 'Type "DCA into BONK with 0.1 SOL" — swarm reorganises instantly.' },
    ],
    cta: "Explore Pulse",
    href: "https://pulse.clickshift.io",
    isNew: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────────────────────────────────────── */
const ProductCard: React.FC<{ product: Product }> = ({ product: p }) => (
  <div
    className={`
      relative flex flex-col
      bg-gradient-to-br from-slate-800 to-slate-900
      rounded-2xl p-6 md:p-8
      border border-slate-700 ${p.borderHover}
      transition-all duration-300 shadow-xl
      hover:-translate-y-1
    `}
  >
    {/* NEW badge */}
    {p.isNew && (
      <div className="absolute -top-3 left-6">
        <span className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-cyan-500/30">
          New
        </span>
      </div>
    )}

    {/* Header */}
    <div className="flex items-start space-x-4 mb-5">
      {p.logo}
      <div>
        <h3 className="text-2xl font-bold leading-tight">{p.name}</h3>
        <p className={`text-sm font-medium ${p.color}`}>{p.tagline}</p>
      </div>
    </div>

    {/* Quote */}
    <p className="text-base text-slate-300 mb-5 italic leading-snug">{p.taglineQuote}</p>

    {/* Console block */}
    <div className={`${p.consoleBg} rounded-lg p-4 mb-6 font-mono text-xs border border-slate-700/80 space-y-1`}>
      {p.consoleLines.map((line, i) => (
        <div key={i} className={line.color}>{line.text}</div>
      ))}
    </div>

    {/* Features — flex-grow so all cards stretch equally */}
    <ul className="space-y-3 mb-8 flex-grow">
      {p.features.map((f, i) => (
        <li key={i} className="flex items-start space-x-3">
          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
          <span className="text-slate-300 text-sm leading-snug">
            <strong>{f.label}:</strong> {f.detail}
          </span>
        </li>
      ))}
    </ul>

    {/* CTA button — mt-auto pins it to bottom */}
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-full bg-gradient-to-r ${p.badgeGradient}
        px-6 py-3 rounded-lg font-semibold text-sm
        transition-all duration-200
        flex items-center justify-center space-x-2 mt-auto
      `}
    >
      <span>{p.cta}</span>
      {p.ctaIcon ?? <ArrowRight className="h-4 w-4" />}
    </a>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────────────────── */
const ProductShowcase: React.FC = () => (
  <section id="products" className="py-20 px-4 bg-slate-800/30">
    <div className="container mx-auto max-w-7xl">

      {/* Section heading */}
      <div className="text-center mb-16">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          The Full Suite
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
          Four Tools. One Chip.
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            The ClickShift Product Suite
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          From real-time signals to fully autonomous on-chain agents — every product
          is powered by the same ClickShift intelligence layer.
        </p>
      </div>

      {/* Cards grid — 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-slate-500 text-sm mt-10 italic">
        All products are powered by the ClickShift Chip — one intelligence layer, four entry points.
      </p>
    </div>
  </section>
);

export default ProductShowcase;