"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Zap, Globe, CreditCard, Brain, Shield, TrendingUp,
  ArrowRight, ChevronDown, ChevronUp, Check, Circle,
  Cpu, Layers, DollarSign, Users, Building2, Coins,
  Wallet, BarChart3, Lock, Repeat, FileText, BellRing,
  MessageSquare, Fingerprint, Map, Rocket, Star
} from "lucide-react";

// ── Design tokens ──────────────────────────────────────────────────────────
const T = {
  bg:       "#060810",
  s1:       "#0A1120",
  s2:       "#0F1929",
  border:   "#1A2D4A",
  green:    "#00C864",
  gdim:     "rgba(0,200,100,0.08)",
  purple:   "#5B2D8E",
  pdim:     "rgba(91,45,142,0.10)",
  gold:     "#F59E0B",
  gdim2:    "rgba(245,158,11,0.08)",
  coral:    "#E94560",
  cdim:     "rgba(233,69,96,0.08)",
  text:     "#E8EDF4",
  light:    "#8FA3BC",
  muted:    "#5A6A80",
};

// ── Data ───────────────────────────────────────────────────────────────────
const PHASES = [
  {
    id: 1, label: "Phase 1", status: "active", accent: T.green, dim: T.gdim,
    range: "0 – 200 users", title: "Foundation",
    tagline: "Make it impossible to fail",
    features: [
      {
        icon: Shield, title: "Sponsored gas fees",
        tag: "UX", tagColor: T.green,
        desc: "ClickBot pays Solana network fees on every trade. Users with USDC-only wallets never hit gas failures again — not on swaps, snipes, or copy trades.",
        impl: [
          "Create dedicated treasury fee-payer keypair, separate from fee collection wallet. Monitor balance with PM2 alerts.",
          "In trading-engine.js sendTransaction(), set tx.feePayer = treasuryKeypair.publicKey then sign with [treasuryKeypair, userKeypair].",
          "Gas cost per trade: ~0.000005–0.001 SOL (~fractions of a cent). Fully absorbed into existing 1% fee with margin.",
          "Auto-top-up treasury from fee wallet when balance drops below 0.5 SOL. No manual intervention.",
        ]
      },
      {
        icon: Repeat, title: "USDT everywhere",
        tag: "Infra", tagColor: "#3266ad",
        desc: "USDC and USDT accepted interchangeably across all features — bills, bank transfers, swap, yield. Jupiter routes stablecoin-to-stablecoin in milliseconds with near-zero slippage.",
        impl: [
          "Check user's stable balance preference (USDC or USDT) before each transaction.",
          "If USDT selected: Jupiter swap USDT → USDC first (sub-second, ~0.001% slippage on stable pairs), then proceed normally.",
          "VTPass and Flutterwave receive NGN on our side — no partner API changes needed.",
          "UI shows: 'Paying with USDT (auto-converted)' in confirmation message.",
        ]
      },
      {
        icon: FileText, title: "Account statement (/statement)",
        tag: "UX", tagColor: T.green,
        desc: "Printable PDF bank statement showing every trade, bill payment, transfer, withdrawal, yield earn, snipe, copy trade — exactly like a traditional bank statement. The feature that makes crypto feel grown-up.",
        impl: [
          "Query all tables (trades, fiat_transactions, utility_payments, bills_payments, yield_deposits, sniper_sessions) for userId, join and sort by timestamp.",
          "Generate PDF using pdfkit npm package. ClickShift header, wallet address, date range, transactions grouped by category, running balance.",
          "Send as Telegram document: ctx.replyWithDocument({ source: pdfBuffer, filename: 'ClickBot-Statement.pdf' }).",
          "Date range selector: last 30d / 3 months / all time. Inline keyboard before generating.",
          "Pal knows about /statement and proactively suggests it when users ask about their history.",
        ]
      },
      {
        icon: BellRing, title: "X content engine",
        tag: "Growth", tagColor: T.gold,
        desc: "Fully automated Twitter posting — morning feature spotlight, Cryptonoon Newsflash (3 afternoon intel tweets), evening follow-up. Consistent daily presence with zero manual effort.",
        impl: [
          "Twitter API v2 Basic ($100/mo) for write access. cb-engage PM2 process already scaffolded.",
          "node-cron scheduler: 8AM morning, 1PM/3PM/5PM Cryptonoon, 8PM evening.",
          "Content queue in PostgreSQL scheduled_tweets table: content, scheduled_at, posted_at, status.",
          "Claude API generates weekly batch on Sunday night. Human review optional before posting.",
        ]
      },
    ]
  },
  {
    id: 2, label: "Phase 2", status: "soon", accent: T.purple, dim: T.pdim,
    range: "200 – 500 users", title: "Intelligence",
    tagline: "Make it personal and global",
    features: [
      {
        icon: Brain, title: "ClickBot Pal — RAG memory",
        tag: "UX", tagColor: T.purple,
        desc: "Pal remembers your meter numbers, bank accounts, favourite tokens, win/loss history. Feels like a personal financial advisor who actually knows you — not a chatbot reading from a script.",
        impl: [
          "user_memory table: userId, key (meter_number / favourite_token / bank_account), value, source (user_said / inferred), updated_at.",
          "conversation_summaries table: userId, session_id, summary (TEXT), created_at. Summarise each Pal session on close using Claude Haiku.",
          "Before each Pal call: inject last 3 conversation summaries + relevant user_memory rows for current intent.",
          "Pal extracts and saves new facts mid-conversation via structured Claude tool call: 'I just used meter 1234567890' → INSERT into user_memory.",
          "True vector RAG (pgvector on PostgreSQL) at ~500 users — enables proactive suggestions based on inferred behaviour patterns.",
        ]
      },
      {
        icon: Globe, title: "Multichain offramp (BNB / ETH / TRX)",
        tag: "Revenue", tagColor: T.gold,
        desc: "Users holding BNB, ETH, or Tron USDT can deposit and cash out to Nigerian banks. Trading stays on Solana — only the withdrawal corridor goes multichain.",
        impl: [
          "Integration partner: Stargate Finance (cross-chain bridge) to move BNB/ETH USDT → Solana USDC first. Adds ~45 seconds, no new partner needed.",
          "Alternative: Transak Business API — supports multichain deposits with NGN payout. White-label with our markup.",
          "ClickBot generates a deposit address per chain per user. Webhook monitors inbound. On confirm: bridge → existing Flutterwave NGN flow.",
          "Add 1–2% markup on bridge spread. Most users only see NGN in their bank — bridge mechanics are invisible.",
          "Rollout: ETH USDT first (highest demand), then BNB, then TRX.",
        ]
      },
      {
        icon: Coins, title: "$SHIFT token launch — real utility",
        tag: "Token", tagColor: T.gold,
        desc: "TGE Q4 2026. $SHIFT is a genuine utility token — fee discounts, cashback, governance, staking yield. Engineered to stay active, grow in value, and carry ClickBot to CEX listing.",
        impl: [
          "Fee discount tiers: 1K SHIFT = 10% fee off, 10K = 25%, 100K = 50%. Checked on every trade.",
          "Monthly cashback: hold above threshold for 30 consecutive days → SHIFT cashback proportional to trading volume. Automated cron job.",
          "Staking yield: lock SHIFT 30/90/180 days, earn APY from protocol revenue share — same architecture as USDC yield engine.",
          "Governance voting via Realms (Solana): SHIFT holders vote on fee parameters, new chain support, feature priorities.",
          "CEX listing path: 1K+ holders + 90d trading volume + staking TVL → MEXC application, then Gate.io, then Bybit.",
        ]
      },
      {
        icon: Building2, title: "B2B vendor payments",
        tag: "B2B", tagColor: T.coral,
        desc: "Nigerian importers pay Chinese and Japanese suppliers in CNY or JPY using USDC in ClickBot. Suppliers receive local currency. No SWIFT, no Form M delays, no correspondent bank losses.",
        impl: [
          "Integration partner: Airwallex Business API — licensed in Hong Kong, supports CNY payouts to mainland Chinese bank accounts. API-first, AML-compliant.",
          "Japan corridor: SBI Remit API (SBI Holdings). Supports USDC-funded JPY payouts to Japanese bank accounts.",
          "Flow: 'Pay ¥50,000 to supplier account 12345 Bank of China' → NLP parses → Pal confirms → USDC debited → Airwallex sends CNY.",
          "vendor_book table: userId, vendor_name, bank_country, bank_name, account_number, currency. Pal remembers 'your Guangzhou supplier'.",
          "Revenue: 0.8–1.5% markup on corridor FX. On ₦5M import payment (~$3K) = $30–45 per transaction.",
          "KYB layer for B2B above $10K: Smile Identity business verification. Required for compliance.",
        ]
      },
    ]
  },
  {
    id: 3, label: "Phase 3", status: "growth", accent: T.gold, dim: T.gdim2,
    range: "500 – 2,000 users", title: "Expansion",
    tagline: "Make it the only financial app they need",
    features: [
      {
        icon: CreditCard, title: "ClickBot virtual debit card",
        tag: "Revenue", tagColor: T.gold,
        desc: "A Visa/Mastercard virtual card linked to the user's USDC balance. Spend crypto anywhere cards are accepted — online, in-store, internationally. The single feature that makes ClickBot nearly unassailable.",
        impl: [
          "Card issuance partner: Immersve (immersve.com) — USDC-funded Mastercard, Solana-native, API-first.",
          "Alternative: Rain (rain.com) — crypto Visa cards, works in emerging markets including Nigeria.",
          "User requests card → KYC (BVN + selfie via Smile Identity) → card issued to ClickBot wallet → virtual card details via Telegram.",
          "Spending: when card charged, USDC debited from ClickBot wallet in real time. No pre-load — live balance IS the card balance.",
          "Revenue: interchange fee (0.5–1.5% per transaction) + optional $2–5/mo premium card tier.",
          "$SHIFT integration: SHIFT holders get fee-free card issuance and higher spending limits.",
          "Physical card at 5,000+ users: Union54 or Sudo Africa. ClickShift branded, delivered Nigerian addresses.",
        ]
      },
      {
        icon: TrendingUp, title: "Delta-neutral yield vault",
        tag: "Revenue", tagColor: T.gold,
        desc: "Advanced yield: simultaneously long spot + short perps on same asset to capture funding rate with near-zero directional risk. Target 20–40% APY. The yield product that makes the standard 14% feel like a savings account.",
        impl: [
          "Drift Protocol (already integrated) for the short perp leg. Buy SOL/BTC spot in ClickBot wallet simultaneously.",
          "Monitor funding rates via Hyperliquid, Gate.io, Bitget APIs. Only enter when annualised rate exceeds 15%.",
          "Offer as premium tier: 'Delta-Neutral Vault — est. 20–35% APY'. Minimum $100 USDC. Higher risk disclosure.",
          "Platform cut: 30% (vs 20% on standard yield). At $50K TVL = meaningful recurring revenue.",
        ]
      },
      {
        icon: MessageSquare, title: "Pal — proactive intelligence",
        tag: "UX", tagColor: T.purple,
        desc: "Pal moves from reactive to proactive. Morning briefings, position alerts, bill reminders, win celebrations. Users feel genuinely cared for — not just served.",
        impl: [
          "Morning briefing (opt-in, 7AM): 'SOL up 4.2%. Your BONK position is +18%. AEDC bill due in 3 days.'",
          "Position alerts: token moves ±20% from entry → Pal messages proactively. 'Your WIF is up 34%. Take some profit?'",
          "Bill reminders: 'You paid AEDC on the 15th last month. Remind you next month?' Stored in user_memory, fired by node-cron.",
          "Win celebration: 'First profitable trade! +$12.40. Here's your P&L card.' Emotional attachment = retention.",
          "All proactive messages respect user timezone (stored from first interaction) and opt-out preferences.",
        ]
      },
      {
        icon: Zap, title: "QuantumHire salary integration",
        tag: "Flywheel", tagColor: T.green,
        desc: "QuantumHire users who earn USDC from international employers receive salaries directly into ClickBot, then immediately spend, trade, or convert to NGN. Cross-product flywheel — each product feeds the other.",
        impl: [
          "QuantumHire adds 'Get paid via ClickBot' as payout option. Links to user's existing ClickBot wallet public_key.",
          "On salary arrival: Pal messages 'Your $2,400 USDC just arrived. [Convert to NGN] [Invest in yield] [Trade] [Keep as USDC]'",
          "Revenue: ClickBot earns on every conversion or trade initiated from salary. 60–80% of users convert within 48h — guaranteed volume.",
        ]
      },
    ]
  },
  {
    id: 4, label: "Phase 4", status: "scale", accent: T.coral, dim: T.cdim,
    range: "2,000+ users", title: "Unicorn",
    tagline: "Make it the infrastructure layer",
    features: [
      {
        icon: Layers, title: "ClickShift B2B API",
        tag: "B2B", tagColor: T.coral,
        desc: "White-label ClickShift's NGN fiat bridge and Solana payment rails as a REST API. Other fintechs and neobanks integrate our infrastructure. Paystack-for-agentic-commerce positioning.",
        impl: [
          "Productize existing fiat bridge into a documented REST API with API key auth, rate limiting, and webhook callbacks.",
          "Pricing: $0.008 per NGN transaction + 0.5% on value. Enterprise SLA available.",
          "Target: Nigerian fintech startups who want crypto offramp without building regulatory relationships themselves.",
          "x402 agentic payment integration (Oja): AI agents transacting on behalf of users use ClickShift rails for stablecoin payments.",
        ]
      },
      {
        icon: Map, title: "Multi-country rails",
        tag: "Expansion", tagColor: T.coral,
        desc: "Expand the NGN bridge pattern to GHS, KES, EGP. Each country is a plugin in a FiatBridgeProvider interface — new markets slot in without architectural changes.",
        impl: [
          "Ghana: Paystack API → GHS bank transfers + MTN MoMo / AirtelTigo mobile money.",
          "Kenya: M-Pesa Daraja API (Safaricom). USDC → KES → M-Pesa in under 60 seconds.",
          "Egypt: Paymob API or Fawry. High crypto adoption, strong B2B import corridor with Chinese suppliers.",
          "Architecture: abstract `FiatBridgeProvider` interface. NGN provider already exists. New countries = new plugins.",
        ]
      },
      {
        icon: Cpu, title: "Pulse — autonomous portfolio agents",
        tag: "Moat", tagColor: T.purple,
        desc: "Productise Pulse (Superteam Nigeria bounty winner) as a ClickBot premium subscription. Each user gets their own AI agent swarm — DCA agent, trailing stop agent, risk manager — all executing 24/7 with no clicks required.",
        impl: [
          "Pulse already live at pulse.clickshift.io with 6-agent architecture. Multi-user: per-user agent isolation, per-user vault wallet.",
          "/pulse activates swarm. 'Start DCA on BONK with 0.1 SOL every 30 mins' → Pal translates → Orchestrator executes.",
          "Revenue: $29/month or 10K SHIFT to activate. 100 subscribers = $2,900 MRR. 1,000 = $29,000 MRR.",
          "Pulse off-ramp agent integrates directly with ClickBot NGN bridge. Agent profits auto-flow to Nigerian bank, zero user input.",
        ]
      },
      {
        icon: DollarSign, title: "Dollar + JPY/CNY offramp corridors",
        tag: "Global", tagColor: T.coral,
        desc: "USD to US bank accounts. JPY to Japanese banks. CNY to mainland China banks. Completes the global payment picture — one USDC balance, any currency, any country.",
        impl: [
          "USD: Stripe Treasury API or Memo (memo.cash) — USDC → USD ACH in 1–2 business days.",
          "JPY: SBI Remit API or GMO Payment Gateway — USDC-funded JPY payouts to Japanese bank accounts.",
          "CNY: Airwallex Business API — HK-licensed, CNY payouts to mainland China bank accounts, AML-compliant.",
          "Revenue: 0.5–1% markup on corridor FX. B2B payments of $3K–50K = $15–500 per transaction.",
        ]
      },
    ]
  },
];

