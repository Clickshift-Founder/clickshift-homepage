'use client';

import { useState, useEffect, useRef } from 'react';

// ── Types ─────────────────────────────────────────────────────────
interface TraderEntry {
  rank: number;
  display_name: string;
  volume_sol: number;
  trade_count: number;
  shift_points: number;
  tier: 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze';
  is_early_adopter: boolean;
  referrals: number;
}

type Period = 'quarter' | '30d' | '7d';

// ── Constants ─────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_STATS_API_URL || 'https://api.clickshift.io';

const TIER_ICON: Record<string, string> = {
  diamond: '💎',
  platinum: '⬡',
  gold: '◈',
  silver: '◇',
  bronze: '○',
};

const TIER_COLOR: Record<string, string> = {
  diamond: '#C9A84C',
  platinum: '#E8C56A',
  gold:     '#FFD700',
  silver:   '#A8B8C8',
  bronze:   '#CD9B6B',
};

const RANK_LABEL = ['01', '02', '03'];
const RANK_COLOR = ['#C9A84C', '#A8B8C8', '#CD9B6B'];

const PERIOD_LABELS: Record<Period, string> = {
  quarter: 'This Quarter',
  '30d':   '30 Days',
  '7d':    '7 Days',
};

const ALLOCATION: Record<string, string> = {
  diamond:  '500,000',
  platinum: '200,000',
  gold:     '75,000',
  silver:   '25,000',
  bronze:   '5,000',
};

// ── Utility ───────────────────────────────────────────────────────
function fmtSOL(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  if (n >= 1)    return n.toFixed(2);
  return n.toFixed(4);
}

function fmtPts(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1000)      return (n / 1000).toFixed(1) + 'K';
  return Math.round(n).toLocaleString();
}

