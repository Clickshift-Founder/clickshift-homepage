"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */
type ThoughtType = "WAKE" | "READ" | "THINK" | "PLAN" | "EXECUTE" | "SUCCESS" | "ALERT" | "ERROR";
type AgentType = "defi" | "nft" | "lending" | "arb" | "risk" | "yield" | "sentiment" | "bridge" | "gov" | "perps";

interface AgentThought {
  agent: string;
  type: AgentType;
  ttype: ThoughtType;
  msg: string;
  net: string;
  netColor: string;
  agentColor: string;
  agentBg: string;
}

interface LiveThought extends AgentThought {
  id: number;
  ts: string;
  age: number; // 0 = newest
}

/* ─────────────────────────────────────────────────────────────────────────────
   THOUGHT SCRIPT — 60 entries across full Web3 surface area
───────────────────────────────────────────────────────────────────────────── */
const SCRIPT: AgentThought[] = [
  // ── Pulse / DeFi ──
  { agent: "Pulse Orchestrator", type: "defi", ttype: "WAKE",    agentColor: "#22d3ee", agentBg: "rgba(34,211,238,.12)", net: "Solana",   netColor: "#9945FF", msg: "Swarm initialising. 6 sub-agents loading. Capital pool: <b>12.4 SOL</b>. Mission locked." },
  { agent: "Pulse Orchestrator", type: "defi", ttype: "PLAN",    agentColor: "#22d3ee", agentBg: "rgba(34,211,238,.12)", net: "Solana",   netColor: "#9945FF", msg: "Mission broadcast: <b>\"Accumulate SOL below $140. Exit above $180. Protect capital.\"</b>" },
  { agent: "Pulse Orchestrator", type: "defi", ttype: "SUCCESS", agentColor: "#22d3ee", agentBg: "rgba(34,211,238,.12)", net: "Solana",   netColor: "#9945FF", msg: "Mission <b>\"Accumulate Phase\"</b> complete. Portfolio +18.4%. Activating <b>\"Distribution Phase\"</b>." },
  { agent: "DCA Scout",          type: "defi", ttype: "EXECUTE", agentColor: "#4ade80", agentBg: "rgba(74,222,128,.1)",  net: "Solana",   netColor: "#9945FF", msg: "Jupiter V6 swap: <b>0.01 SOL → 142,857 BONK</b>. Slippage 0.8%. Sig: 5xRt...k9mP ✓" },
  { agent: "DCA Scout",          type: "defi", ttype: "SUCCESS", agentColor: "#4ade80", agentBg: "rgba(74,222,128,.1)",  net: "Solana",   netColor: "#9945FF", msg: "Round 7/∞ complete. Avg basis: <b>$0.000021</b>. Total BONK: 1.02M. Unrealised: <b>+14.3%</b>." },
  { agent: "Trailing Stop",      type: "defi", ttype: "SUCCESS", agentColor: "#4ade80", agentBg: "rgba(74,222,128,.1)",  net: "Solana",   netColor: "#9945FF", msg: "<b>POPCAT</b> peak locked: $0.98. Trail: 8%. Current: $0.94. Holding. Unrealised P&L: <b>+234%</b>." },
  { agent: "Trailing Stop",      type: "defi", ttype: "ALERT",   agentColor: "#4ade80", agentBg: "rgba(74,222,128,.1)",  net: "Solana",   netColor: "#9945FF", msg: "<b>WIF</b> dropped 9.2% from peak. Trail breached. Executing market sell. Locking <b>+312%</b> profit." },
  { agent: "Off-Ramp Agent",     type: "defi", ttype: "SUCCESS", agentColor: "#22d3ee", agentBg: "rgba(34,211,238,.12)", net: "Solana",   netColor: "#9945FF", msg: "Profit target <b>+15%</b> hit. Sweeping 0.8 SOL to cold wallet. Trail on remaining 20%." },

  // ── NFT ──
  { agent: "NFT Sniper",         type: "nft",  ttype: "ALERT",   agentColor: "#a78bfa", agentBg: "rgba(167,139,250,.12)", net: "Solana",  netColor: "#9945FF", msg: "<b>Mad Lads #4471</b> listed 62% below floor. Wallet age: 847 days. Auto-bid: 24.2 SOL queued." },
  { agent: "NFT Sniper",         type: "nft",  ttype: "EXECUTE", agentColor: "#a78bfa", agentBg: "rgba(167,139,250,.12)", net: "Solana",  netColor: "#9945FF", msg: "Bid confirmed: <b>Mad Lads #4471</b> acquired at 24.2 SOL. Floor: 39.8 SOL. Unrealised: +64%." },
  { agent: "NFT Rarity Scout",   type: "nft",  ttype: "ALERT",   agentColor: "#a78bfa", agentBg: "rgba(167,139,250,.12)", net: "Solana",  netColor: "#9945FF", msg: "<b>Okay Bears #1192</b> — rank 47/10K. Listed at floor. Rarity premium historically 2.4×. Flagging." },
  { agent: "NFT Royalty Sweep",  type: "nft",  ttype: "EXECUTE", agentColor: "#a78bfa", agentBg: "rgba(167,139,250,.12)", net: "Solana",  netColor: "#9945FF", msg: "Bulk sweep: <b>7× DeGods</b> below predicted recovery floor. Avg 8.1 SOL. Expected: 10.4 SOL." },
  { agent: "NFT Royalty Sweep",  type: "nft",  ttype: "THINK",   agentColor: "#a78bfa", agentBg: "rgba(167,139,250,.12)", net: "Ethereum",netColor: "#627EEA", msg: "BAYC floor compression holding 3 weeks. Whale accumulation pattern matches pre-run in June 2023." },

  // ── Lending / Borrowing ──
  { agent: "Kamino Lender",      type: "lending", ttype: "SUCCESS", agentColor: "#fb923c", agentBg: "rgba(251,146,60,.1)", net: "Solana",  netColor: "#9945FF", msg: "Deposited <b>500 USDC</b> into Kamino vault. APY locked: <b>14.7%</b>. Health factor: 2.8." },
  { agent: "Aave Borrower",      type: "lending", ttype: "EXECUTE", agentColor: "#fb923c", agentBg: "rgba(251,146,60,.1)", net: "Ethereum",netColor: "#627EEA", msg: "Collateral: <b>2 ETH</b>. Borrowed 3,000 USDC at 4.2% APR. Deployed to Convex yield vault: 18.4% APY." },
  { agent: "Aave Borrower",      type: "lending", ttype: "ALERT",   agentColor: "#fb923c", agentBg: "rgba(251,146,60,.1)", net: "Ethereum",netColor: "#627EEA", msg: "Health factor: <b>1.22</b> — approaching warning threshold. Queuing partial repayment of 500 USDC." },
  { agent: "Liquidation Guard",  type: "lending", ttype: "SUCCESS", agentColor: "#fb923c", agentBg: "rgba(251,146,60,.1)", net: "Solana",  netColor: "#9945FF", msg: "Position SOL/USDC at 87% LTV. Auto-repay 200 USDC executed. Health factor restored to 1.8." },
  { agent: "Morpho Agent",       type: "lending", ttype: "SUCCESS", agentColor: "#fb923c", agentBg: "rgba(251,146,60,.1)", net: "Ethereum",netColor: "#627EEA", msg: "Matched peer-to-peer on Morpho: <b>10K USDC</b> lent at <b>7.4% APY</b> (vs 5.1% pool rate). +44% yield." },

  // ── Arbitrage ──
  { agent: "Arb Hunter",         type: "arb",  ttype: "EXECUTE", agentColor: "#34d399", agentBg: "rgba(52,211,153,.1)",  net: "Solana",   netColor: "#9945FF", msg: "Spread: Orca <b>$0.000034</b> vs Raydium <b>$0.000038</b>. Net after gas: <b>+0.0042 SOL</b>. Executing." },
  { agent: "Arb Hunter",         type: "arb",  ttype: "THINK",   agentColor: "#34d399", agentBg: "rgba(52,211,153,.1)",  net: "Solana",   netColor: "#9945FF", msg: "Scanning 47 pool pairs for spread > gas threshold. Best today: 0.31% on mSOL/SOL." },
  { agent: "Flash Arb",          type: "arb",  ttype: "SUCCESS", agentColor: "#34d399", agentBg: "rgba(52,211,153,.1)",  net: "Ethereum", netColor: "#627EEA", msg: "Flash loan: <b>100K USDC</b>. Uni V3 → Curve → Balancer. Profit: <b>+$312.40</b>. Repaid in 1 tx." },
  { agent: "CEX/DEX Arb",        type: "arb",  ttype: "EXECUTE", agentColor: "#34d399", agentBg: "rgba(52,211,153,.1)",  net: "Base",     netColor: "#0052FF", msg: "BTC: Binance <b>$95,420</b> vs Aerodrome <b>$95,680</b>. Executing cross-venue arb. Net: +$87.40." },

  // ── Risk / Safety ──
  { agent: "Whale Watcher",      type: "risk", ttype: "ALERT",   agentColor: "#f87171", agentBg: "rgba(248,113,113,.1)", net: "Ethereum", netColor: "#627EEA", msg: "<b>0x8f2a...</b> moved 4,200 ETH to Coinbase. Likely OTC. Price impact: moderate. Reducing exposure." },
  { agent: "Whale Watcher",      type: "risk", ttype: "THINK",   agentColor: "#f87171", agentBg: "rgba(248,113,113,.1)", net: "Solana",   netColor: "#9945FF", msg: "Sun Pump whale: 3 wallets, 14M BONK in 2h. Coordinated accumulation. Possible pump incoming." },
  { agent: "Risk Manager",       type: "risk", ttype: "SUCCESS", agentColor: "#f87171", agentBg: "rgba(248,113,113,.1)", net: "Solana",   netColor: "#9945FF", msg: "RugCheck scan: <b>12 tokens</b> assessed. 1 flagged (score 23/100). Position closed pre-dump." },
  { agent: "Stablecoin Guard",   type: "risk", ttype: "ALERT",   agentColor: "#f87171", agentBg: "rgba(248,113,113,.1)", net: "Ethereum", netColor: "#627EEA", msg: "USDC/USDT de-peg detected: spread 0.12%. Rotating 10K USDC → DAI as precaution." },
  { agent: "Risk Manager",       type: "risk", ttype: "ALERT",   agentColor: "#f87171", agentBg: "rgba(248,113,113,.1)", net: "Solana",   netColor: "#9945FF", msg: "Governor: 7/7 safety checks PASSED. Max tx cap, slippage, liquidity, blacklist — all clear." },

  // ── Yield / LP ──
  { agent: "Yield Farmer",       type: "yield", ttype: "SUCCESS", agentColor: "#a3e635", agentBg: "rgba(163,230,53,.1)",  net: "Solana",  netColor: "#9945FF", msg: "Auto-compounded <b>USDC/SOL</b> LP. Claimed 0.34 SOL fees. Pool TVL: $2.1M. APY: <b>38.2%</b>." },
  { agent: "Yield Farmer",       type: "yield", ttype: "EXECUTE", agentColor: "#a3e635", agentBg: "rgba(163,230,53,.1)",  net: "Solana",  netColor: "#9945FF", msg: "Migrating to Meteora DLMM. New APY estimate: <b>52.1%</b> (vs 38.2% Orca CLMM). Executing." },
  { agent: "LP Optimizer",       type: "yield", ttype: "THINK",   agentColor: "#a3e635", agentBg: "rgba(163,230,53,.1)",  net: "Arbitrum",netColor: "#28A0F0", msg: "USDC/ETH range: price drifted 4.2% from midpoint. Recenter saves 0.8% IL. Queuing tx." },
  { agent: "Convex Bot",         type: "yield", ttype: "SUCCESS", agentColor: "#a3e635", agentBg: "rgba(163,230,53,.1)",  net: "Ethereum",netColor: "#627EEA", msg: "Locked <b>veCRV</b> for 4 years. Boosted yield: <b>2.5×</b>. Estimated annual: +$2,840 on 10K deposit." },
  { agent: "Staking Agent",      type: "yield", ttype: "EXECUTE", agentColor: "#a3e635", agentBg: "rgba(163,230,53,.1)",  net: "Solana",  netColor: "#9945FF", msg: "Staked <b>10 SOL</b> via Marinade. mSOL issued. Native staking APY: <b>7.1%</b>. Liquid at any time." },

  // ── Sentiment ──
  { agent: "Sentiment Agent",    type: "sentiment", ttype: "THINK",   agentColor: "#e879f9", agentBg: "rgba(232,121,249,.1)", net: "Solana",  netColor: "#9945FF", msg: "Social velocity: <b>WIF +340%</b> in 4h. On-chain holders +12%. Confidence: 81%. Entry window: 12 min." },
  { agent: "Sentiment Agent",    type: "sentiment", ttype: "SUCCESS", agentColor: "#e879f9", agentBg: "rgba(232,121,249,.1)", net: "Solana",  netColor: "#9945FF", msg: "Prediction resolved: WIF <b>+67%</b> in 18h. Signal confidence 81%. Model accuracy updated: 74.3%." },
  { agent: "News Scanner",       type: "sentiment", ttype: "ALERT",   agentColor: "#e879f9", agentBg: "rgba(232,121,249,.1)", net: "Global",  netColor: "#94a3b8", msg: "SEC news: positive ETF language detected. Historical pattern → BTC +8-14% in 48h. Positioning." },
  { agent: "Fear & Greed Bot",   type: "sentiment", ttype: "THINK",   agentColor: "#e879f9", agentBg: "rgba(232,121,249,.1)", net: "Global",  netColor: "#94a3b8", msg: "Fear & Greed Index: <b>82 (Extreme Greed)</b>. Historically precedes 15-30% correction. Reducing leverage." },

  // ── Bridge / Cross-chain ──
  { agent: "Bridge Agent",       type: "bridge", ttype: "EXECUTE", agentColor: "#38bdf8", agentBg: "rgba(56,189,248,.1)", net: "Ethereum", netColor: "#627EEA", msg: "Bridging <b>0.5 ETH → Base</b> via Stargate. Est. 2 min. Fee: $1.12. Monitoring receipt." },
  { agent: "Bridge Agent",       type: "bridge", ttype: "SUCCESS", agentColor: "#38bdf8", agentBg: "rgba(56,189,248,.1)", net: "Base",     netColor: "#0052FF", msg: "Bridge complete: <b>0.5 ETH received on Base</b>. Deploying to Aerodrome USDC/ETH: 24.8% APY." },
  { agent: "Cross-Chain Scout",  type: "bridge", ttype: "THINK",   agentColor: "#38bdf8", agentBg: "rgba(56,189,248,.1)", net: "Arbitrum", netColor: "#28A0F0", msg: "Yield delta: Arbitrum GMX 28% APY vs Ethereum Convex 18% APY. Bridge cost: $4.20. ROI: 6 days." },

  // ── Governance ──
  { agent: "Governance Bot",     type: "gov",  ttype: "EXECUTE", agentColor: "#818cf8", agentBg: "rgba(129,140,248,.1)", net: "Ethereum", netColor: "#627EEA", msg: "Voted YES on <b>MakerDAO MIP-104</b>. DAI stability fee adjustment. Voting power: 4,200 MKR." },
  { agent: "Governance Bot",     type: "gov",  ttype: "THINK",   agentColor: "#818cf8", agentBg: "rgba(129,140,248,.1)", net: "Ethereum", netColor: "#627EEA", msg: "Analysing <b>Uniswap Proposal #42</b>. Fee switch activation. LP revenue impact: +$2.1M ARR projected." },
  { agent: "DAO Treasury Bot",   type: "gov",  ttype: "SUCCESS", agentColor: "#818cf8", agentBg: "rgba(129,140,248,.1)", net: "Ethereum", netColor: "#627EEA", msg: "Treasury rebalanced: 60% stables / 30% ETH / 10% protocol tokens. Diversification score: A+." },

  // ── Perpetuals ──
  { agent: "Perps Agent",        type: "perps", ttype: "EXECUTE", agentColor: "#f59e0b", agentBg: "rgba(245,158,11,.1)",  net: "Arbitrum", netColor: "#28A0F0", msg: "Opened <b>BTC LONG 3×</b> on dYdX. Entry: $95,440. Stop: $91,800. Target: $105,000. Risk: 2%." },
  { agent: "Perps Agent",        type: "perps", ttype: "SUCCESS", agentColor: "#f59e0b", agentBg: "rgba(245,158,11,.1)",  net: "Arbitrum", netColor: "#28A0F0", msg: "TP1 hit: $100,200 (+4.9%). Moved stop to break-even. Trailing remaining <b>50% position</b>." },
  { agent: "Funding Rate Bot",   type: "perps", ttype: "ALERT",   agentColor: "#f59e0b", agentBg: "rgba(245,158,11,.1)",  net: "Arbitrum", netColor: "#28A0F0", msg: "BTC funding rate: <b>+0.18%/8h</b> — extreme longs. Pairs trade: short perp + long spot delta-neutral." },
  { agent: "Liquidation Hunter", type: "perps", ttype: "THINK",   agentColor: "#f59e0b", agentBg: "rgba(245,158,11,.1)",  net: "Ethereum", netColor: "#627EEA", msg: "$140M long positions liquidate at BTC $91,200. Likely price magnet. Adjusting entry bias accordingly." },

  // ── More variety ──
  { agent: "MEV Bot",            type: "arb",  ttype: "SUCCESS", agentColor: "#34d399", agentBg: "rgba(52,211,153,.1)",  net: "Ethereum", netColor: "#627EEA", msg: "Sandwich captured: <b>+0.014 ETH</b> on $48K USDC/WETH swap. Gas cost: $3.20. Net: $30.80." },
  { agent: "Copy Trade Agent",   type: "defi", ttype: "EXECUTE", agentColor: "#4ade80", agentBg: "rgba(74,222,128,.1)",  net: "Solana",   netColor: "#9945FF", msg: "Alpha wallet <b>0xA3f...</b> just entered MYRO. Mirroring 1.2 SOL position with 400ms delay." },
  { agent: "Options Agent",      type: "defi", ttype: "EXECUTE", agentColor: "#22d3ee", agentBg: "rgba(34,211,238,.12)", net: "Ethereum", netColor: "#627EEA", msg: "Sold <b>ETH $3,500 call</b> expiry 14d on Lyra. Premium: 0.04 ETH. Hedging long spot position." },
  { agent: "Token Launcher",     type: "defi", ttype: "ALERT",   agentColor: "#22d3ee", agentBg: "rgba(34,211,238,.12)", net: "Solana",   netColor: "#9945FF", msg: "New Pump.fun token: <b>$CHIP</b>. Dev wallet: 2% (safe). Liquidity burned. Social: rising. Watching." },
  { agent: "Insurance Agent",    type: "risk", ttype: "EXECUTE", agentColor: "#f87171", agentBg: "rgba(248,113,113,.1)", net: "Ethereum", netColor: "#627EEA", msg: "Purchased Nexus Mutual cover: <b>5 ETH</b> for 60 days on Aave smart contract risk. Premium: 0.02 ETH." },
  { agent: "RWA Agent",          type: "yield", ttype: "SUCCESS", agentColor: "#a3e635", agentBg: "rgba(163,230,53,.1)",  net: "Ethereum",netColor: "#627EEA", msg: "Ondo Finance USDY position: <b>$5,000 → $5,227</b> in 90 days. 18.1% APY. T-bill backed. Stable." },
  { agent: "Pulse Orchestrator", type: "defi", ttype: "READ",    agentColor: "#22d3ee", agentBg: "rgba(34,211,238,.12)", net: "Solana",   netColor: "#9945FF", msg: "Heartbeat cycle 142. All 6 agents responsive. Portfolio health: A+. Next rebalance: 4h 12m." },
];

