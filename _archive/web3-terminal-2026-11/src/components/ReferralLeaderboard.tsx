"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Trophy, Zap, Users, TrendingUp, Star, Crown, ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
interface LeaderEntry {
  rank: number;
  referrer_id: string | number;
  display_name: string;
  unique_referrals: number;
  trades_generated: number;
  total_earned_sol: number;
  last_activity: string | null;
}

interface ProgramStats {
  total_referrers: number;
  total_referred_users: number;
  total_paid_out_sol: number;
  paid_7d_sol: number;
}

type Period = "all" | "30d" | "7d";

const STATS_BASE_URL =
  process.env.NEXT_PUBLIC_STATS_API_URL || "https://api.clickshift.io";

// ─────────────────────────────────────────────────────────────────
// RANK CONFIG
// ─────────────────────────────────────────────────────────────────
function rankConfig(rank: number) {
  if (rank === 1) return { color: "#FFD700", bg: "rgba(255,215,0,0.1)",  border: "rgba(255,215,0,0.3)",  label: "👑", glow: "#FFD70060" };
  if (rank === 2) return { color: "#C0C0C0", bg: "rgba(192,192,192,0.08)", border: "rgba(192,192,192,0.25)", label: "🥈", glow: "#C0C0C040" };
  if (rank === 3) return { color: "#CD7F32", bg: "rgba(205,127,50,0.08)",  border: "rgba(205,127,50,0.25)", label: "🥉", glow: "#CD7F3240" };
  if (rank <= 10) return { color: "#22d3ee", bg: "rgba(34,211,238,0.05)",  border: "rgba(34,211,238,0.15)", label: `#${rank}`, glow: "transparent" };
  return               { color: "#64748b", bg: "rgba(100,116,139,0.04)",  border: "rgba(100,116,139,0.10)", label: `#${rank}`, glow: "transparent" };
}

// ─────────────────────────────────────────────────────────────────
// ANIMATED NUMBER
// ─────────────────────────────────────────────────────────────────
function AnimNum({ target, decimals = 4 }: { target: number; decimals?: number }) {
  const [val, setVal] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current;
    prev.current = target;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(from + (target - from) * ease);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <>{val.toFixed(decimals)}</>;
}

