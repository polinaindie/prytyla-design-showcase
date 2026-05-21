#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error("Usage: node write-3d-assets.mjs <exports.json>");
  process.exit(1);
}

const outDir = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/illustrations/3d",
);

const data = JSON.parse(readFileSync(jsonPath, "utf8"));

for (const [name, entry] of Object.entries(data)) {
  if (!entry?.base64) {
    console.warn(`skip ${name}:`, entry?.error ?? "no base64");
    continue;
  }
  const path = resolve(outDir, `${name}.png`);
  writeFileSync(path, Buffer.from(entry.base64, "base64"));
  console.log(path, entry.base64.length);
}
