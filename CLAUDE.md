# ClickShift website (clickshift.io): project context

> Read at the start of a session, in this order:
> 1. **This file**: what the site is, the rules and why they exist
> 2. **`HANDOFF.md`**: current state, what is deployed, what is next. **Update it at the end of every session.**
> 3. **`BRAND.md`**: the brand guide. Read it before touching anything visual.
> 4. **`docs/ADMIN.md`** (admin dashboard) and **`docs/DEPLOY.md`** (Vercel + Neon setup)

## What this is

**ClickShift is "the solutions factory: we build what still works in 2045."** It is a studio that builds products,
platforms, automations and AI agents for development programmes, schools, companies and product teams.

- **Lines of business:** build (case studies at /work), automate (Automation as a Service, /automation, priced), equip (CRM templates, /templates, all "coming soon").
- **The 2045 Standard:** five pillars (learn, secure, trace, sustain, care) from the founder's 2025 Medium essay. Every build is held to them (/standard).
- **The old Web3 terminal is archived** on branch `archive/web3-terminal-2026-11`, tag `archive-web3-terminal-2026-11-12`, and folder `_archive/web3-terminal-2026-11/` (see its ARCHIVE.md). Old blog URLs 308-redirect to new posts (`next.config.ts`).
- **Owner:** the founder, a solo founder in Abuja. ClickShift's legal form is a Nigerian business name (CLICKSHIFT TENSOR INTELLIGENCE); Clickshift Global Ltd is reserved at CAC.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4 (`@theme` tokens in `src/app/globals.css`).
- **Content is data in `src/lib`:**

  | File | Holds |
  |---|---|
  | `work.ts` | Case studies (CASES, BRANDS, PROOF) |
  | `services.ts` | Services, prices and FAQ |
  | `templates.ts` | CRM templates |
  | `posts.ts` | Built-in Journal articles |
  | `pillars.ts` | The 2045 Standard |
  | `site.ts` | Identity, navigation, brand colours |

- **Admin and data:**
  - `src/app/admin/**` and `src/lib/server/**` hold the admin pages and server code;
  - Postgres via the `postgres` package (`src/lib/server/db.ts`);
  - email via Resend (`src/lib/server/email.ts`);
  - first-party analytics: `src/components/Tracker.tsx` sends to `src/app/api/collect/route.ts`.
- **Hosting (founder, 2026-11-12):** Vercel, with the database in **Neon Postgres** added through Vercel's Neon integration (it injects `DATABASE_URL`, the pooled address). It deliberately does **not** run on the DigitalOcean server with Kobocent and QuantumHire: a public marketing site stays off the money server. The steps are in `docs/DEPLOY.md`.

### Building locally (Windows laptop)

There is no system Node. A portable Node lives in the session scratchpad. Use `node node_modules/next/dist/bin/next build`,
`node node_modules/eslint/bin/eslint.js src` and `node node_modules/typescript/bin/tsc --noEmit -p .`. The site builds
and runs without `DATABASE_URL`: the forms then fall back to email, and the Journal shows the built-in articles.

## Rules: these matter

### Truth in every claim
- **Never add a number without a source.** Every figure comes from the founder's CVs, a press link in `sources`, or the product's own data. If it can't be sourced, leave it out; never estimate.
- **State our role honestly in each case.** The donor programmes (World Bank SWEEP, UN Women WEEAP, Chevening/FCDO SWEEAP) were delivered **with DO Take Action / EndGame as implementation partner**. Never write that the World Bank or the FCDO hired ClickShift directly. Chevening/FCDO is credited through the Chevening Alumni Association of Nigeria.
- Press pages describe the programmes but don't name ClickShift. Never say they do.
- **The about page describes disciplines, not invented people.** It shows the studio's roles (engineers, designers, analysts and so on). Never add named team members, headcounts or stock photos of "the team" unless the founder supplies real people.
- Illustrative UI (the hero "production board" feed) must stay labelled as illustrative.
- The SPPG graduate numbers differ between thesppg.org and thespln.org, so we quote none of them.
- **Logos in the brand strip** (`BRANDS` in `work.ts`, files from `brand/logos.mjs`). World Bank, UN Women and FCDO logos are shown by founder decision (2026-11-13), on five years of programme work delivered with DO Take Action / EndGame; keep the case studies' role statements intact.
- **Every group email or newsletter carries an unsubscribe link** and skips unsubscribed addresses (`sendCampaign()` does both). Never send group mail another way.

