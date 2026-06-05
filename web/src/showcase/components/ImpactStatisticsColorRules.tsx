import { useMemo, useState } from "react";
import {
  CHART_BLUE_VARS,
  CHART_BROWN_VARS,
} from "../../design-system/DistributionChart/chartPalette";
import { ShowcaseCodeBlock } from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./ImpactStatisticsShowcase.module.css";

const PALETTE_TOKENS = [...CHART_BROWN_VARS, ...CHART_BLUE_VARS] as const;

type PaletteStripProps = {
  title: string;
  subtitle: string;
  tokens: readonly string[];
  values: Record<string, string>;
  directionLabel: string;
};

function PaletteStrip({
  title,
  subtitle,
  tokens,
  values,
  directionLabel,
}: PaletteStripProps) {
  return (
    <article className={styles.paletteBlock}>
      <header className={styles.paletteHeader}>
        <div>
          <h4 className={styles.paletteTitle}>{title}</h4>
          <p className={styles.paletteSubtitle}>{subtitle}</p>
        </div>
        <span className={styles.paletteDirection}>{directionLabel}</span>
      </header>
      <div className={styles.paletteStrip} role="list" aria-label={title}>
        {tokens.map((token, index) => (
          <div
            key={token}
            className={styles.paletteSwatch}
            role="listitem"
            style={{ backgroundColor: values[token] ?? `var(${token})` }}
            title={`${token} · ${values[token] ?? "—"}`}
          >
            <span className={styles.paletteSwatchIndex}>{index + 1}</span>
          </div>
        ))}
      </div>
      <p className={styles.paletteTokenHint}>
        Brand tokens:{" "}
        <code>{tokens[0]}</code> … <code>{tokens[tokens.length - 1]}</code>
      </p>
    </article>
  );
}

export function ImpactStatisticsColorRules() {
  const [copied, setCopied] = useState(false);
  const values = useCssVarValues(useMemo(() => [...PALETTE_TOKENS], []));

  const handleCopyStroke = async () => {
    try {
      await navigator.clipboard.writeText("rgba(255, 255, 255, 0.4)");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={styles.colorRules}>
      <p className={styles.colorRulesIntro}>
        Професійна система кольорів для Impact charts (Figma{" "}
        <a
          href="https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1285-29521"
          target="_blank"
          rel="noreferrer"
        >
          Sage &amp; Olive Matrix · 1285:29521
        </a>
        ): монохромні палітри brown / blue для читабельних bar charts. У коді —
        Brand <code>chart/brown-*</code> та <code>chart/blue-*</code> (
        <code>--pryt-brand-chart-*</code>).
      </p>

      <div className={styles.colorRulesStats}>
        <div className={styles.colorRulesStat}>
          <span className={styles.colorRulesStatValue}>11</span>
          <span className={styles.colorRulesStatLabel}>категорій / рядків</span>
        </div>
        <div className={styles.colorRulesStatDark}>
          <span className={styles.colorRulesStatValue}>11</span>
          <span className={styles.colorRulesStatLabel}>відтінків на палітру</span>
        </div>
      </div>

      <PaletteStrip
        title="CategoryDistributionChart — brown"
        subtitle="Один відтінок на рядок; stacked-сегменти — сусідні кроки палітри."
        tokens={CHART_BROWN_VARS}
        values={values}
        directionLabel="зверху ↓ світліший · brown-11 → brown-1"
      />

      <PaletteStrip
        title="DepartmentDistributionChart — blue"
        subtitle="Суцільний bar на відомство; колір за рангом рядка в шкалі."
        tokens={CHART_BLUE_VARS}
        values={values}
        directionLabel="зверху ↓ світліший · blue-11 → blue-1"
      />

      <section className={styles.colorRulesLogic} aria-labelledby="color-assignment-heading">
        <h4 id="color-assignment-heading" className={styles.colorRulesSubheading}>
          Призначення кольору в коді
        </h4>
        <ShowcaseCodeBlock
          language="ts"
          code={`import { chartColorVar } from "@/design-system/DistributionChart/chartPalette";

// Category row (solid bar or segment base)
chartColorVar("brown", rowIndex, rows.length);

// Category stacked segment
chartColorVar("brown", rowIndex + segmentIndex, rows.length + segmentCount);

// Department row — інтерполяція по рангах
chartColorVar("blue", rowIndex, rows.length);`}
        />
        <ul className={styles.colorRulesList}>
          <li>
            <strong>Category:</strong> рядок <code>i</code> →{" "}
            <code>--pryt-brand-chart-brown-{"{11 - i}"}</code> (11 = найсвітліший,
            1 = найтемніший). Stacked-сегменти зміщують індекс на{" "}
            <code>+ segmentIndex</code>.
          </li>
          <li>
            <strong>Department:</strong> колір інтерполюється між{" "}
            <code>blue-11</code> та <code>blue-1</code> за формулою{" "}
            <code>rowIndex / (total − 1)</code>.
          </li>
          <li>
            <strong>Bar fill:</strong> лише Brand <code>chart/*</code> — без raw
            hex у компонентах; Mapped/Alias не використовуються для сегментів.
          </li>
          <li>
            <strong>Figma matrix:</strong> 11 категорій × 10 кроків градієнта в
            макеті; довжина bar пропорційна частці сегментів (10 кроків на
            category row у stacked variant).
          </li>
        </ul>
      </section>

      <section className={styles.strokeCard} aria-labelledby="stroke-right-heading">
        <h4 id="stroke-right-heading" className={styles.strokeCardTitle}>
          Логіка «Stroke Right»
        </h4>
        <p className={styles.strokeCardLead}>
          Кожен сегмент stacked bar має розділювальну лінію праворуч — користувач
          бачить кроки градієнта. Прозорість адаптується до яскравості фону.
        </p>
        <ul className={styles.colorRulesList}>
          <li>
            <strong>Світлі фони:</strong> білий 40% —{" "}
            <button
              type="button"
              className={styles.strokeCode}
              onClick={handleCopyStroke}
            >
              rgba(255, 255, 255, 0.4)
            </button>
            {copied ? " · copied" : null} — м&apos;який контраст на пастельних
            тонах.
          </li>
          <li>
            <strong>Темні фони (Figma):</strong> прозорість до 20–30% (
            <code>rgba(255, 255, 255, 0.2)</code>) — менше «шуму» на насичених
            темних категоріях.
          </li>
          <li>
            <strong>У коді:</strong>{" "}
            <code>HorizontalDistributionChart.module.css</code> ·{" "}
            <code>.segmentDivider</code> — зараз єдиний divider{" "}
            <code>rgba(255, 255, 255, 0.4)</code> (approved exception, TODO —
            token).
          </li>
        </ul>
      </section>
    </div>
  );
}
