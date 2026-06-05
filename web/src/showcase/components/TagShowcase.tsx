import { useMemo, useState } from "react";
import { SubTag, Tag } from "../../design-system/Tag";
import {
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDocUsageGuidelines,
  ShowcaseThemeProvider,
  type DocPropertyRow,
  type ShowcaseDocSwitchOption,
  useShowcaseTheme,
} from "../primitives";
import { useCssVarValues } from "../tokens/useCssVarValues";
import styles from "./TagShowcase.module.css";

const FIGMA_TAG_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7429";

const LIVE_PREVIEW_CODE_TAG = `import { Tag } from "@/design-system/Tag";

<Tag>Гуманітарний</Tag>`;

const LIVE_PREVIEW_CODE_SUBTAG = `import { SubTag } from "@/design-system/Tag";

<SubTag>Проєкт</SubTag>`;

const PREVIEW_KIND_OPTIONS = [
  { value: "tag", label: "Tag" },
  { value: "subtag", label: "SubTag" },
] as const satisfies readonly ShowcaseDocSwitchOption<string>[];

type TagPreviewKind = (typeof PREVIEW_KIND_OPTIONS)[number]["value"];

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "Tag.children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Текст pill-тега (Figma Tag Label).",
  },
  {
    property: "Tag.className",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Додатковий клас на <span>.",
  },
  {
    property: "SubTag.children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Текст SubTag (напр. «Проєкт»).",
  },
  {
    property: "SubTag.className",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Додатковий клас на <span>.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Tag", property: "background", token: "--surface-badge" },
  { element: "Tag", property: "background (hover)", token: "--surface-subtle-info" },
  { element: "Tag", property: "color", token: "--text-muted" },
  { element: "Tag", property: "font-size", token: "--font-size-body-small" },
  { element: "Tag", property: "padding", token: "--space-xsmall, --space-small" },
  { element: "Tag", property: "border-radius", token: "--radius-round" },
  { element: "SubTag", property: "color", token: "--text-muted" },
  { element: "SubTag", property: "color (hover)", token: "--text-default" },
  { element: "SubTag", property: "underline", token: "--border-width-small" },
] as const;

function TagShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [previewKind, setPreviewKind] = useState<TagPreviewKind>("tag");

  const isSubTag = previewKind === "subtag";
  const livePreviewCode = isSubTag
    ? LIVE_PREVIEW_CODE_SUBTAG
    : LIVE_PREVIEW_CODE_TAG;

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
        title="Tag"
        description="Tag — pill-категорія з hover. SubTag — текстова мітка з підкресленням на hover."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_TAG_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Перемикач Tag / SubTag; hover — наведи курсор на preview."
        >
          <ShowcaseDocLivePreview
            caption={
              isSubTag
                ? "SubTag · Default · hover → underline + --text-default."
                : "Tag · Default · hover → --surface-subtle-info."
            }
            code={livePreviewCode}
            previewValue={previewKind}
            onPreviewValueChange={(value) =>
              setPreviewKind(value as TagPreviewKind)
            }
            previewLabeledOptions={PREVIEW_KIND_OPTIONS}
          >
            <div className={styles.livePreviewSlot}>
              {isSubTag ? <SubTag>Проєкт</SubTag> : <Tag>Гуманітарний</Tag>}
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          description="Tag і SubTag — окремі експорти з design-system/Tag."
        >
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="token-usage">
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Tag і SubTag — <span>, декоративні; не інтерактивні (немає onClick).",
              "Якщо тег веде на фільтр — обгортай у <button> або <a> з батька.",
              "Не покладайтесь лише на колір hover — текст label залишається читабельним.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Tag — категорії на картках (pill + hover блакитний)",
              "SubTag — вторинна мітка («Проєкт») з underline на hover",
              "Filter Chip — для toggle-фільтрів списку",
            ]}
            dont={[
              "Не плутай Tag з Badge (×), Filter Chip (active)",
              "Не додавай variant/active — лише Default + CSS hover",
              "Не хардкодуй кольори поза токенами",
            ]}
            alternatives={[
              { label: "Badge", path: "badge", note: "тег із dismiss" },
              { label: "Filter Chip", path: "filter-chip", note: "фільтр з active" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            related={[
              { label: "Badge", path: "badge" },
              { label: "Filter Chip", path: "filter-chip" },
            ]}
            usedWith={[
              { label: "Project Card", path: "project-card" },
              { label: "News Card", path: "news-card" },
              { label: "Media Card", path: "media-card" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function TagShowcase() {
  return (
    <ShowcaseThemeProvider>
      <TagShowcasePage />
    </ShowcaseThemeProvider>
  );
}