/* ─────────────────────────────────────────────────────────────────────────────
   COLOUR HELPERS
───────────────────────────────────────────────────────────────────────────── */
const TYPE_COLOR: Record<ThoughtType, string> = {
  WAKE:    "#22d3ee",
  READ:    "#94a3b8",
  THINK:   "#a78bfa",
  PLAN:    "#fb923c",
  EXECUTE: "#4ade80",
  SUCCESS: "#4ade80",
  ALERT:   "#f87171",
  ERROR:   "#f87171",
};

/* ─────────────────────────────────────────────────────────────────────────────
   STAT COUNTERS
───────────────────────────────────────────────────────────────────────────── */
const useAnimatedCounter = (target: number, duration = 1200) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
};

/* ─────────────────────────────────────────────────────────────────────────────
   SINGLE ROW
───────────────────────────────────────────────────────────────────────────── */
interface ThoughtRowProps { thought: LiveThought; }

const ThoughtRow: React.FC<ThoughtRowProps> = ({ thought: t }) => {
  const opacity = t.age === 0 ? 1 : t.age === 1 ? 0.85 : t.age === 2 ? 0.65 : t.age === 3 ? 0.42 : 0.22;

  return (
    <div
      className="flex items-start gap-2 sm:gap-3 px-3 sm:px-5 py-2 transition-all duration-500"
      style={{ opacity, animation: t.age === 0 ? "tsSlideIn 0.3s ease-out" : undefined }}
    >
      {/* Agent badge */}
      <span
        className="flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wide whitespace-nowrap mt-0.5"
        style={{ background: t.agentBg, color: t.agentColor }}
      >
        {t.agent}
      </span>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span
            className="text-[8px] sm:text-[9px] font-mono font-medium px-1.5 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.06)", color: TYPE_COLOR[t.ttype] }}
          >
            {t.ttype}
          </span>
        </div>
        <p
          className="text-[11px] sm:text-[12px] leading-relaxed text-slate-300"
          dangerouslySetInnerHTML={{ __html: t.msg.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>') }}
        />
      </div>

      {/* Right meta */}
      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <span
          className="text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded"
          style={{ background: `${t.netColor}22`, color: t.netColor }}
        >
          {t.net}
        </span>
        <span className="text-[9px] text-slate-600 font-mono">{t.ts}</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const AgentThoughtStream: React.FC = () => {
  const [thoughts, setThoughts] = useState<LiveThought[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [tpm, setTpm] = useState(0);
  const idxRef = useRef(0);
  const tpmCountRef = useRef(0);
  const counterTarget = useAnimatedCounter(totalCount > 0 ? totalCount : 0);

  const MAX_VISIBLE = 7;
  const INTERVAL_MS = 1800;

  const addThought = useCallback(() => {
    const raw = SCRIPT[idxRef.current % SCRIPT.length];
    idxRef.current++;
    tpmCountRef.current++;

    const now = new Date();
    const ts = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const newThought: LiveThought = { ...raw, id: Date.now() + Math.random(), ts, age: 0 };

    setThoughts(prev => {
      const updated = prev.map(t => ({ ...t, age: t.age + 1 }));
      const trimmed = updated.filter(t => t.age < MAX_VISIBLE);
      return [newThought, ...trimmed];
    });

    setTotalCount(c => c + 1);
  }, []);

  // Seed initial thoughts
  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addThought(), i * 200);
    }
  }, [addThought]);

  // Main interval
  useEffect(() => {
    const timer = setInterval(addThought, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [addThought]);

  // TPM counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTpm(tpmCountRef.current * 6);
      tpmCountRef.current = 0;
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const agentCount = Math.min(12, Math.ceil(totalCount / 3));

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes tsSlideIn {
          from { transform: translateY(6px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes tsPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Section heading */}
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Powered by ClickShift
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3">
              The Agent Intelligence Layer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Every second, autonomous agents across Web3 are thinking, deciding, and executing —
              all powered by the ClickShift Chip.
            </p>
          </div>

          {/* Terminal window */}
          <div className="rounded-2xl overflow-hidden border border-slate-700/60" style={{ background: "#0a0f1a" }}>

            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800" style={{ background: "#0d1525" }}>
              <div className="flex items-center gap-2">
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-slate-500 text-xs font-mono ml-2 hidden sm:block">
                  clickshift://agent-intelligence-feed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-green-400"
                  style={{ animation: "tsPulse 1.4s ease-in-out infinite" }}
                />
                <span className="text-green-400 text-xs font-semibold tracking-wide">LIVE</span>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border-b border-slate-800" style={{ background: "#0b1120" }}>
              {[
                { label: "Agents active",    value: agentCount.toString() },
                { label: "Thoughts / min",   value: tpm > 0 ? tpm.toString() : "—" },
                { label: "Networks covered", value: "8" },
                { label: "Total processed",  value: counterTarget.toLocaleString() },
              ].map(s => (
                <div key={s.label} className="px-4 py-2.5" style={{ background: "#0b1120" }}>
                  <div className="text-[10px] text-slate-600 mb-0.5">{s.label}</div>
                  <div className="text-sm font-mono font-medium text-slate-300">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Feed */}
            <div className="overflow-hidden" style={{ minHeight: "320px", maxHeight: "380px" }}>
              {thoughts.map(t => (
                <ThoughtRow key={t.id} thought={t} />
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-slate-800 flex items-center justify-between" style={{ background: "#0d1525" }}>
              <span className="text-[10px] text-slate-600 font-mono">
                ClickShift Chip v2.1 — Agent Intelligence Protocol
              </span>
              <span className="text-[10px] text-cyan-600 font-mono hidden sm:block">
                Securing every autonomous decision onchain
              </span>
            </div>
          </div>

          {/* Agent type legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[
              { label: "DeFi / Trading",   color: "#4ade80" },
              { label: "NFT",              color: "#a78bfa" },
              { label: "Lending",          color: "#fb923c" },
              { label: "Arbitrage",        color: "#34d399" },
              { label: "Risk & Safety",    color: "#f87171" },
              { label: "Yield / LP",       color: "#a3e635" },
              { label: "Sentiment",        color: "#e879f9" },
              { label: "Governance",       color: "#818cf8" },
              { label: "Perpetuals",       color: "#f59e0b" },
              { label: "Cross-chain",      color: "#38bdf8" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-[10px] text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default AgentThoughtStream;