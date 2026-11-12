# ClickShift brand guide

**The solutions factory. We build what still works in 2045.**

The asset files are in `brand/assets/`, with a copy in `Desktop/ClickShift Brand/`. On the site, the colours live in
`src/app/globals.css` (`@theme`) and `src/lib/site.ts` (`BRAND`). Keep both in step.

---

## 1. Idea

ClickShift is a factory for solutions: products, platforms, automations and AI agents that are still worth using in 2045.

- **Voice:** practical, specific and calm. We show proof, not hype.
- **Feel:** an engineer's workshop at night. Dark steel, a blueprint grid, one bright signal light.
- **Every claim links to the work behind it.** Never print a number that has no source.

## 2. Logo: "the sawtooth shift"

The mark has two parts:
- **Three rising teeth.** They read as a factory's sawtooth roof and as a growth curve, at the same time.
- **A small square spark** ahead of the last tooth. That is the *click*: the next thing, already moving.

| File | Use |
|---|---|
| `clickshift-mark-lime-on-ink.svg` | **Primary mark.** App icons, favicons, avatars on light backgrounds |
| `clickshift-mark-ink-on-lime.svg` | On dark backgrounds, and in the site's navbar |
| `clickshift-mark-ink.svg` / `-white.svg` | One colour: stamps, embossing, merch, photos |
| `clickshift-logo-on-dark.png` / `-on-light.png` | Mark and wordmark, horizontal lockup |
| `clickshift-logo-transparent-*.png` | Lockup on your own backgrounds |
| `clickshift-profile-400.png` | Social profile picture (circle-safe) |

**Rules**
- **Clear space:** keep space around the mark equal to the spark's width × 2.
- **Minimum size:** the mark at 16 px; the lockup at 96 px wide.
- **Wordmark:** "ClickShift" in Space Grotesk SemiBold, letter-spacing −3.5%. Always a capital C and a capital S, as one word.
- **Never:**
  - recolour the teeth outside the palette;
  - rotate the mark (the site tilts it 6° on hover, and that is the only motion);
  - add shadows or gradients;
  - put lime on a light background;
  - stretch the mark;
  - separate the spark from the teeth.

## 3. Colour

| Token | Hex | RGB | CMYK (approx.) | Role |
|---|---|---|---|---|
| **Ink** | `#0B0C10` | 11 12 16 | 31 25 0 94 | Primary dark surface, text on light |
| Ink 2 | `#15171D` | 21 23 29 | | Cards on ink |
| **Paper** | `#F3F0E8` | 243 240 232 | 0 1 5 5 | Primary light surface (warm, never pure white for pages) |
| Paper 2 | `#E9E4D8` | | | Alternate light sections |
| **Signal lime** | `#D4FF3A` | 212 255 58 | 17 0 77 0 | The one accent: CTAs, highlights, the "2045" |
| Signal deep | `#4E6B00` | 78 107 0 | 27 0 100 58 | The lime family **on light surfaces**: text, icons and rules on flyers and documents |
| **Cobalt** | `#2E44FF` | 46 68 255 | 82 73 0 0 | Links, focus, secondary buttons, charts |
| Stone | `#8C9099` | 140 144 153 | 8 6 0 40 | Secondary text **on ink only** |
| Mute | `#5A5E67` | 90 94 103 | | Secondary text on paper |

**Contrast** (computed WCAG ratios; 4.5 is the minimum for body text):

| Pair | Ratio | Verdict |
|---|---|---|
| Ink on paper | 17.2 | ✓ Body text |
| Lime on ink / ink on lime | 16.9 | ✓ Body text, buttons |
| Cobalt on paper | 5.4 | ✓ Links and buttons |
| White or paper on cobalt | 6.2 / 5.4 | ✓ Button labels |
| Mute on paper | 5.7 | ✓ Secondary text |
| Stone on ink | 6.1 | ✓ Secondary text on dark |
| Signal deep on paper | 5.4 | ✓ Lime-family text on light |
| Cobalt on ink | 3.2 | ✗ Body text. Use only for large shapes and glows on dark |
| Stone on paper | 2.8 | ✗ Text. Use mute instead |
| **Lime on paper or white** | **1.0** | **✗ Never.** It disappears |

**Review (2026-11-12): the palette works and is kept.**
- On dark, ink and lime give the highest-contrast pairing.
- Paper keeps light pages warm instead of clinical.
- Cobalt carries interaction without competing with lime.
- **The tweak:** the one gap was print and light layouts, where people instinctively reach for lime text. **Signal deep** (`#4E6B00`) fills that gap. Use it, never lime, for lime-family text on paper.

**Proportions on any layout:** roughly 60 % ink or paper, 30 % the other neutral, 8 % cobalt, and **2 % lime**. Lime is
precious: one CTA, one highlighted word or number, one line. If everything is lime, nothing is.

**Print:** lime is brighter than CMYK can reproduce, so printed lime looks duller. Ask the printer for the closest solid
spot colour and approve a physical proof before a large run. Ink prints best as rich black (60 / 40 / 40 / 100), not 100 K.

## 4. Type

| Role | Font | Settings |
|---|---|---|
| Display and headlines | **Space Grotesk** (Medium 500 / SemiBold 600) | Tight tracking: −3 % to −5.5 % at large sizes; line-height 0.92–1.05 |
| Body | **Inter** (400 / 500) | 15–17 px on screen, line-height 1.6–1.75 |
| Labels, data, codes | **JetBrains Mono** (400 / 500) | Uppercase, tracking +16–22 %, 10–12 px: "THE FLIGHT TO 2045" |

All three are free on Google Fonts. In Canva, use Space Grotesk and Inter; if JetBrains Mono is missing, use IBM Plex Mono.

## 5. Graphic elements

- **Blueprint grid:** 56 px squares, lines at 4.5 % white on ink (5 % ink on paper). It sits behind hero sections, banners and slides.
- **Glows:** one large blurred cobalt circle (about 25 % opacity) in a corner of dark layouts. At most one lime glow, and a faint one.
- **The flight path:** a dotted line climbing from the bottom-left (today, the factory roofline) to the top-right (2045), with a small aircraft in paper white. Use it on banners, covers and the 2045 Standard.
- **Unit labels:** mono, uppercase, numbered ("UNIT 06", "01", "CHECKPOINT 03"). This is the factory's labelling.
- **Corners:** 22–28 px radius on cards; buttons are fully rounded pills.
- **Photos:** real people and real work. Desaturate slightly so lime stays the brightest thing on the page.

## 6. Voice

- Short sentences. Name the thing, then show the proof: "Lead response improved by 85%."
- Prefer "we built" and "it now does" to "we leverage" and "cutting-edge".
- Name the pillar when it applies: learn, secure, trace, sustain, care.
- Speak for the studio: "we" and "the team", not "I".

## 7. Social templates in this folder

| File | Size | Safe area |
|---|---|---|
| `clickshift-x-header-1500x500.png` | X / Twitter header | Content sits centre-right; the profile photo covers the bottom-left |
| `clickshift-linkedin-banner-1584x396.png` | LinkedIn personal background | Content starts about 520 px from the left; the photo covers the left |
| `clickshift-linkedin-company-cover-1128x191.png` | LinkedIn company page | Centre band |

To regenerate or adapt them, the source is `brand/generate.mjs` (renders with headless Chrome).
