import { useMemo } from "react";
import { VacancyCard } from "../../design-system/VacancyCard";
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
import styles from "./VacancyCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1162-31929";

const LIVE_PREVIEW_CODE = `import { VacancyCard } from "@/design-system/VacancyCard";

<VacancyCard
  href="/careers/financial-analyst"
  title="Фінансовий аналітик"
  description="Аналіз фінансових звітів та прогнозування бюджету."
/>`;

const DEMO = {
  href: "/careers/financial-analyst",
  title: "Фінансовий аналітик",
  description: "Аналіз фінансових звітів та прогнозування бюджету.",
} as const;

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "title",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Назва вакансії (H3).",
  },
  {
    property: "description",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Короткий опис (body medium).",
  },
  {
    property: "href",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "URL сторінки вакансії.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "background", token: "--surface-default" },
  { element: "Hover", property: "background", token: "--surface-subtle-neutral" },
  { element: "Root", property: "border", token: "--border-default" },
  { element: "Title", property: "font-size", token: "--font-size-heading-h3" },
  { element: "Description", property: "font-size", token: "--font-size-body-medium" },
  { element: "Text", property: "color", token: "--text-default" },
  { element: "Root", property: "padding", token: "--space-3xlarge" },
  { element: "Root", property: "border-radius", token: "--radius-large" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function VacancyCardShowcasePage() {
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
        title="Vacancy Card"
        description="Картка-лінк вакансії: H3, опис, стрілка; hover — сірий фон."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="max-width 684px у Figma; width 100% у сітці."
        >
          <ShowcaseDocLivePreview
            caption="Default state · hover — наведи курсор."
            code={LIVE_PREVIEW_CODE}
          >
            <ShowcasePreview className={styles.preview}>
              <VacancyCard {...DEMO} />
            </ShowcasePreview>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Default vs Hover (CSS)."
        >
          <ShowcaseMatrix
            columns={["Default", "Hover (наведіть курсор)"]}
            rows={[
              {
                cells: [
                  <VacancyCard key="d" {...DEMO} />,
                  <VacancyCard
                    key="h"
                    {...DEMO}
                    aria-label={`${DEMO.title} — наведіть для hover`}
                  />,
                ],
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Семантичний <a href> з <h3> всередині.",
              "Focus-visible: --border-focus.",
              "aria-label на <a> якщо контекст неочевидний.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Завжди href + title + description",
              "Hover лише CSS — --surface-subtle-neutral",
              "width 100% у списку вакансій",
            ]}
            dont={[
              "Не <button> без href",
              "Не фіксуйте 684px у продукті",
            ]}
            alternatives={[
              { label: "Link Card", path: "link-card", note: "pill + illustration" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[{ label: "Directions External Links", path: "directions-external-links" }]}
            usedWith={[{ label: "Tabs", path: "tabs" }]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function VacancyCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <VacancyCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
