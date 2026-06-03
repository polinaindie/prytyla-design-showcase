import { useMemo } from "react";
import { QuickAmount } from "../../design-system/QuickAmount";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseMatrix,
  ShowcasePreview,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./QuickAmountShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1407-37060";

const LIVE_PREVIEW_CODE = `import { QuickAmount } from "@/design-system/QuickAmount";

<QuickAmount amount={500} currency="UAH" onClick={() => setAmount(500)} />`;

const DEMO_AMOUNTS = [100, 500, 1000, 5000] as const;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "amount",
    type: "number | string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Сума після префікса «+».",
  },
  {
    property: "currency",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"UAH"',
    description: "Код валюти (muted label).",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Нативний disabled на <button>.",
  },
  {
    property: "onClick",
    type: "() => void",
    typeKind: "BOOLEAN",
    optionsDefault: "—",
    description: "Обробник вибору швидкої суми.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "background", token: "--surface-subtle-neutral" },
  { element: "Root", property: "border", token: "--border-default" },
  { element: "Hover", property: "border / shadow", token: "--accent-secondary" },
  { element: "Amount", property: "color", token: "--text-default" },
  { element: "Currency", property: "color", token: "--text-muted" },
  { element: "Root", property: "font-size", token: "--font-size-body-small" },
  { element: "Root", property: "min-height", token: "--size-2xlarge" },
  { element: "Root", property: "padding", token: "--space-small" },
  { element: "Root", property: "border-radius", token: "--radius-round" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function QuickAmountShowcasePage() {
  const { theme } = useShowcaseTheme();

  const usageValues = useCssVarValues(
    useMemo(() => TOKEN_USAGE_SAMPLE.map((row) => row.token), []),
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: usageValues[row.token] ?? "—",
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Quick Amount"
        description="Пілюля швидкого вибору суми донату (+ сума + валюта)."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Ряд типових preset сум у donate widget."
        >
          <ShowcaseDocLivePreview
            caption="amount=500 · currency=UAH · hover — CSS на другій пілюлі в gallery."
            code={LIVE_PREVIEW_CODE}
          >
            <QuickAmount amount={500} />
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Default / hover (наведи); ряд preset; disabled."
        >
          <p className={styles.galleryCaption}>
            Preset row · amounts 100–5000
          </p>
          <ShowcasePreview className={styles.preview}>
            <div className={styles.row}>
              {DEMO_AMOUNTS.map((value) => (
                <QuickAmount key={value} amount={value} />
              ))}
            </div>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            Default vs Hover · наведи на другу пілюлю
          </p>
          <ShowcaseMatrix
            columns={["Default", "Hover"]}
            rows={[
              {
                cells: [
                  <QuickAmount key="d" amount={500} />,
                  <QuickAmount
                    key="h"
                    amount={500}
                    aria-label="500 гривень — наведіть для hover"
                  />,
                ],
              },
            ]}
          />

          <p className={styles.galleryCaption}>disabled=true</p>
          <ShowcasePreview className={styles.preview}>
            <QuickAmount amount={500} disabled />
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            Hover 2px border — box-shadow 0 0 0 1px --accent-secondary поверх
            1px border (без layout shift).
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Нативний <button type=\"button\">.",
              "aria-label — якщо сума без контексту (напр. «500 гривень»).",
              "Focus-visible: outline --border-focus.",
              "Немає aria-pressed — вибір керує батько через onClick.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Завжди «+», сума та код валюти в одній пілюлі",
              "Hover лише через CSS — без selected prop",
              "Горизонтальний ряд у donate form",
            ]}
            dont={[
              "Не додавай selected/active prop у компонент",
              "Не змінюй префікс «+» без Figma",
              "Не плутай з Chip Payment Type (тип платежу)",
            ]}
            alternatives={[
              {
                label: "Chip Payment Type",
                path: "chip-payment-type",
                note: "щомісяця / одноразово",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Chip Payment Type", path: "chip-payment-type" }]}
            usedWith={[
              { label: "General Widget", path: "general-widget" },
              { label: "Button", path: "button" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function QuickAmountShowcase() {
  return (
    <ShowcaseThemeProvider>
      <QuickAmountShowcasePage />
    </ShowcaseThemeProvider>
  );
}
