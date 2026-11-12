import type { NextConfig } from "next";

// Old Web3-terminal URLs keep their search ranking by pointing at the closest new page (permanent 308).
// The old site is archived: branch archive/web3-terminal-2026-11 and _archive/web3-terminal-2026-11/.
const oldPosts: Record<string, string> = {
  "how-to-avoid-liquidation-futures": "how-we-cut-a-1000-zoom-bill-to-under-200",
  "whale-tracking-guide-2025": "building-me-dashboards-donors-trust",
  "best-defi-trading-tools": "make-vs-zapier-vs-n8n",
  "rsi-signals-crypto-trading": "speed-to-lead-85-percent-faster",
  "solana-meme-coins-intelligence": "ai-review-with-a-human-at-every-decision",
  "analyzed-1000-solana-launches": "what-3386-women-entrepreneurs-taught-us",
  "how-to-read-crypto-whales": "reading-your-crm-lifecycle-stages",
  "top-defi-mistakes-beginners": "ten-automation-mistakes-beginners-make",
  "futures-mistake-cost-47k": "the-automation-mistake-that-pays-twice",
  "autonomous-ai-agents-defi-trading": "the-workforce-that-never-sleeps",
  "pulse-agentic-wallet-os-solana": "inside-quantumhire-eight-agents",
};

// Case studies that were renamed when SPPG became its own client (2026-11-12).
const oldCases: Record<string, string> = {
  "endgame-ai-admissions": "sppg-admissions-ai",
  "endgame-platforms": "sppg-peer-review",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: __dirname },
  async redirects() {
    return [
      ...Object.entries(oldPosts).map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
      ...Object.entries(oldCases).map(([from, to]) => ({ source: `/work/${from}`, destination: `/work/${to}`, permanent: true })),
      { source: "/products", destination: "/work", permanent: true },
      { source: "/results", destination: "/work", permanent: true },
      { source: "/roadmap", destination: "/work", permanent: true },
      { source: "/future", destination: "/standard", permanent: true },
      { source: "/docs", destination: "/automation", permanent: true },
      { source: "/faq", destination: "/automation#faq", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      { source: "/risk-disclosure", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
