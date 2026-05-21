/**
 * Generates CSS custom properties and TS helpers from design-tokens/data/figma-variables.tsv
 * Mirrors Figma collections: Brand (literals), Alias & Mapped (var() chains).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const TSV_PATH = path.join(ROOT, "data", "figma-variables.tsv");
const DIST = path.join(ROOT, "dist");
const WEB_STYLES = path.join(ROOT, "..", "web", "src", "styles");

function slugPath(name) {
  return name
    .split("/")
    .map((s) => s.replace(/\s+/g, "-").toLowerCase())
    .join("-");
}

function brandVar(name) {
  return `--pryt-brand-${slugPath(name)}`;
}

function aliasVar(name) {
  return `--${slugPath(name)}`;
}

function mappedVar(figmaName) {
  const [cat, rest] = figmaName.split("/");
  const c = cat.toLowerCase();
  let s = rest.toLowerCase();
  const pref = `${c}-`;
  if (s.startsWith(pref)) s = s.slice(pref.length);
  return `--${c}-${s}`;
}

/** Mapped aliases Alias with the same CSS name — emit once in :root (Alias wins). */
function mappedDedupesWithAlias(mappedProp, aliasTargetId, idToCssName) {
  const aliasProp = idToCssName.get(aliasTargetId);
  return aliasProp != null && mappedProp === aliasProp;
}

function parseRows(tsv) {
  const rows = [];
  for (const line of tsv.split("\n")) {
    if (!line.trim()) continue;
    const parts = line.split("\t");
    if (parts.length < 5) continue;
    const [id, collection, name, type, ...rest] = parts;
    rows.push({
      id,
      collection,
      name,
      type,
      value: rest.join("\t"),
    });
  }
  return rows;
}

function literalCss(row) {
  const { type, name, value } = row;
  if (type === "COLOR") return value;
  if (type === "STRING") {
    try {
      const s = JSON.parse(value);
      return /[\s,]/.test(s) ? `"${String(s).replace(/"/g, '\\"')}"` : String(s);
    } catch {
      return value;
    }
  }
  if (type === "FLOAT") {
    const n = Number(value);
    if (Number.isNaN(n)) return "0";
    if (name.startsWith("font-size/")) return `${n}px`;
    if (name.startsWith("Scale/")) return `${n}px`;
    return `${n}px`;
  }
  return value;
}

