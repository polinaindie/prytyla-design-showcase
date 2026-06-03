import { useMemo, useState } from "react";
import { Badge } from "../../design-system/Badge";
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
import styles from "./BadgeShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=1318-54208";

const LIVE_PREVIEW_CODE = `import { Badge } from "@/design-system/Badge";

<Badge onDismiss={() => {}} dismissLabel="Зняти «Освіта»">
  Освіта
</Badge>`;

const DEMO_TAGS = ["Щелепи", "Освіта", "Медицина"];

const NESTED_TAG = {
  label: "Літакового типу",
  path: ["Ударні БПЛА", "FPV-перехоплювачі", "Літакового типу"] as const,
};

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "—",
    description: "Текст тега (label).",
  },
  {
    property: "onDismiss",
    type: "() => void",
    typeKind: "BOOLEAN",
    optionsDefault: "required",
    description: "Обробник кліку по ×; без нього dismiss не рендериться логічно.",
  },
  {
    property: "dismissLabel",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: '"Зняти"',
    description: "aria-label для кнопки закриття.",
  },
  {
    property: "categoryPath",
    type: "readonly string[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description:
      "Breadcrumb для tooltip при hover (Figma Tooltip 1318:54224). Без пропа — плоский тег.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Root", property: "background", token: "--surface-badge" },
  { element: "Root", property: "background (hover)", token: "--surface-subtle-neutral" },
  { element: "Root", property: "color", token: "--text-default" },
  { element: "Root", property: "font-size", token: "--font-size-body-small" },
  { element: "Root", property: "min-height", token: "--size-xlarge" },
  { element: "Root", property: "padding", token: "--space-xsmall, --space-medium" },
  { element: "Root", property: "gap", token: "--space-small" },
  { element: "Root", property: "border-radius", token: "--radius-medium" },
  { element: "Dismiss", property: "focus outline", token: "--border-focus" },
  { element: "Tooltip", property: "background", token: "--surface-default" },
  { element: "Tooltip", property: "border", token: "--border-default" },
] as const;

function BadgeShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [tags, setTags] = useState(DEMO_TAGS);

  const usageValues = useCssVarValues(
    useMemo(() => TOKEN_USAGE_SAMPLE.map((row) => row.token), []),
  );

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    element: row.element,
    property: row.property,
    token: row.token,
    value: usageValues[row.token] ?? "—",
  }));

  const removeTag = (label: string) => {
    setTags((prev) => prev.filter((t) => t !== label));
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Badge"
        description="Тег із закриттям (×); опційно tooltip з ієрархією категорій при hover."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Базовий плоский тег без categoryPath."
        >
          <ShowcaseDocLivePreview
            caption="Default · flat tag · dismiss enabled."
            code={LIVE_PREVIEW_CODE}
          >
            <Badge onDismiss={() => {}} dismissLabel="Зняти «Освіта»">
              Освіта
            </Badge>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Плоский тег, ієрархія з tooltip, інтерактивний ряд."
        >
          <p className={styles.galleryCaption}>
            With categoryPath · hover для breadcrumb tooltip
          </p>
          <ShowcasePreview className={styles.preview}>
            <Badge
              categoryPath={NESTED_TAG.path}
              onDismiss={() => {}}
              dismissLabel={`Зняти «${NESTED_TAG.label}»`}
            >
              {NESTED_TAG.label}
            </Badge>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>
            Flat tags · interactive dismiss · Property: categoryPath=unset
          </p>
          {tags.length > 0 ? (
            <>
              <ShowcaseMatrix
                columns={tags}
                rows={[
                  {
                    cells: tags.map((label) => (
                      <Badge
                        key={label}
                        onDismiss={() => removeTag(label)}
                        dismissLabel={`Зняти «${label}»`}
                      >
                        {label}
                      </Badge>
                    )),
                  },
                ]}
              />
              <p className={styles.hint}>Активні: {tags.join(", ")}</p>
            </>
          ) : (
            <ShowcasePreview className={styles.preview}>
              <p className={styles.hint}>
                Усі теги знято — перезавантаж сторінку showcase.
              </p>
            </ShowcasePreview>
          )}
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          description="React API Badge + пов’язаний Tooltip."
        >
          <ShowcaseDocPropertiesTable rows={PROPERTY_ROWS} />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="token-usage"
          description="Токени Badge.module.css та Tooltip (categoryPath)."
        >
          <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="accessibility">
          <ShowcaseDocBulletList
            items={[
              "Dismiss — нативна <button type=\"button\"> з aria-label={dismissLabel}.",
              "Іконка × — aria-hidden; текст тега в .label.",
              "categoryPath: aria-describedby зв’язує тег з tooltip id.",
              "Tooltip видимий при :hover / :focus-within на .wrapper.",
              "Focus dismiss: outline --border-focus на :focus-visible.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "onDismiss обов’язковий — × завжди доступний для зняття тега",
              "categoryPath — повний шлях категорій для breadcrumb у tooltip",
              "Фон --surface-badge; hover через CSS на .root",
            ]}
            dont={[
              "Не плутай з Filter Chip — там вибір фільтра без ×",
              "Не додавай Figma Status=Hover як окремий проп",
              "Не хардкодуй 32px — min-height через --size-xlarge",
            ]}
            alternatives={[
              {
                label: "Filter Chip",
                path: "filter-chip",
                note: "фільтр без dismiss",
              },
              { label: "Tag", path: "tag", note: "статичний лейбл без ×" },
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="related-components"
          description="Споріднені та типові комбінації."
        >
          <ShowcaseDocRelated
            related={[
              { label: "Tag", path: "tag" },
              { label: "Filter Chip", path: "filter-chip" },
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

export function BadgeShowcase() {
  return (
    <ShowcaseThemeProvider>
      <BadgeShowcasePage />
    </ShowcaseThemeProvider>
  );
}
