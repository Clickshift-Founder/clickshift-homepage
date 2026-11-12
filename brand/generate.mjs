// Renders the ClickShift brand assets in brand/assets (logos, social banners) with headless Chrome.
// Usage: npm i -D puppeteer-core && node brand/generate.mjs brand/assets   (needs Google Chrome installed)
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const C = { ink: "#0B0C10", ink2: "#15171D", paper: "#F3F0E8", signal: "#D4FF3A", cobalt: "#2E44FF", stone: "#8C9099", line: "#2A2E38" };
const TEETH = "M9 37 L18 29 L18 37 Z M18 37 L27 21 L27 37 Z M27 37 L36 13 L36 37 Z";
const PLANE = "M16 0 C16 -1.6 14 -2.3 12 -2.3 L3 -2.3 L-5 -12.5 L-8.6 -12.5 L-3 -2.3 L-11 -2.3 L-14.6 -7 L-17 -7 L-15.6 -1.4 L-15.6 1.4 L-17 7 L-14.6 7 L-11 2.3 L-3 2.3 L-8.6 12.5 L-5 12.5 L3 2.3 L12 2.3 C14 2.3 16 1.6 16 0 Z";

const mark = (tile, teeth, rounded = true) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">${tile ? `<rect width="48" height="48" rx="${rounded ? 12 : 0}" fill="${tile}"/>` : ""}<path d="${TEETH}" fill="${teeth}"/><rect x="37" y="6" width="5.5" height="5.5" rx="1.2" fill="${teeth}"/></svg>`;

// 1. Vector marks
const svgs = {
  "clickshift-mark-lime-on-ink.svg": mark(C.ink, C.signal),
  "clickshift-mark-ink-on-lime.svg": mark(C.signal, C.ink),
  "clickshift-mark-ink.svg": mark(null, C.ink),
  "clickshift-mark-white.svg": mark(null, "#FFFFFF"),
};
for (const [f, s] of Object.entries(svgs)) fs.writeFileSync(path.join(OUT, f), s);

const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=block" rel="stylesheet">`;
const base = `*{margin:0;padding:0;box-sizing:border-box} body{font-family:'Space Grotesk',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.mono{font-family:'JetBrains Mono',ui-monospace,monospace}
.grid{background-image:linear-gradient(to right,rgb(255 255 255/.05) 1px,transparent 1px),linear-gradient(to bottom,rgb(255 255 255/.05) 1px,transparent 1px);background-size:56px 56px}`;

const wordmark = (size, color) =>
  `<span style="font-weight:600;letter-spacing:-0.035em;font-size:${size}px;color:${color};line-height:1">ClickShift</span>`;
const lockup = (h, tile, teeth, text) =>
  `<div style="display:flex;align-items:center;gap:${h * 0.3}px">${mark(tile, teeth).replace('width="48" height="48"', `width="${h}" height="${h}"`)}${wordmark(h * 0.78, text)}</div>`;

// flight path for banners: from bottom-left factory up to 2045
const flight = (w, h, x0, y0, x1, y1, label = true) => {
  const cx1 = x0 + (x1 - x0) * 0.35, cy1 = y0, cx2 = x0 + (x1 - x0) * 0.6, cy2 = y1 + (y0 - y1) * 0.15;
  const d = `M${x0} ${y0} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x1} ${y1}`;
  const ang = (Math.atan2(y1 - cy2, x1 - cx2) * 180) / Math.PI;
  return `<svg width="${w}" height="${h}" style="position:absolute;inset:0" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="${C.signal}" stop-opacity=".05"/><stop offset="1" stop-color="${C.signal}"/></linearGradient></defs>
    <path d="${d}" fill="none" stroke="rgb(255 255 255/.18)" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="url(#t)" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="78 100"/>
    <g transform="translate(${x1} ${y1}) rotate(${ang}) scale(1.7)"><path d="${PLANE}" fill="${C.paper}"/></g>
    ${label ? `<text x="${x1 + 26}" y="${y1 + 6}" font-family="JetBrains Mono, monospace" font-size="16" fill="${C.signal}">2045</text>` : ""}
  </svg>`;
};