// ── Main Component ────────────────────────────────────────────────
export default function ShiftSection() {
  const [period, setPeriod]     = useState<Period>('quarter');
  const [entries, setEntries]   = useState<TraderEntry[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [visible, setVisible]   = useState(false);
  const sectionRef              = useRef<HTMLElement>(null);

  // Intersection observer for scroll-reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Fetch leaderboard
  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`${API_BASE}/api/traders/leaderboard?period=${period}&limit=10`)
      .then(r => r.json())
      .then(d => { setEntries(d.entries || []); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [period]);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 48px',
        background: 'linear-gradient(180deg, #050507 0%, #08080C 50%, #050507 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.07), transparent)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          marginBottom: '80px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'monospace', fontSize: '11px',
              color: 'rgba(201,168,76,0.8)', letterSpacing: '0.15em',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#C9A84C' }} />
              Ecosystem Token · Q3 2026 TGE
            </div>

            <h2 style={{
              fontSize: 'clamp(42px, 5vw, 72px)',
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#F5F4F0',
              marginBottom: '24px',
            }}>
              Own a Piece of<br />
              <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>ClickShift.</em>
            </h2>

            <p style={{
              fontSize: '16px',
              color: 'rgba(245,244,240,0.45)',
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: '32px',
              maxWidth: '440px',
            }}>
              $SHIFT is the utility and governance token of the ClickShift ecosystem.
              Every trade you make today earns SHIFT Points — redeemable for tokens at
              launch. Early adopters receive a <strong style={{ color: '#C9A84C', fontWeight: 600 }}>3× multiplier</strong> on all points. Forever.
            </p>

            {/* Key stats row */}
            <div style={{
              display: 'flex', gap: '32px', marginBottom: '36px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(201,168,76,0.12)',
            }}>
              {[
                { val: '1B',   label: 'Total Supply'         },
                { val: '40%',  label: 'To Community Traders' },
                { val: '3×',   label: 'Early Adopter Bonus'  },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '32px', fontWeight: 700,
                    color: '#C9A84C', lineHeight: 1,
                    marginBottom: '4px',
                  }}>{val}</div>
                  <div style={{
                    fontFamily: 'monospace', fontSize: '10px',
                    color: 'rgba(245,244,240,0.3)',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>{label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://api.clickshift.io/shift/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '6px',
                  background: '#C9A84C', color: '#000',
                  fontFamily: 'monospace', fontSize: '13px', fontWeight: 700,
                  textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#E8C56A')}
                onMouseOut={e  => (e.currentTarget.style.background = '#C9A84C')}
              >
                📖 Read Whitepaper
              </a>
              <a
                href="https://t.me/clicksolbot"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '6px',
                  border: '1px solid rgba(201,168,76,0.25)',
                  color: 'rgba(245,244,240,0.7)',
                  fontFamily: 'monospace', fontSize: '13px', fontWeight: 500,
                  textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'all 0.2s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                  e.currentTarget.style.color = '#C9A84C';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
                  e.currentTarget.style.color = 'rgba(245,244,240,0.7)';
                }}
              >
                ⚡ Start Earning Points
              </a>
            </div>
          </div>

          {/* Allocation breakdown card */}
          <div style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '20px',
            padding: '32px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            <div style={{
              fontFamily: 'monospace', fontSize: '10px',
              color: 'rgba(201,168,76,0.6)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>
              Token Distribution
            </div>

            {/* Bar */}
            <div style={{
              display: 'flex', height: '8px', borderRadius: '4px',
              overflow: 'hidden', gap: '2px', marginBottom: '20px',
            }}>
              {[
                { w: '40%', c: '#C9A84C' },
                { w: '20%', c: '#4A9EFF' },
                { w: '15%', c: '#A78BFA' },
                { w: '10%', c: '#FF6B6B' },
                { w: '10%', c: '#9B59B6' },
                { w: '5%',  c: '#FF9F43' },
              ].map(({ w, c }, i) => (
                <div key={i} style={{ width: w, background: c, borderRadius: '2px' }} />
              ))}
            </div>

            {[
              { pct: '40%', label: 'Community & Traders', color: '#C9A84C' },
              { pct: '20%', label: 'Ecosystem & Grants',  color: '#4A9EFF' },
              { pct: '15%', label: 'Core Team (vested)',   color: '#A78BFA' },
              { pct: '10%', label: 'Liquidity Provision',  color: '#FF6B6B' },
              { pct: '10%', label: 'Strategic Partners',   color: '#9B59B6' },
              { pct: '5%',  label: 'Treasury Reserve',     color: '#FF9F43' },
            ].map(({ pct, label, color }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '9px 0',
                borderBottom: '1px solid rgba(245,244,240,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: color, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '13px', color: 'rgba(245,244,240,0.55)' }}>{label}</span>
                </div>
                <span style={{
                  fontFamily: 'monospace', fontSize: '13px',
                  fontWeight: 600, color,
                }}>{pct}</span>
              </div>
            ))}

            <div style={{
              marginTop: '20px', padding: '12px',
              background: 'rgba(201,168,76,0.08)',
              borderRadius: '8px',
              fontFamily: 'monospace', fontSize: '11px',
              color: 'rgba(201,168,76,0.7)', lineHeight: 1.6,
            }}>
              ⚡ Trading NOW = Early Adopter status<br />
              3× multiplier locked in forever at TGE
            </div>
          </div>
        </div>

        {/* ── Trader Leaderboard ─────────────────────────────────── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '24px', flexWrap: 'wrap', gap: '16px',
          }}>
            <div>
              <div style={{
                fontFamily: 'monospace', fontSize: '10px',
                color: 'rgba(201,168,76,0.6)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '6px',
              }}>
                Live Rankings
              </div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '28px', fontWeight: 700,
                color: '#F5F4F0', letterSpacing: '-0.01em',
              }}>
                SHIFT Points Leaderboard
              </h3>
            </div>

            {/* Period tabs */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['quarter', '30d', '7d'] as Period[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: '7px 16px', borderRadius: '6px',
                    fontFamily: 'monospace', fontSize: '12px', fontWeight: 600,
                    border: `1px solid ${period === p ? 'rgba(201,168,76,0.4)' : 'rgba(245,244,240,0.08)'}`,
                    background: period === p ? 'rgba(201,168,76,0.12)' : 'transparent',
                    color: period === p ? '#C9A84C' : 'rgba(245,244,240,0.35)',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {PERIOD_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{
            border: '1px solid rgba(201,168,76,0.12)',
            borderRadius: '16px', overflow: 'hidden',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr 120px 100px 120px',
              padding: '12px 20px',
              background: 'rgba(201,168,76,0.05)',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
              fontFamily: 'monospace', fontSize: '10px',
              color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span>#</span>
              <span>Trader</span>
              <span style={{ textAlign: 'right' }}>Volume</span>
              <span style={{ textAlign: 'right' }}>Trades</span>
              <span style={{ textAlign: 'right' }}>SHIFT Pts</span>
            </div>

            {/* Loading state */}
            {loading && (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    height: '52px', borderRadius: '8px',
                    background: 'rgba(245,244,240,0.03)',
                    marginBottom: '2px',
                    animation: 'pulse 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.1}s`,
                  }} />
                ))}
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div style={{
                padding: '48px', textAlign: 'center',
                fontFamily: 'monospace', fontSize: '13px',
                color: 'rgba(245,244,240,0.2)',
              }}>
                Could not load rankings — try again shortly
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && entries.length === 0 && (
              <div style={{
                padding: '48px', textAlign: 'center',
                fontFamily: 'monospace', fontSize: '13px',
                color: 'rgba(245,244,240,0.2)',
              }}>
                No trading activity this period yet — be first 🚀
              </div>
            )}

            {/* Entries */}
            {!loading && !error && entries.map((e, i) => {
              const isTop  = e.rank <= 3;
              const color  = isTop ? RANK_COLOR[e.rank - 1] : 'rgba(245,244,240,0.4)';
              const tc     = TIER_COLOR[e.tier] || '#888';

              return (
                <div
                  key={e.rank}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr 120px 100px 120px',
                    padding: '14px 20px',
                    borderBottom: i < entries.length - 1
                      ? '1px solid rgba(245,244,240,0.04)' : 'none',
                    background: isTop
                      ? `rgba(${e.rank === 1 ? '201,168,76' : e.rank === 2 ? '168,184,200' : '205,155,107'},0.04)`
                      : 'transparent',
                    transition: 'background 0.2s',
                    alignItems: 'center',
                  }}
                  onMouseOver={ev => (ev.currentTarget.style.background = 'rgba(201,168,76,0.04)')}
                  onMouseOut={ev  => (ev.currentTarget.style.background = isTop
                    ? `rgba(${e.rank===1?'201,168,76':e.rank===2?'168,184,200':'205,155,107'},0.04)`
                    : 'transparent'
                  )}
                >
                  {/* Rank */}
                  <div style={{
                    fontFamily: 'monospace', fontSize: isTop ? '16px' : '13px',
                    fontWeight: 700, color,
                  }}>
                    {isTop ? RANK_LABEL[e.rank - 1] : e.rank}
                  </div>

                  {/* Name + badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: `${tc}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', flexShrink: 0,
                    }}>
                      {TIER_ICON[e.tier] || '○'}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontSize: '14px', fontWeight: 600, color: '#F5F4F0',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {e.display_name}
                      </div>
                      <div style={{
                        fontSize: '11px', color: 'rgba(245,244,240,0.3)',
                        fontFamily: 'monospace', display: 'flex', gap: '8px',
                      }}>
                        <span style={{ color: tc }}>{e.tier}</span>
                        {e.is_early_adopter && (
                          <span style={{ color: '#C9A84C' }}>⚡ 3× early adopter</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Volume */}
                  <div style={{
                    textAlign: 'right', fontFamily: 'monospace',
                    fontSize: '13px', fontWeight: 600, color: '#F5F4F0',
                  }}>
                    {fmtSOL(e.volume_sol)} SOL
                  </div>

                  {/* Trades */}
                  <div style={{
                    textAlign: 'right', fontFamily: 'monospace',
                    fontSize: '13px', color: 'rgba(245,244,240,0.5)',
                  }}>
                    {e.trade_count}
                  </div>

                  {/* SHIFT Points */}
                  <div style={{
                    textAlign: 'right', fontFamily: 'monospace',
                    fontSize: '13px', fontWeight: 700,
                    color: e.rank <= 3 ? color : 'rgba(201,168,76,0.7)',
                  }}>
                    {fmtPts(e.shift_points)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estimated allocation note */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px', marginTop: '16px',
          }}>
            {[
              { tier: 'gold',    label: '🥇 Gold tier',    alloc: '75,000 SHIFT' },
              { tier: 'silver',  label: '🥈 Silver tier',  alloc: '25,000 SHIFT' },
              { tier: 'bronze',  label: '🥉 Bronze tier',  alloc: '5,000 SHIFT'  },
            ].map(({ tier, label, alloc }) => (
              <div key={tier} style={{
                background: 'rgba(245,244,240,0.02)',
                border: '1px solid rgba(245,244,240,0.06)',
                borderRadius: '10px', padding: '14px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: 'rgba(245,244,240,0.35)', marginBottom: '4px' }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: 'monospace', fontSize: '13px',
                  fontWeight: 700, color: TIER_COLOR[tier],
                }}>
                  {alloc}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(245,244,240,0.2)', marginTop: '2px' }}>
                  est. Q2 allocation
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────── */}
        <div style={{
          marginTop: '64px',
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(74,158,255,0.04))',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '20px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '32px',
          flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
        }}>
          <div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '24px', fontWeight: 700,
              color: '#F5F4F0', marginBottom: '8px',
            }}>
              The window is open. For now.
            </h3>
            <p style={{
              fontSize: '14px', color: 'rgba(245,244,240,0.4)',
              lineHeight: 1.7, maxWidth: '520px',
            }}>
              Every trade on ClickBot today earns $SHIFT Points.
              When the Token Generation Event launches in Q3 2026,
              early adopters convert their points to tokens at <strong style={{ color: '#C9A84C' }}>3× the rate</strong> of
              everyone else. This multiplier closes at TGE — permanently.
            </p>
            <div style={{
              display: 'flex', gap: '24px', marginTop: '16px',
              fontFamily: 'monospace', fontSize: '12px',
              color: 'rgba(245,244,240,0.35)',
            }}>
              <span>✅ No investment required</span>
              <span>✅ Just trade on ClickBot</span>
              <span>✅ Points tracked automatically</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
            <a
              href="https://t.me/clicksolbot"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #C9A84C, #E8C56A)',
                color: '#000', fontFamily: 'monospace',
                fontSize: '14px', fontWeight: 700,
                textDecoration: 'none', letterSpacing: '0.04em',
                whiteSpace: 'nowrap', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(201,168,76,0.35)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ⚡ Start Earning $SHIFT
            </a>
            <a
              href="https://api.clickshift.io/shift/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: '6px', padding: '10px 20px', borderRadius: '8px',
                border: '1px solid rgba(201,168,76,0.2)',
                color: 'rgba(201,168,76,0.7)', fontFamily: 'monospace',
                fontSize: '12px', textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
                e.currentTarget.style.color = '#C9A84C';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)';
                e.currentTarget.style.color = 'rgba(201,168,76,0.7)';
              }}
            >
              📖 Read the Whitepaper
            </a>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.7; }
        }
        @media (max-width: 900px) {
          .shift-header-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .shift-table-grid  { grid-template-columns: 40px 1fr 90px 70px !important; }
          .shift-table-pts   { display: none !important; }
          .shift-alloc-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}