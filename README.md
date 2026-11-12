# clickshift.io

ClickShift, the solutions factory: **we build what still works in 2045.**

The public site has:
- **/work:** case studies;
- **/automation:** Automation as a Service;
- **/templates:** CRM templates;
- **/pricing**, **/standard** (the 2045 Standard), **/blog** (the Journal), **/about** and **/contact**.

**/admin** is where enquiries, email, visitor analytics, articles and subscribers are managed.

| Doc | For |
|---|---|
| `CLAUDE.md` | Rules, stack and conventions (start here) |
| `HANDOFF.md` | Current state and what's next |
| `BRAND.md` | Brand guide: logo, colour, type, voice |
| `docs/ADMIN.md` | The admin dashboard and its settings |
| `docs/DEPLOY.md` | Running it on our DigitalOcean server |

```bash
npm ci
npm run dev          # http://localhost:3000 (works without a database)
npm run build && npm run start:prod   # production, on 127.0.0.1:3100
```

The old Web3 terminal is archived: branch `archive/web3-terminal-2026-11`, plus `_archive/`.
