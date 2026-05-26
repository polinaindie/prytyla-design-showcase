import { useState } from "react";
import { Badge } from "../../design-system/Badge";
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
import styles from "./BadgeShowcase.module.css";

const DEMO_TAGS = ["Щелепи", "Освіта", "Медицина"];

const NESTED_TAG = {
  label: "Літакового типу",
  path: [
    "Ударні БПЛА",
    "FPV-перехоплювачі",
    "Літакового типу",
  ] as const,
};

const QUICK_EXAMPLE = `import { Badge } from '@/design-system/Badge';

<Badge
  categoryPath={['Ударні БПЛА', 'FPV-перехоплювачі', 'Літакового типу']}
  onDismiss={() => removeTag(id)}
>
  Літакового типу
</Badge>`;

const PROPS = [
  {
    name: "children",
    type: "ReactNode",
    required: true,
    description: "Текст тега.",
  },
  {
    name: "onDismiss",
    type: "() => void",
    required: true,
    description: "Клік по × знімає тег.",
  },
  {
    name: "dismissLabel",
    type: "string",
    default: '"Зняти"',
    description: "aria-label для кнопки закриття.",
  },
  {
    name: "categoryPath",
    type: "readonly string[]",
    description:
      "Ланцюжок категорій для tooltip при hover (Figma 1318:54224). Без пропа — звичайний тег.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Surface",
    name: "--surface-badge",
    usedIn: "Фон тега",
  },
  {
    category: "Surface",
    name: "--surface-subtle-neutral",
    usedIn: "Hover фону",
  },
  { category: "Color", name: "--text-default", usedIn: "Label + іконка" },
  {
    category: "Typography",
    name: "--font-size-body-small",
    usedIn: "Body small 14px",
  },
  {
    category: "Layout",
    name: "--space-small, --space-medium, --space-xsmall",
    usedIn: "Gap, padding",
  },
  { category: "Radius", name: "--radius-medium", usedIn: "8px кути" },
  { category: "Size", name: "--size-xlarge", usedIn: "min-height 32px" },
  {
    category: "Surface",
    name: "--surface-default, --border-default",
    usedIn: "Tooltip panel",
  },
];

function BadgeShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [tags, setTags] = useState(DEMO_TAGS);
  const [copied, setCopied] = useState(false);

  const removeTag = (label: string) => {
    setTags((prev) => prev.filter((t) => t !== label));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(QUICK_EXAMPLE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      {copied ? (
        <p className={styles.toast} aria-live="polite">
          Copied!
        </p>
      ) : null}

      <ShowcasePageLayout
        title="Badge"
        description="Тег із закриттям. Figma Badge (1318:54208). Окремо від Filter Chip — пізніше можна уніфікувати патерни."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Категорія з ієрархією"
          description="Наведи на тег — tooltip з шляхом вищих категорій (Figma Tooltip 1318:54224)."
        >
          <ShowcasePreview>
            <Badge
              categoryPath={NESTED_TAG.path}
              onDismiss={() => {}}
              dismissLabel={`Зняти «${NESTED_TAG.label}»`}
            >
              {NESTED_TAG.label}
            </Badge>
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection
          title="Інтерактивно"
          description="Плоскі теги без categoryPath. × знімає пункт."
        >
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
            <ShowcasePreview>
              <p className={styles.hint}>
                Усі теги знято — перезавантаж сторінку showcase.
              </p>
            </ShowcasePreview>
          )}
        </ShowcaseSection>

        <ShowcaseSection title="Props">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Фон — --surface-badge; hover — CSS на .root.",
              "categoryPath — повний breadcrumb; tooltip з’являється при hover на обгортку.",
              "Закриття лише через onDismiss на ×.",
            ]}
            dont={[
              "Не плутай з Filter Chip — там вибір фільтра без ×.",
              "Не додавай Figma Status=Hover як проп.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
