# ClickShift, the Web3 AI terminal: archive (to 12 November 2026)

This folder holds the clickshift.io website as it stood before the 2045 rebrand. Use it to look things up. It is
not built or deployed: `tsconfig.json` and `eslint.config.mjs` exclude `_archive/`.

## Three ways to get the old site back

- **Files:** `src/` and `public/` in this folder are a copy of the whole old site.
- **Git branch:** `archive/web3-terminal-2026-11` points at the last commit of the old site (`828a231`).
- **Git tag:** `archive-web3-terminal-2026-11-12` marks the same commit.
- **A live link:** push the branch and Vercel gives it a preview URL you can bookmark:
  `git push origin archive/web3-terminal-2026-11`

## What ClickShift was

**Positioning:** "The Intelligent AI Terminal for DeFi Agents and Traders", described as a Bloomberg Terminal for DeFi.
ShiftChip technology let AI agents go into the market, and people used the same intelligence through the interface.

**Products:**

| Product | What it did | Status then | URL |
|---|---|---|---|
| ClickShift Alpha | Spot-trading intelligence for Solana tokens: whale tracking, exit prediction, RSI signals, rug-pull checks. Entered in the Nosana x ElizaOS Builders Challenge. | Live | alpha.clickshift.io |
| ClickShift Leverage | Futures calculator: MACD+OBV signals and liquidation protection | Live | leverage.clickshift.io |
| Pulse | Agentic wallet OS on Solana: six agents (Orchestrator, DCA, Trailing Stop, Scout, Risk Manager, Off-Ramp) sharing one vault | Live then; on 12 Nov 2026 the URL returned a Cloudflare 526 | pulse.clickshift.io |
| Launch Detector Pro | Early token discovery with legitimacy scoring | Beta, via Telegram | t.me/ClickShiftAlerts |
| ClickBot Assistant | AI trading companion in Telegram (later became Kobocent) | In development | t.me/clicksolbot |
| ShiftChip / $SHIFT | Agent "chip" and the usage-reward point | Concept and roadmap | /future, /roadmap |
| Solana first PoC | Early proof of concept | Live | solanafirstpoc.clickshift.io |

**Old pricing:** Free; Pro $79 a month ($63 billed yearly); Elite $199 ($159); Enterprise custom. API plans were $49, $149
and custom.

**Pages:** home, products, pricing, about, blog (11 posts), docs, FAQ, roadmap, future (ShiftChip), results, careers,
privacy, terms, risk disclosure.

**Old blog posts:** these slugs now redirect to the new articles (see `next.config.ts`).
how-to-avoid-liquidation-futures, whale-tracking-guide-2025, best-defi-trading-tools, rsi-signals-crypto-trading,
solana-meme-coins-intelligence, analyzed-1000-solana-launches, how-to-read-crypto-whales, top-defi-mistakes-beginners,
futures-mistake-cost-47k, autonomous-ai-agents-defi-trading, pulse-agentic-wallet-os-solana.

## Issues found in the old code (fixed by the rebrand)

- **Investor key in source:** `src/app/roadmap/page.tsx` hard-coded the investor link with its key
  (`api.clickshift.io/api/investor?key=…`). The key is in git history and in this archive. **Rotate it.**
- **Unbacked rating:** `layout.tsx` declared an aggregateRating of 4.9 from 525 ratings in schema.org data. Nothing
  supported it, and Google can penalise unbacked ratings.
- **Invented authors:** some blog posts were credited to people who don't exist ("Sarah Chen", "Marcus Rodriguez") and
  cited performance figures that couldn't be checked.
- **Mis-named Brevo key:** the Brevo key used a `NEXT_PUBLIC_` name. It was only read on the server, but that name lets it
  reach the browser bundle if any client file ever reads it.
