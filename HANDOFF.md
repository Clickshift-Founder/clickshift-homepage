# Handoff: ClickShift website

## State on 2026-11-12

**Branch `rebrand/factory-2045`.** Commit 124c81f (the rebrand) is pushed. Everything below is uncommitted on top of it.

### Built in this session
- **Work:**
  - SPPG is now a client, with six cases: admissions AI (with the Make screenshot), one-click admission letters (with the Make screenshot), interview panel scheduler, 360° peer review, SPLN network, learner operations and digital library.
  - SolanaFirst was added. Pulse now links to pulse.clickshift.io.
  - Apex Armor was rewritten: mobile RV repair, the platform plus the automation, and CEO alerts for budgets of $2,000 or more.
  - DC Connect got the full feature list and its link. Edu-Data now links to the prototype.
  - The Zoom archive gained the video player.
  - Kobocent, QuantumHire, Alpha, Leverage and Pulse are now "products we built", not "ours".
  - Old case URLs redirect (`endgame-ai-admissions`, `endgame-platforms`).
- **About:** rewritten around the studio's disciplines, with the founder as leadership.
- **Motion:** the flight to 2045, a scroll-driven aircraft with five checkpoints on the home page, and a small plane in the navbar that tracks progress through the page.
- **Journal:**
  - Corrections: Apex is an RV repair business, not a manufacturer; an invented "$40" example was removed; SPPG details were added; "our own products" was reworded; the Medium link was added to the essay.
  - Two DIY articles: personalised PDF letters from a Google Sheet, and a big-lead phone alert.
  - Articles now support code blocks.
- **Admin:** dashboard, enquiries, reply composer with templates, visitor analytics, journal editor, email, subscribers and settings. Brevo was removed. Resend sends an acknowledgement to every brief. Docs: `docs/ADMIN.md`.
- **Hosting:** stays on Vercel, with Neon Postgres via Vercel's integration (founder, 2026-11-12, replacing the earlier DigitalOcean plan). No SQL to run: the tables create themselves. Steps: `docs/DEPLOY.md`.
- **Brand:**
  - `BRAND.md` (palette reviewed and kept; `signal-deep` #4E6B00 added for light layouts);
  - assets in `brand/assets/` and `Desktop/ClickShift Brand/`;
  - X and LinkedIn banners, a profile picture and logo files.
- **Docs:** CLAUDE.md and this file.

### Verified
- `tsc`, ESLint and `next build` are clean (61 routes).
- End-to-end against a throwaway Postgres: 30 of 30 checks pass.
- A strict 390 px sweep found no page wider than the phone, across 17 public and 10 admin pages.

### Added later on 2026-11-12
- **Admin sign-in:** a show/hide button on the password field.
- **Group email** (`/admin/email/group`): send one message to subscribers, people who sent a brief, or a hand-picked list, personalised with `{firstName}`, with a test send. Every group email has a signed unsubscribe link and one-click unsubscribe headers. New table `cs_campaigns` (created automatically).
- **Unsubscribe page** at /unsubscribe. The privacy page already promised an unsubscribe link in every email; this makes it true.
- **Brand strip logos:** SPPG, EndGame, Kobocent, QuantumHire, BFG, Digital Brothers, Hibreed and Dominion City now show their logos (`public/brands/`, prepared by `brand/logos.mjs`). World Bank, UN Women, FCDO and DO Take Action logos were added on 2026-11-13 by founder decision (five years of programme work).
- **Newsletter agent:** planned as a future build (docs/ADMIN.md). Nothing needed in the schema.
- Verified: tsc, ESLint, build, and 27 end-to-end checks of group email and unsubscribe (Resend mocked), plus phone-width screenshots.

## Open items: founder
1. Commit and push this work, then merge to `main`.
2. Set up Vercel (`docs/DEPLOY.md`): add Neon from Storage, add the admin and email variables, delete the `NEXT_PUBLIC_*` Brevo/stats ones, then deploy and check /admin → Settings.
3. Resend: verify clickshift.io, then set `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO` and `ADMIN_NOTIFY_EMAIL`.
4. Confirm the inbox hello@clickshift.io exists (it's the From address and is shown on the site).
5. **Rotate the old Brevo API key.** It was in a `NEXT_PUBLIC_` variable, so it shipped in the old site's JavaScript. Delete it in Brevo, and remove the `NEXT_PUBLIC_BREVO_*` lines from Vercel and from the laptop's `.env.local`.
6. Rotate the investor key that sat in the old roadmap page's source (it is in git history).
7. pulse.clickshift.io returns Cloudflare 526 (invalid origin certificate) from the DigitalOcean server. A Cloudflare Origin Certificate for `*.clickshift.io` on that server's nginx can fix it.
8. mobilervrepairnow.com refused connections on 2026-11-12. Check it's up, since the case study links to it. Confirm the client name "Apex Armor".
9. Prices, the 40% early-reservation discount and the bundle price were proposed, not decided.
10. Real template screenshots, to replace the drawn previews.

## Next focus (founder)
The Kobocent blog: 10 starter articles, posting from Kobocent's /ops, and getting kobocent.com indexed on Google.
