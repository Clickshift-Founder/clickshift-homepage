// Prepares client logos for the brand marquee: trims the empty border, scales to 160 px high (2x for a 40 px tile),
// and reports the background colour each tile should use. Re-run after adding a source file:
//   node brand/logos.mjs "C:/Users/User/Downloads"
// Sources are the founder-supplied files named below; output goes to public/brands/<slug>.png.
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const dir = process.argv[2];
if (!dir) throw new Error("Pass the folder holding the source logos");
const out = path.resolve("public/brands");
fs.mkdirSync(out, { recursive: true });

const FILES = {
  sppg: "SPPG logo.jpeg",
  endgame: "Endgame logo.jpeg",
  "dominion-city": "Dominion city logo.jpeg",
  hibreed: "Hibreed.io logo.png",
  "digital-brothers": "digital brothers logo.jpeg",
  bfg: "bfg logo.jpeg",
  "world-bank": "worldbank logo.png",
  "un-women": "UN Women logo.jpeg",
  fcdo: "FCDO logo (600x600).png",
  "do-take-action": "dotakeaction logo.png",
};

for (const [slug, file] of Object.entries(FILES)) {
  const src = path.join(dir, file);
  const flat = await sharp(src).flatten({ background: "#ffffff" }).toBuffer();
  const { data } = await sharp(flat).extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  const bg = "#" + [...data.slice(0, 3)].map((v) => v.toString(16).padStart(2, "0")).join("");
  const trimmed = await sharp(flat).trim({ threshold: 30 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const pad = Math.round((meta.height ?? 100) * 0.06);
  const padded = await sharp(trimmed)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: bg })
    .toBuffer();
  const img = sharp(padded).resize({ height: 160 });
  const info = await img.png({ compressionLevel: 9, palette: true }).toFile(path.join(out, `${slug}.png`));
  console.log(slug.padEnd(18), `${info.width}x${info.height}`, bg);
}
