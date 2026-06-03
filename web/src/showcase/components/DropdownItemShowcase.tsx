import { useMemo, useState } from "react";
import { DropdownItem } from "../../design-system/DropdownItem";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcasePreview,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./DropdownItemShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=473-6474";

const LIVE_PREVIEW_CODE = `import { DropdownItem } from "@/design-system/DropdownItem";

<DropdownItem onClick={() => setSelected(label)}>
  Newest first
</DropdownItem>`;

const SORT_OPTIONS = [
  "Newest first",
  "Oldest first",
  "Most funded",
  "Closing soon",
];

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Текст пункту меню.",
  },
  {
    property: "disabled",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Нативний disabled на <button>.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "background", token: "--surface-default" },
  {
    element: "Root",
    property: "background (hover)",
    token: "--surface-subtle-neutral",
  },
  { element: "Root", property: "color", token: "--text-default" },
  { element: "Root", property: "font-size", token: "--font-size-body-medium" },
  { element: "Root", property: "padding", token: "--space-small, --space-xlarge" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function DropdownItemShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);

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
        title="Dropdown Item"
        description="Один пункт списку в dropdown; ширина 100% від контейнера меню."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Пункт у контексті меню — типовий sort dropdown."
        >
          <ShowcaseDocLivePreview
            caption={`aria-current на обраному · selected="${selected}".`}
            code={LIVE_PREVIEW_CODE}
          >
            <ul className={styles.menu}>
              {SORT_OPTIONS.map((label) => (
                <li key={label}>
                  <DropdownItem
                    onClick={() => setSelected(label)}
                    aria-current={selected === label ? "true" : undefined}
                  >
                    {label}
                  </DropdownItem>
                </li>
              ))}
            </ul>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Default / hover (CSS) / disabled у списку."
        >
          <p className={styles.galleryCaption}>
            Interactive menu · width від контейнера (145px Figma ref)
          </p>
          <ShowcasePreview className={styles.preview}>
            <ul className={styles.menu}>
              {SORT_OPTIONS.map((label) => (
                <li key={label}>
                  <DropdownItem
                    onClick={() => setSelected(label)}
                    aria-current={selected === label ? "true" : undefined}
                  >
                    {label}
                  </DropdownItem>
                </li>
              ))}
            </ul>
            <p className={styles.cellLabel}>Обрано: {selected}</p>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>disabled=true · останній пункт</p>
          <ShowcasePreview className={styles.preview}>
            <ul className={styles.menu}>
              <li>
                <DropdownItem>Enabled row</DropdownItem>
              </li>
              <li>
                <DropdownItem disabled>Disabled row</DropdownItem>
              </li>
            </ul>
          </ShowcasePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="properties">
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          <p className={styles.note}>
            min-height 2.25rem (36px) — збігається з --size-2xlarge; padding
            використовує space-токени.
          </p>
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Нативний <button type=\"button\">; label у children.",
              "aria-current=\"true\" для обраного пункту (рекомендовано з батька).",
              "Hover/focus — :hover та :focus-visible; outline --border-focus.",
              "role=menu/menuitem — на рівні батьківського DropdownMenu, не тут.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Використовуй у SortControl, Select, MultiDrop panels",
              "width: 100% — ширину задає ul/menu контейнер",
              "Hover у продукті — CSS на .root",
            ]}
            dont={[
              "Не фіксуй width на самому DropdownItem",
              "Не плутай з CurrencyOption — інший розмір (caption)",
              "Не додавай menu/menuitem ARIA на цьому рівні",
            ]}
            alternatives={[
              {
                label: "Currency Select",
                path: "currency-select",
                note: "pill + currency list",
              },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Sort Control", path: "sort-control" },
              { label: "Currency Select", path: "currency-select" },
            ]}
            usedWith={[
              { label: "DepartmentSelect", path: "department-select" },
              { label: "MultiDrop", path: "multi-drop" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function DropdownItemShowcase() {
  return (
    <ShowcaseThemeProvider>
      <DropdownItemShowcasePage />
    </ShowcaseThemeProvider>
  );
}