const CURRENT_STATS = [
  { label: "Users", value: "106", sub: "across 50+ countries" },
  { label: "Volume", value: "$8.4K", sub: "total processed" },
  { label: "Revenue", value: "$82", sub: "across 7 streams" },
  { label: "Weeks live", value: "7", sub: "zero paid marketing" },
];

const UNICORN_MILESTONES = [
  { users: "106", label: "Today", active: true },
  { users: "500", label: "Phase 2 complete" },
  { users: "2,000", label: "Phase 3 complete" },
  { users: "10,000", label: "Series A ready" },
  { users: "100,000", label: "Unicorn trajectory" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function PhaseTag({ label, color }) {
  return (
    <span style={{
      fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em",
      textTransform: "uppercase", padding: "3px 10px", borderRadius: "4px",
      background: `${color}18`, color, border: `1px solid ${color}40`,
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function StatusDot({ status, accent }) {
  const isActive = status === "active";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <span style={{
        width: "8px", height: "8px", borderRadius: "50%",
        background: accent, flexShrink: 0,
        boxShadow: isActive ? `0 0 10px ${accent}` : "none",
        animation: isActive ? "pulse-dot 2.2s ease-in-out infinite" : "none",
      }} />
      <span style={{ fontSize: "11px", color: accent, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {status === "active" ? "Active now" :
         status === "soon" ? "Coming soon" :
         status === "growth" ? "Growth phase" : "Scale phase"}
      </span>
    </span>
  );
}

// ── Feature Card ───────────────────────────────────────────────────────────
function FeatureCard({ feature, accent, phaseAccent }) {
  const [open, setOpen] = useState(false);
  const Icon = feature.icon;

  return (
    <div style={{
      background: T.s1, borderRadius: "14px",
      border: `1px solid ${T.border}`,
      borderLeft: `3px solid ${accent}`,
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", textAlign: "left", padding: "20px 22px",
          background: "transparent", border: "none", cursor: "pointer",
          display: "block",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px",
              background: `${accent}18`, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <Icon size={18} style={{ color: accent }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "15px", fontWeight: 600, color: T.text, marginBottom: "4px" }}>
                {feature.title}
              </div>
              <PhaseTag label={feature.tag} color={feature.tagColor} />
            </div>
          </div>
          <div style={{ color: T.muted, flexShrink: 0, marginTop: "4px" }}>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
        <p style={{ fontSize: "13px", color: T.light, lineHeight: 1.65, margin: 0 }}>
          {feature.desc}
        </p>
      </button>

      {open && (
        <div style={{
          padding: "0 22px 20px",
          borderTop: `1px solid ${T.border}`,
          paddingTop: "16px",
          marginTop: 0,
        }}>
          <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em",
            textTransform: "uppercase", color: accent, marginBottom: "12px" }}>
            Implementation
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {feature.impl.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{
                  flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%",
                  background: `${accent}18`, display: "flex", alignItems: "center",
                  justifyContent: "center", marginTop: "1px",
                }}>
                  <Check size={10} style={{ color: accent }} />
                </span>
                <span style={{ fontSize: "12px", color: T.light, lineHeight: 1.65 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Phase Section ──────────────────────────────────────────────────────────
function PhaseSection({ phase }) {
  const [expanded, setExpanded] = useState(phase.status === "active");

  return (
    <section style={{
      padding: "60px 0",
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 28px" }}>
        {/* Phase header */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "flex-start",
          justifyContent: "space-between", gap: "20px", marginBottom: "32px",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
              <div style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em",
                color: phase.accent, textTransform: "uppercase",
                padding: "4px 12px", borderRadius: "4px",
                background: `${phase.accent}12`,
                border: `1px solid ${phase.accent}30`,
              }}>
                {phase.label}
              </div>
              <StatusDot status={phase.status} accent={phase.accent} />
            </div>
            <h2 style={{
              fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700,
              color: T.text, letterSpacing: "-0.03em", lineHeight: 1.1,
              marginBottom: "8px",
            }}>{phase.title}</h2>
            <p style={{ fontSize: "15px", color: T.light }}>{phase.tagline}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "13px", color: T.muted, marginBottom: "4px",
            }}>Target range</div>
            <div style={{
              fontSize: "17px", fontWeight: 600, color: phase.accent,
            }}>{phase.range}</div>
          </div>
        </div>

        {/* Features grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))",
          gap: "12px",
        }}>
          {phase.features.map((f, i) => (
            <FeatureCard key={i} feature={f} accent={phase.accent} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Token Section ──────────────────────────────────────────────────────────
function ShiftSection() {
  const tiers = [
    { label: "Bronze", shift: "1,000", discount: "10%", badge: "#CD7C32" },
    { label: "Silver", shift: "10,000", discount: "25%", badge: "#9CA3AF" },
    { label: "Gold", shift: "100,000", discount: "50%", badge: T.gold },
    { label: "Diamond", shift: "500,000", discount: "Free card", badge: "#22D3EE" },
  ];

  return (
    <section style={{
      padding: "80px 0",
      background: `linear-gradient(180deg, ${T.bg} 0%, ${T.s2} 50%, ${T.bg} 100%)`,
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em",
            color: T.gold, textTransform: "uppercase",
            padding: "4px 12px", borderRadius: "4px",
            background: `${T.gold}12`, border: `1px solid ${T.gold}30`,
            marginBottom: "16px",
          }}>$SHIFT Token — TGE Q4 2026</div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700,
            color: T.text, letterSpacing: "-0.03em", lineHeight: 1.2,
            marginBottom: "16px",
          }}>Not a speculative token.<br />A utility engine.</h2>
          <p style={{ fontSize: "16px", color: T.light, maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Every feature on ClickBot is more powerful when you hold $SHIFT. 
            The more you hold, the less you pay, the more you earn, and the bigger your say in where we go next.
          </p>
        </div>

        {/* Tiers */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px", marginBottom: "40px",
        }}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              background: T.s1, border: `1px solid ${T.border}`,
              borderRadius: "12px", padding: "20px",
              textAlign: "center",
              borderTop: `3px solid ${t.badge}`,
            }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: t.badge, marginBottom: "8px" }}>{t.label}</div>
              <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "18px", fontWeight: 700, color: T.text, marginBottom: "4px" }}>{t.shift}</div>
              <div style={{ fontSize: "12px", color: T.muted, marginBottom: "12px" }}>$SHIFT held</div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: t.badge }}>{t.discount}</div>
              <div style={{ fontSize: "11px", color: T.muted }}>fee discount</div>
            </div>
          ))}
        </div>

        {/* Token utilities */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}>
          {[
            { icon: TrendingUp, label: "Monthly cashback", desc: "Hold 30 days → earn SHIFT proportional to your trading volume" },
            { icon: Lock, label: "Staking yield", desc: "Lock 30/90/180 days → earn APY from protocol revenue share" },
            { icon: Star, label: "Governance voting", desc: "Vote on fee parameters, new chains, feature priorities via Realms" },
            { icon: Fingerprint, label: "Premium Pal features", desc: "Advanced RAG capabilities gated behind SHIFT holding" },
            { icon: CreditCard, label: "Free card issuance", desc: "Diamond tier gets fee-free virtual card and higher spend limits" },
            { icon: BarChart3, label: "CEX listing fuel", desc: "Holder count + staking TVL = the listing application for MEXC/Gate" },
          ].map((u, i) => {
            const Icon = u.icon;
            return (
              <div key={i} style={{
                background: T.s1, border: `1px solid ${T.border}`,
                borderRadius: "12px", padding: "16px 18px",
                display: "flex", gap: "12px", alignItems: "flex-start",
              }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: `${T.gold}12`, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={16} style={{ color: T.gold }} />
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: T.text, marginBottom: "4px" }}>{u.label}</div>
                  <div style={{ fontSize: "12px", color: T.muted, lineHeight: 1.5 }}>{u.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Unicorn Section ────────────────────────────────────────────────────────
function UnicornSection() {
  const revenueStreams = [
    "Trading fees (1%)", "Fiat bridge spread (2–4%)", "Utility bill margin (2%)",
    "Yield platform cut (20%)", "Ultra Speed MEV subscriptions ($20/mo)",
    "Card interchange fees (0.5–1.5%)", "B2B API licensing", "$SHIFT staking rewards",
    "Pulse agent subscriptions ($29/mo)", "Corridor FX markup (0.5–1%)",
    "Delta-neutral yield cut (30%)", "$SHIFT token treasury",
  ];

  return (
    <section style={{
      padding: "80px 0",
      borderTop: `1px solid ${T.border}`,
    }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em",
            color: T.coral, textTransform: "uppercase",
            padding: "4px 12px", borderRadius: "4px",
            background: `${T.coral}12`, border: `1px solid ${T.coral}30`,
            marginBottom: "16px",
          }}>The unicorn path</div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700,
            color: T.text, letterSpacing: "-0.03em", lineHeight: 1.2,
            marginBottom: "16px",
          }}>$1B ARR in 24 months.<br />Here is the math.</h2>
          <p style={{ fontSize: "16px", color: T.light, maxWidth: "580px", margin: "0 auto", lineHeight: 1.7 }}>
            At 200,000 active users with current ARPU trajectory, or B2B volume pushing transaction revenue to $5M/month, we cross the unicorn threshold. Both paths are live.
          </p>
        </div>

        {/* Milestone track */}
        <div style={{
          display: "flex", alignItems: "center", gap: 0,
          background: T.s1, borderRadius: "14px", border: `1px solid ${T.border}`,
          padding: "28px", marginBottom: "40px", overflowX: "auto",
        }}>
          {UNICORN_MILESTONES.map((m, i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: "center", flexShrink: 0, minWidth: "100px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: m.active ? T.green : `${T.border}`,
                  border: m.active ? `2px solid ${T.green}` : `2px solid ${T.border}`,
                  margin: "0 auto 8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: m.active ? `0 0 16px ${T.green}` : "none",
                }}>
                  {m.active ? <Zap size={16} style={{ color: "#000" }} /> : <Circle size={12} style={{ color: T.muted }} />}
                </div>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "15px", fontWeight: 700, color: m.active ? T.green : T.text, marginBottom: "4px" }}>{m.users}</div>
                <div style={{ fontSize: "10px", color: m.active ? T.green : T.muted, maxWidth: "80px", margin: "0 auto", lineHeight: 1.3 }}>{m.label}</div>
              </div>
              {i < UNICORN_MILESTONES.length - 1 && (
                <div style={{
                  flex: 1, height: "2px", minWidth: "20px",
                  background: i === 0 ? `linear-gradient(90deg, ${T.green}, ${T.border})` : T.border,
                  margin: "0 4px", marginBottom: "20px",
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Revenue streams */}
        <div style={{
          background: T.s1, borderRadius: "14px", border: `1px solid ${T.border}`,
          padding: "28px",
        }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em",
            textTransform: "uppercase", color: T.muted, marginBottom: "20px" }}>
            12 planned revenue streams
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px",
          }}>
            {revenueStreams.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: i < 7 ? T.green : T.gold, flexShrink: 0,
                }} />
                <span style={{ fontSize: "13px", color: T.light }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: `1px solid ${T.border}` }}>
            <span style={{ fontSize: "12px", color: T.muted }}>
              Green = live today · Gold = Phase 2–4
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function FuturePage() {
  const [activePhase, setActivePhase] = useState("all");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const filteredPhases = activePhase === "all"
    ? PHASES
    : PHASES.filter(p => String(p.id) === activePhase);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text }}>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px currentColor; }
          50% { opacity: 0.35; box-shadow: 0 0 4px currentColor; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-anim { animation: fade-up 0.6s ease both; }
        .hero-anim-2 { animation: fade-up 0.6s 0.1s ease both; }
        .hero-anim-3 { animation: fade-up 0.6s 0.2s ease both; }
        .feat-card:hover { border-color: rgba(255,255,255,0.15) !important; }
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        @media (max-width: 600px) {
          .phase-grid { grid-template-columns: 1fr !important; }
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        padding: "100px 28px 80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,200,100,0.06) 0%, transparent 70%)`,
        }} />

        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>
          {/* Mission badge */}
          <div className="hero-anim" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: `${T.green}12`, border: `1px solid ${T.green}30`,
            borderRadius: "20px", padding: "6px 16px",
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em",
            color: T.green, textTransform: "uppercase", marginBottom: "24px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: T.green, boxShadow: `0 0 8px ${T.green}`,
              animation: "pulse-dot 2.2s ease-in-out infinite",
            }} />
            Phase 1 active · Mission in progress
          </div>

          <h1 className="hero-anim-2" style={{
            fontSize: "clamp(36px, 7vw, 72px)", fontWeight: 800,
            letterSpacing: "-0.04em", lineHeight: 1.05,
            marginBottom: "24px", color: T.text,
          }}>
            The next{" "}
            <span style={{ color: T.green }}>24 months</span>
            <br />of ClickBot.
          </h1>

          <p className="hero-anim-3" style={{
            fontSize: "clamp(16px, 2vw, 20px)", color: T.light,
            lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 40px",
          }}>
            From 106 users and $82 in revenue to a unicorn-trajectory financial super-app
            serving the entire African continent and beyond.
            Every feature below is designed, scoped, and ready to ship.
          </p>

          {/* Live stats */}
          <div className="stat-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px", maxWidth: "720px", margin: "0 auto 48px",
          }}>
            {CURRENT_STATS.map((s, i) => (
              <div key={i} style={{
                background: T.s1, border: `1px solid ${T.border}`,
                borderRadius: "12px", padding: "16px 12px", textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "22px", fontWeight: 700, color: T.green, lineHeight: 1,
                  marginBottom: "4px",
                }}>{s.value}</div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: T.text, marginBottom: "2px" }}>{s.label}</div>
                <div style={{ fontSize: "10px", color: T.muted }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Phase filter tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
            {[{ id: "all", label: "All phases" }, ...PHASES.map(p => ({ id: String(p.id), label: p.label }))].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePhase(tab.id)}
                style={{
                  padding: "8px 20px", borderRadius: "8px", fontSize: "13px",
                  fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                  background: activePhase === tab.id ? T.green : "transparent",
                  color: activePhase === tab.id ? "#000" : T.light,
                  border: `1px solid ${activePhase === tab.id ? T.green : T.border}`,
                }}
              >{tab.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHASES ── */}
      {filteredPhases.map(phase => (
        <PhaseSection key={phase.id} phase={phase} />
      ))}

      {/* ── $SHIFT ── */}
      {(activePhase === "all" || activePhase === "2") && <ShiftSection />}

      {/* ── UNICORN ── */}
      {(activePhase === "all" || activePhase === "4") && <UnicornSection />}

      {/* ── CTA ── */}
      <section style={{
        padding: "80px 28px",
        borderTop: `1px solid ${T.border}`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700,
            color: T.text, letterSpacing: "-0.03em", marginBottom: "16px",
          }}>The early users are still early.</h2>
          <p style={{ fontSize: "16px", color: T.light, lineHeight: 1.7, marginBottom: "32px" }}>
            106 people figured this out before anyone else told them to.
            Every week that number grows. The $SHIFT point multiplier is 3x right now and won't stay that way forever.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            <a
              href="https://t.me/clicksolbot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: T.green, color: "#000",
                padding: "14px 28px", borderRadius: "10px",
                fontSize: "15px", fontWeight: 700, textDecoration: "none",
                transition: "opacity 0.15s",
              }}
            >
              Start using ClickBot <ArrowRight size={16} />
            </a>
            <Link
              href="/about"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "transparent", color: T.text,
                padding: "14px 28px", borderRadius: "10px",
                fontSize: "15px", fontWeight: 500, textDecoration: "none",
                border: `1px solid ${T.border}`, transition: "border-color 0.15s",
              }}
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <div style={{
        padding: "24px 28px", borderTop: `1px solid ${T.border}`,
        display: "flex", flexWrap: "wrap", justifyContent: "space-between",
        alignItems: "center", gap: "12px",
        maxWidth: "1040px", margin: "0 auto",
      }}>
        <span style={{ fontSize: "12px", color: T.muted }}>
          clickshift.io/future · Last updated July 2026
        </span>
        <span style={{ fontSize: "12px", color: T.muted }}>
          Investor data: <a href="https://api.clickshift.io/api/investor?key=Clickbot2026"
            target="_blank" rel="noopener noreferrer"
            style={{ color: T.green, textDecoration: "none" }}>
            api.clickshift.io/api/investor
          </a>
        </span>
      </div>
    </div>
  );
}