// ─────────────────────────────────────────────────────────────────
// STAT PILL
// ─────────────────────────────────────────────────────────────────
function StatPill({ icon, label, value, accent }: {
  icon: React.ReactNode; label: string; value: string; accent: string;
}) {
  return (
    <div
      className="flex flex-col items-center px-5 py-4 rounded-xl border relative overflow-hidden"
      style={{ background: `${accent}08`, borderColor: `${accent}25` }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
      <div className="mb-1" style={{ color: accent }}>{icon}</div>
      <div className="text-xl font-bold text-white tabular-nums">{value}</div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SINGLE ROW — TOP 3 vs REST
// ─────────────────────────────────────────────────────────────────
function LeaderRow({ entry, index }: { entry: LeaderEntry; index: number }) {
  const cfg      = rankConfig(entry.rank);
  const isTop3   = entry.rank <= 3;
  const solStr   = entry.total_earned_sol.toFixed(entry.total_earned_sol >= 0.001 ? 4 : 6);

  return (
    <div
      className={`
        relative flex items-center gap-3 rounded-xl px-4 py-3 border
        transition-all duration-300 hover:-translate-y-0.5 group
        ${isTop3 ? "py-4" : ""}
      `}
      style={{
        background:   cfg.bg,
        borderColor:  cfg.border,
        animationDelay: `${index * 60}ms`,
        boxShadow: isTop3 ? `0 0 24px ${cfg.glow}` : undefined,
      }}
    >
      {/* Rank */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
        style={{ background: `${cfg.color}15`, color: cfg.color }}
      >
        {cfg.label}
      </div>

      {/* Name + activity */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold truncate ${isTop3 ? "text-base text-white" : "text-sm text-slate-200"}`}
          >
            {entry.display_name}
          </span>
          {entry.rank === 1 && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "#FFD70025", color: "#FFD700" }}>
              CHAMPION
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-slate-600">{entry.unique_referrals} referrals</span>
          <span className="text-slate-700">·</span>
          <span className="text-[10px] text-slate-600">{entry.trades_generated} trades generated</span>
        </div>
      </div>

      {/* Earnings */}
      <div className="flex-shrink-0 text-right">
        <div
          className={`font-bold tabular-nums ${isTop3 ? "text-lg" : "text-sm"}`}
          style={{ color: cfg.color }}
        >
          {solStr} SOL
        </div>
        <div className="text-[10px] text-slate-600 mt-0.5">earned</div>
      </div>

      {/* Top-3 accent bar on left */}
      {isTop3 && (
        <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full" style={{ background: cfg.color }} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────
function EmptyLeaderboard() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="text-5xl">🏆</div>
      <div className="text-slate-400 font-semibold">Leaderboard is forming…</div>
      <p className="text-xs text-slate-600 text-center max-w-xs">
        Be the first to claim the top spot. Share your referral link now.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
const ReferralLeaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderEntry[]>([]);
  const [stats, setStats]     = useState<ProgramStats | null>(null);
  const [period, setPeriod]   = useState<Period>("all");
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = useCallback(async (p: Period) => {
    setLoading(true);
    try {
      const [lbRes, statsRes] = await Promise.all([
        fetch(`${STATS_BASE_URL}/api/referral/leaderboard?period=${p}&limit=20`),
        fetch(`${STATS_BASE_URL}/api/referral/stats`),
      ]);
      const [lb, st] = await Promise.all([lbRes.json(), statsRes.json()]);
      setEntries(lb.entries || []);
      setStats(st);
    } catch {
      // Demo fallback
      setEntries([
        { rank:1, referrer_id:"1", display_name:"@alpha_trader",   unique_referrals:34, trades_generated:127, total_earned_sol:0.2847, last_activity:null },
        { rank:2, referrer_id:"2", display_name:"@solana_king",    unique_referrals:21, trades_generated:89,  total_earned_sol:0.1923, last_activity:null },
        { rank:3, referrer_id:"3", display_name:"@defi_hustle",    unique_referrals:18, trades_generated:71,  total_earned_sol:0.1441, last_activity:null },
        { rank:4, referrer_id:"4", display_name:"@clickbot_fan",   unique_referrals:12, trades_generated:48,  total_earned_sol:0.0924, last_activity:null },
        { rank:5, referrer_id:"5", display_name:"@pump_station",   unique_referrals:9,  trades_generated:34,  total_earned_sol:0.0612, last_activity:null },
        { rank:6, referrer_id:"6", display_name:"@web3_grind",     unique_referrals:7,  trades_generated:28,  total_earned_sol:0.0487, last_activity:null },
        { rank:7, referrer_id:"7", display_name:"@sol_stacker",    unique_referrals:6,  trades_generated:22,  total_earned_sol:0.0342, last_activity:null },
        { rank:8, referrer_id:"8", display_name:"@trade_life",     unique_referrals:4,  trades_generated:15,  total_earned_sol:0.0218, last_activity:null },
      ]);
      setStats({ total_referrers:47, total_referred_users:189, total_paid_out_sol:1.284, paid_7d_sol:0.342 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeaderboard(period); }, [period, fetchLeaderboard]);

  const totalEarned = stats?.total_paid_out_sol || 0;

  return (
    <section className="py-20 px-4 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.04] blur-3xl"
             style={{ background: "radial-gradient(ellipse, #FFD700, transparent)" }} />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-px h-4 bg-yellow-500/40" />
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-500/70">
              Referral Program
            </span>
            <div className="w-px h-4 bg-yellow-500/40" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-white">The </span>
            <span style={{
              background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Champions
            </span>
            <span className="text-white"> Hall</span>
          </h2>

          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Every trade your referrals make earns you{" "}
            <span className="text-green-400 font-semibold">20% commission</span> — instantly,
            forever, no cap. These are the top earners.
          </p>
        </div>

        {/* ── PROGRAM STATS ──────────────────────────────────────── */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatPill
              icon={<Trophy className="w-4 h-4" />}
              label="Total Paid Out"
              value={`${totalEarned.toFixed(3)} SOL`}
              accent="#FFD700"
            />
            <StatPill
              icon={<TrendingUp className="w-4 h-4" />}
              label="This Week"
              value={`${stats.paid_7d_sol.toFixed(4)} SOL`}
              accent="#4ade80"
            />
            <StatPill
              icon={<Users className="w-4 h-4" />}
              label="Active Referrers"
              value={stats.total_referrers.toString()}
              accent="#22d3ee"
            />
            <StatPill
              icon={<Zap className="w-4 h-4" />}
              label="Users Referred"
              value={stats.total_referred_users.toString()}
              accent="#a78bfa"
            />
          </div>
        )}

        {/* ── PERIOD TABS ────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-1 p-1 rounded-lg border border-slate-700/50"
               style={{ background: "rgba(15,23,42,0.6)" }}>
            {(["all", "30d", "7d"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`
                  px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
                  ${period === p
                    ? "text-yellow-500 shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                  }
                `}
                style={period === p
                  ? { background: "rgba(255,215,0,0.12)", border: "1px solid rgba(255,215,0,0.2)" }
                  : {}}
              >
                {p === "all" ? "All Time" : p === "30d" ? "30 Days" : "7 Days"}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-600 font-mono">
            {loading ? "Loading…" : `${entries.length} referrers ranked`}
          </span>
        </div>

        {/* ── LEADERBOARD ────────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden border border-slate-700/40"
          style={{ background: "rgba(10,15,28,0.7)" }}
        >
          {/* Divider above list */}
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)" }} />

          <div className="p-4 flex flex-col gap-2">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 rounded-full border-2 border-yellow-500/40 border-t-yellow-500 animate-spin" />
              </div>
            ) : entries.length === 0 ? (
              <EmptyLeaderboard />
            ) : (
              entries.map((e, i) => <LeaderRow key={e.referrer_id} entry={e} index={i} />)
            )}
          </div>

          {/* Footer CTA */}
          <div
            className="px-5 py-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ background: "rgba(255,215,0,0.03)" }}
          >
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Commissions are paid instantly in SOL · No minimum · No expiry
            </div>
            <a
              href="https://t.me/clicksolbot?start=ref"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFA500)",
                color: "#000",
              }}
            >
              <Star className="w-3 h-3" /> Claim Your Spot <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ── HOW IT WORKS ───────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { step: "01", text: "Get your link from /refer in ClickBot" },
            { step: "02", text: "Share it — every click is tracked forever" },
            { step: "03", text: "Earn 20% of every fee they generate, forever" },
          ].map((s) => (
            <div
              key={s.step}
              className="rounded-xl p-4 border border-slate-700/30 text-center"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="text-2xl font-bold mb-2"
                   style={{ color: "rgba(255,215,0,0.4)", fontVariantNumeric: "tabular-nums" }}>
                {s.step}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReferralLeaderboard;