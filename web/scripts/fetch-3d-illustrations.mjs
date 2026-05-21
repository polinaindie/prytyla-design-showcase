#!/usr/bin/env node
/**
 * Re-export 3D illustration PNGs from Figma (sharp on Retina).
 * Uses Images API at scale 2 (~232px / ~312px) — enough for showcase sizes.
 *
 *   FIGMA_ACCESS_TOKEN=figd_… node web/scripts/fetch-3d-illustrations.mjs
 *
 * Token: Figma → Settings → Security → Personal access tokens.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FILE_KEY = "hiAQiy4aRZQiwD1S4jekxY";
const SCALE = 2;

/** @type {{ file: string; nodeId: string }[]} */
const ASSETS = [
  { file: "humanitarian-projects", nodeId: "40:12220" },
  { file: "annual-reports", nodeId: "40:12223" },
  { file: "civilian-training", nodeId: "40:12233" },
  { file: "job-openings", nodeId: "40:12226" },
  { file: "about-fund", nodeId: "40:12229" },
  { file: "military-training", nodeId: "40:12242" },
  { file: "handshake", nodeId: "472:4652" },
  { file: "statistic", nodeId: "472:4654" },
  { file: "projects", nodeId: "1138:24227" },
  { file: "news", nodeId: "1149:24124" },
  { file: "uah", nodeId: "103:5196" },
  { file: "radio", nodeId: "103:5197" },
  { file: "drone", nodeId: "103:5198" },
  { file: "airplane", nodeId: "103:5199" },
  { file: "thermal-imager", nodeId: "103:5200" },
  { file: "turnstile", nodeId: "103:5202" },
  { file: "vehicle", nodeId: "1264:32002" },
];

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error("Set FIGMA_ACCESS_TOKEN (Figma → Settings → Personal access tokens)");
  process.exit(1);
}

const outDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/illustrations/3d",
);
mkdirSync(outDir, { recursive: true });

const ids = ASSETS.map((a) => a.nodeId).join(",");
const imagesUrl = new URL(`https://api.figma.com/v1/images/${FILE_KEY}`);
imagesUrl.searchParams.set("ids", ids);
imagesUrl.searchParams.set("format", "png");
imagesUrl.searchParams.set("scale", String(SCALE));

const res = await fetch(imagesUrl, {
  headers: { "X-Figma-Token": token },
});
if (!res.ok) {
  console.error("Figma images API:", res.status, await res.text());
  process.exit(1);
}

const { images, err } = await res.json();
if (err) {
  console.error(err);
  process.exit(1);
}

for (const { file, nodeId } of ASSETS) {
  const url = images[nodeId];
  if (!url) {
    console.warn(`skip ${file}: no URL for ${nodeId}`);
    continue;
  }
  const pngRes = await fetch(url);
  if (!pngRes.ok) {
    console.error(`fail ${file}:`, pngRes.status);
    continue;
  }
  const buf = Buffer.from(await pngRes.arrayBuffer());
  const outPath = resolve(outDir, `${file}.png`);
  writeFileSync(outPath, buf);
  console.log(outPath, buf.length);
}