function main() {
  const tsv = fs.readFileSync(TSV_PATH, "utf8");
  const rows = parseRows(tsv);
  const idToCssName = new Map();

  for (const row of rows) {
    let cssName;
    if (row.collection === "Brand") cssName = brandVar(row.name);
    else if (row.collection === "Alias") cssName = aliasVar(row.name);
    else if (row.collection === "Mapped") cssName = mappedVar(row.name);
    else continue;
    idToCssName.set(row.id, cssName);
  }

  const brandRows = rows.filter((r) => r.collection === "Brand");
  const aliasRows = rows.filter((r) => r.collection === "Alias");
  const mappedRows = rows.filter((r) => r.collection === "Mapped");

  const cssBlocks = [];

  cssBlocks.push(`/**
 * Prytula design tokens — generated from Figma variables (Brand → Alias → Mapped).
 * Source: design-tokens/data/figma-variables.tsv
 * Regenerate: npm run build:tokens
 */
:root {`);

  cssBlocks.push(`  /* --- Brand (primitive values) --- */`);
  for (const row of brandRows) {
    const prop = idToCssName.get(row.id);
    const decl = literalCss(row);
    cssBlocks.push(`  ${prop}: ${decl};`);
  }

  cssBlocks.push("");
  cssBlocks.push(`  /* --- Alias (semantic → references Brand) --- */`);
  for (const row of aliasRows) {
    const prop = idToCssName.get(row.id);
    let decl;
    if (row.value.startsWith("alias:")) {
      const tid = row.value.slice("alias:".length);
      const target = idToCssName.get(tid);
      if (!target) throw new Error(`Unresolved alias ${row.id} → ${tid}`);
      decl = `var(${target})`;
    } else {
      decl = literalCss(row);
    }
    cssBlocks.push(`  ${prop}: ${decl};`);
  }

  const dedupedMapped = [];
  cssBlocks.push("");
  cssBlocks.push(`  /* --- Mapped (UI roles → references Alias) --- */`);
  for (const row of mappedRows) {
    const prop = idToCssName.get(row.id);
    const tid = row.value.startsWith("alias:") ? row.value.slice("alias:".length) : null;
    if (!tid) throw new Error(`Mapped token ${row.name} expected alias`);
    const target = idToCssName.get(tid);
    if (!target) throw new Error(`Unresolved mapped ${row.id} → ${tid}`);
    if (mappedDedupesWithAlias(prop, tid, idToCssName)) {
      dedupedMapped.push({ mapped: row.name, css: prop, aliasId: tid });
      continue;
    }
    cssBlocks.push(`  ${prop}: var(${target});`);
  }
  if (dedupedMapped.length > 0) {
    cssBlocks.push("");
    cssBlocks.push(
      `  /* Deduped with Alias (same CSS name, defined above): ${dedupedMapped.map((d) => d.css).join(", ")} */`,
    );
  }

  cssBlocks.push(`}`);
  cssBlocks.push("");
  cssBlocks.push(`/* Grid system (hardcoded, pending Figma sync) */`);
  cssBlocks.push(`/* Grid system — hardcoded until Figma variables are added */`);
  cssBlocks.push(`:root {`);
  cssBlocks.push(`  --grid-gutter: 24px;`);
  cssBlocks.push(`  --grid-columns-mobile: 4;`);
  cssBlocks.push(`  --grid-columns-tablet: 8;`);
  cssBlocks.push(`  --grid-columns-desktop: 12;`);
  cssBlocks.push(`  --container-mobile: 343px;`);
  cssBlocks.push(`  --container-tablet: 760px;`);
  cssBlocks.push(`  --container-desktop: 1440px;`);
  cssBlocks.push(`  --container-desktop-xl: 1920px;`);
  cssBlocks.push(`}`);
  cssBlocks.push("");

  const css = cssBlocks.join("\n");
  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, "tokens.css"), css, "utf8");
  fs.mkdirSync(WEB_STYLES, { recursive: true });
  fs.writeFileSync(path.join(WEB_STYLES, "tokens.css"), css, "utf8");

  const tsLines = [];
  tsLines.push(`/** Figma path → var() reference — aligned with collections Brand / Alias / Mapped */`);
  tsLines.push(`export const brand = {`);
  for (const row of brandRows) {
    tsLines.push(`  ${JSON.stringify(row.name)}: ${JSON.stringify(`var(${brandVar(row.name)})`)},`);
  }
  tsLines.push(`} as const;`);
  tsLines.push("");
  tsLines.push(`export const alias = {`);
  for (const row of aliasRows) {
    tsLines.push(`  ${JSON.stringify(row.name)}: ${JSON.stringify(`var(${aliasVar(row.name)})`)},`);
  }
  tsLines.push(`} as const;`);
  tsLines.push("");
  tsLines.push(`export const mapped = {`);
  for (const row of mappedRows) {
    tsLines.push(`  ${JSON.stringify(row.name)}: ${JSON.stringify(`var(${mappedVar(row.name)})`)},`);
  }
  tsLines.push(`} as const;`);
  tsLines.push("");
  tsLines.push(`export type BrandToken = keyof typeof brand;`);
  tsLines.push(`export type AliasToken = keyof typeof alias;`);
  tsLines.push(`export type MappedToken = keyof typeof mapped;`);
  tsLines.push("");

  fs.writeFileSync(path.join(DIST, "tokens.ts"), tsLines.join("\n"), "utf8");

  console.log(`Wrote ${path.join("design-tokens", "dist", "tokens.css")}`);
  console.log(`Wrote ${path.join("web", "src", "styles", "tokens.css")}`);
  console.log(`Wrote ${path.join("design-tokens", "dist", "tokens.ts")}`);
  if (dedupedMapped.length > 0) {
    console.log(`Mapped deduped with Alias (${dedupedMapped.length}):`);
    for (const d of dedupedMapped) {
      console.log(`  ${d.mapped} → ${d.css}`);
    }
  }
}

main();
