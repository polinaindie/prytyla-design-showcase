import { SubTag, Tag } from "../../design-system/Tag";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcasePreview,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./TagShowcase.module.css";

const QUICK_EXAMPLE = `import { SubTag, Tag } from '@/design-system/Tag';

<Tag>Гуманітарний</Tag>
<SubTag>Проєкт</SubTag>`;

const TAG_PROPS = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Текст тега (Figma Tag Label).",
  },
  {
    name: "className",
    type: "string",
    description: "Додатковий клас на <span>.",
  },
];

const SUBTAG_PROPS = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Текст (Figma SubTag, напр. «Проєкт»).",
  },
  {
    name: "className",
    type: "string",
    description: "Додатковий клас на <span>.",
  },
];

const TAG_TOKENS: TokenUsage[] = [
  {
    category: "Surface",
    name: "--surface-badge",
    usedIn: "Default (#e7e7e7, Figma surface/tag-default)",
  },
  {
    category: "Surface",
    name: "--surface-subtle-info",
    usedIn: "Hover (#ceecff, Figma surface/tag-info)",
  },
  { category: "Text", name: "--text-muted", usedIn: "Label (#5d5d5d)" },
  {
    category: "Typography",
    name: "--font-size-body-small",
    usedIn: "Body small 14px",
  },
  {
    category: "Layout",
    name: "--space-xsmall, --space-small, --radius-round",
    usedIn: "Padding 4×8px, pill radius",
  },
];

const SUBTAG_TOKENS: TokenUsage[] = [
  {
    category: "Text",
    name: "--text-muted",
    usedIn: "Default (#5d5d5d, Figma text/secondary)",
  },
  {
    category: "Text",
    name: "--text-default",
    usedIn: "Hover / Variant2 (#1f1f1f, Figma text/dark) + underline",
  },
  {
    category: "Typography",
    name: "--font-size-body-small",
    usedIn: "Body small 14px",
  },
  {
    category: "Layout",
    name: "--border-width-small",
    usedIn: "Separator 1px",
  },
];

const TAG_EXAMPLES = ["Гуманітарний", "Освіта", "Медицина", "Завершено"];

function TagShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Tag"
        description="Tag (3:7429) — pill з hover. SubTag (3:7422) — текстова мітка, підкреслення на hover. Для toggle-фільтрів — Filter Chip."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection title="Tag" description="Figma 3:7429 — Default · Hover.">
          <ShowcasePreview>
            <Tag>Tag Label</Tag>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Tag — examples">
          <ShowcaseMatrix
            columns={TAG_EXAMPLES}
            rows={[
              {
                cells: TAG_EXAMPLES.map((label) => <Tag key={label}>{label}</Tag>),
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Tag — tokens">
          <ShowcaseTokensList tokens={TAG_TOKENS} />
        </ShowcaseSection>

        <ShowcaseSection title="Tag — props">
          <ShowcasePropsTable props={TAG_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection
          title="SubTag"
          description="Figma 3:7422 — Default · Hover (Variant2 у Figma, наведи курсор)."
        >
          <ShowcasePreview>
            <SubTag>Проєкт</SubTag>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="SubTag — tokens">
          <ShowcaseTokensList tokens={SUBTAG_TOKENS} />
        </ShowcaseSection>

        <ShowcaseSection title="SubTag — props">
          <ShowcasePropsTable props={SUBTAG_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Tag — категорії з pill-фоном; hover → блакитний.",
              "SubTag — вторинна мітка (напр. «Проєкт»); hover → підкреслення.",
            ]}
            dont={[
              "НЕ плутай Tag з Badge, Filter Chip або SubTag.",
              "НЕ додавай variant/active — у Figma лише Default + Hover.",
              "НЕ хардкодуй кольори чи 1px лінії поза токенами.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