const pages = [
  // Logos (transparent backgrounds where it makes sense)
  { f: "clickshift-mark-1024.png", w: 1024, h: 1024, transparent: true, body: `<div style="width:1024px;height:1024px">${mark(C.ink, C.signal).replace('width="48" height="48"', 'width="1024" height="1024"')}</div>` },
  { f: "clickshift-mark-ink-on-lime-1024.png", w: 1024, h: 1024, transparent: true, body: `<div style="width:1024px;height:1024px">${mark(C.signal, C.ink).replace('width="48" height="48"', 'width="1024" height="1024"')}</div>` },
  { f: "clickshift-logo-on-dark.png", w: 2400, h: 720, bg: C.ink, body: `<div style="height:720px;display:flex;align-items:center;justify-content:center">${lockup(300, C.signal, C.ink, C.paper)}</div>` },
  { f: "clickshift-logo-on-light.png", w: 2400, h: 720, bg: C.paper, body: `<div style="height:720px;display:flex;align-items:center;justify-content:center">${lockup(300, C.ink, C.signal, C.ink)}</div>` },
  { f: "clickshift-logo-transparent-dark-text.png", w: 2400, h: 720, transparent: true, body: `<div style="height:720px;display:flex;align-items:center;justify-content:center">${lockup(300, C.ink, C.signal, C.ink)}</div>` },
  { f: "clickshift-logo-transparent-light-text.png", w: 2400, h: 720, transparent: true, body: `<div style="height:720px;display:flex;align-items:center;justify-content:center">${lockup(300, C.signal, C.ink, C.paper)}</div>` },
  // Profile picture (X, LinkedIn, Instagram): circle-safe
  { f: "clickshift-profile-400.png", w: 400, h: 400, bg: C.signal, body: `<div style="width:400px;height:400px;display:flex;align-items:center;justify-content:center">${mark(null, C.ink).replace('width="48" height="48"', 'width="300" height="300"')}</div>` },
  // X / Twitter header 1500x500: profile photo covers the bottom-left, so content sits centre-right
  {
    f: "clickshift-x-header-1500x500.png",
    w: 1500,
    h: 500,
    bg: C.ink,
    body: `<div class="grid" style="position:relative;width:1500px;height:500px;overflow:hidden">
      <div style="position:absolute;right:-120px;top:-160px;width:620px;height:620px;border-radius:50%;background:${C.cobalt};opacity:.28;filter:blur(120px)"></div>
      ${flight(1500, 500, 560, 430, 1360, 120)}
      <div style="position:absolute;left:560px;top:70px">
        <div class="mono" style="color:${C.signal};font-size:15px;letter-spacing:.22em">THE SOLUTIONS FACTORY</div>
        <div style="margin-top:14px;color:${C.paper};font-size:58px;font-weight:500;letter-spacing:-0.045em;line-height:1">We build what still<br>works in <span style="color:${C.signal}">2045.</span></div>
        <div class="mono" style="margin-top:22px;color:${C.stone};font-size:15px;letter-spacing:.08em">AUTOMATION · AI AGENTS · PLATFORMS · CRM</div>
      </div>
      <div style="position:absolute;right:48px;bottom:36px;display:flex;align-items:center;gap:14px">${lockup(40, C.signal, C.ink, C.paper)}<span class="mono" style="color:${C.stone};font-size:15px;margin-left:8px">clickshift.io</span></div>
    </div>`,
  },
  // LinkedIn personal background 1584x396: profile photo covers the left ~ 450px at the bottom
  {
    f: "clickshift-linkedin-banner-1584x396.png",
    w: 1584,
    h: 396,
    bg: C.ink,
    body: `<div class="grid" style="position:relative;width:1584px;height:396px;overflow:hidden">
      <div style="position:absolute;right:-80px;top:-200px;width:600px;height:600px;border-radius:50%;background:${C.cobalt};opacity:.28;filter:blur(120px)"></div>
      ${flight(1584, 396, 520, 350, 1470, 92)}
      <div style="position:absolute;left:520px;top:56px">
        <div class="mono" style="color:${C.signal};font-size:14px;letter-spacing:.22em">CLICKSHIFT · THE SOLUTIONS FACTORY</div>
        <div style="margin-top:12px;color:${C.paper};font-size:50px;font-weight:500;letter-spacing:-0.045em;line-height:1.02">We build what still works in <span style="color:${C.signal}">2045.</span></div>
        <div class="mono" style="margin-top:18px;color:${C.stone};font-size:14px;letter-spacing:.08em">PROGRAMME PLATFORMS · AUTOMATION AS A SERVICE · AI AGENTS · CRM</div>
      </div>
      <div class="mono" style="position:absolute;right:44px;bottom:30px;color:${C.paper};font-size:16px">clickshift.io</div>
    </div>`,
  },
  // LinkedIn company page cover 1128x191
  {
    f: "clickshift-linkedin-company-cover-1128x191.png",
    w: 1128,
    h: 191,
    bg: C.ink,
    body: `<div class="grid" style="position:relative;width:1128px;height:191px;overflow:hidden">
      <div style="position:absolute;right:-60px;top:-160px;width:420px;height:420px;border-radius:50%;background:${C.cobalt};opacity:.3;filter:blur(90px)"></div>
      ${flight(1128, 191, 560, 168, 1040, 46, false)}
      <div style="position:absolute;left:300px;top:44px">
        <div style="color:${C.paper};font-size:38px;font-weight:500;letter-spacing:-0.045em;line-height:1">We build what still works in <span style="color:${C.signal}">2045.</span></div>
        <div class="mono" style="margin-top:14px;color:${C.stone};font-size:12px;letter-spacing:.1em">AUTOMATION · AI AGENTS · PLATFORMS · CRM · clickshift.io</div>
      </div>
    </div>`,
  },
];

const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage();
for (const p of pages) {
  await page.setViewport({ width: p.w, height: p.h, deviceScaleFactor: 1 });
  const bg = p.transparent ? "transparent" : p.bg;
  await page.setContent(`<!doctype html><html><head>${fonts}<style>${base} html,body{background:${bg};width:${p.w}px;height:${p.h}px;overflow:hidden}</style></head><body>${p.body}</body></html>`, { waitUntil: "load", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 300));
  const font = await page.evaluate(() => document.fonts.check("600 20px 'Space Grotesk'"));
  await page.screenshot({ path: path.join(OUT, p.f), omitBackground: Boolean(p.transparent) });
  console.log(p.f, font ? "" : "(fallback font!)");
}
await browser.close();