### Products we built: positioning (founder, 2026-11-12)
- Kobocent, QuantumHire, Pulse, Alpha, Leverage and SolanaFirst are listed as **products ClickShift built and delivered** (line "Products & platforms"). **Never write that ClickShift owns, runs or operates them**: no "our products", "our ventures", "in-house".
- **Kobocent wording rules still apply here:**
  - never "non-custodial"; use "Your keys are encrypted, and only you can trigger a transaction";
  - "Multichain, powered by stablecoins", never "built on Solana";
  - never "bank-grade";
  - never publish bridge fee rates.
- **The rule runs one way only:** clickshift.io may list Kobocent; Kobocent's own surfaces never mention ClickShift.

### Admin and data
- Every admin page and server action starts with `requireAdmin()`. No admin route without it.
- Secrets are server-only env vars. **Never give one a `NEXT_PUBLIC_` name** (the old site leaked a Brevo key that way). Never log a secret or any part of one. Settings shows only whether a value is set.
- Time columns are **BIGINT epoch ms**; tables are prefixed `cs_` and created in `SCHEMA` in `db.ts`. A new table goes there.
- Use one connection pool per process (`globalThis.__csSql`), because Next gives each route bundle its own module state. Never open a second pool.
- Analytics stores no IP addresses and no cookies, respects DNT/GPC, and never tracks `/admin` or `/api`. Keep the privacy page (`src/app/privacy/page.tsx`) true whenever data collection changes.
- A lead with a budget of $2,000 or more is "priority" (`src/lib/enquiry.ts`).

### Hosting (Vercel + Neon)
- Schema changes go in `SCHEMA` in `db.ts` (`CREATE … IF NOT EXISTS`), never in a hand-run query, so a fresh Neon database builds itself.
- Use `DATABASE_URL` (the pooled `-pooler` address); `prepare: false` must stay for the pooler.
- Never move this site onto the Kobocent server without the founder deciding it again; the separation is deliberate.

### Design
- **Mobile-first is the requirement.** Design at 390 px first, use 44 px tap targets, respect safe areas, and never hide anything behind hover.
- **Grid layouts:** every grid needs `grid-cols-1` plus `[&>*]:min-w-0` on its children (or `min-w-0` on each), or wide content such as chip rows or code blocks pushes the page past the phone's width. `overflow-x: hidden` on the body hides that bug instead of fixing it.
- Lime (`signal`) never goes on light backgrounds. Use `signal-deep` there (see BRAND.md).
- Reveal animations hide content only when JS has run (`.js .reveal`), and reduced motion shows everything.

## Working style
- One change at a time. Commit or push only when the founder asks, and work on a branch.
- Give paste-ready commands (PowerShell on the laptop, bash on the server).
- End every report with the ordered list of what is left.
- After a build: update `HANDOFF.md`, and this file if a rule changed.
- Verify before asserting: run the build, lint and the end-to-end checks.

## Testing recipe (what was used on 2026-11-12)
- **Database:** a throwaway Postgres using `@electric-sql/pglite` with `pglite-socket` on 127.0.0.1:5433. Run the site with `DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5433/postgres DATABASE_POOL_MAX=1` plus test `ADMIN_*` values, then `next start -p 3456`.
- **Checks:**
  - fetch-based checks for the API, the sign-in form (its server action, without JS), every admin page and publishing an article;
  - a puppeteer-core sweep at 390 px that lifts `overflow-x: hidden` and fails any page wider than the screen.
