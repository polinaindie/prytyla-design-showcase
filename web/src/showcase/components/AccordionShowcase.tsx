import { useMemo } from "react";
import { Accordion, AccordionItem } from "../../design-system/Accordion";
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
import styles from "./AccordionShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=292-5029";

const LIVE_PREVIEW_CODE = `import { Accordion, AccordionItem } from "@/design-system/Accordion";

<Accordion>
  <AccordionItem id="partnership" question="…">
    {answer}
  </AccordionItem>
</Accordion>`;

const DEMO_ANSWER = (
  <>
    <p>
      Для ознайомлення з процедурою та проєктами, будь ласка, оберіть сторінку{" "}
      <a href="#partnership">Партнерства</a>. Щоб сконтактувати з нами ви можете
      обрати будь-який зручний для вас варіант:
    </p>
    <ol>
      <li>Заповнити відповідну форму у розділі Партнерства</li>
      <li>
        Надіслати листа на пошту{" "}
        <a href="mailto:partnership@prytulafoundation.org">
          partnership@prytulafoundation.org
        </a>
      </li>
    </ol>
  </>
);

const PROPERTY_ROWS: DocPropertyRow[] = [
  {
    property: "Accordion.allowMultiple",
    type: "boolean",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Кілька відкритих пунктів одночасно.",
  },
  {
    property: "Accordion.children",
    type: "AccordionItem[]",
    typeKind: "INSTANCE_SWAP",
    optionsDefault: "—",
    description: "Пункти FAQ.",
  },
  {
    property: "AccordionItem.question",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Заголовок (Figma question).",
  },
  {
    property: "AccordionItem.children",
    type: "ReactNode",
    typeKind: "TEXT",
    optionsDefault: "required",
    description: "Контент відповіді (answer).",
  },
  {
    property: "AccordionItem.id",
    type: "string",
    typeKind: "TEXT",
    optionsDefault: "auto",
    description: "Id для Accordion-групи (один відкритий).",
  },
  {
    property: "open / defaultOpen / onToggle",
    type: "boolean / fn",
    typeKind: "BOOLEAN",
    optionsDefault: "false",
    description: "Контрольований або локальний стан поза групою.",
  },
];

const TOKEN_USAGE_SAMPLE = [
  { element: "Item", property: "background (hover/open)", token: "--accent-highlight" },
  { element: "Item", property: "border", token: "--border-strong" },
  { element: "Question", property: "color", token: "--text-default" },
  { element: "Question", property: "font-size", token: "--font-size-heading-h4" },
  { element: "Answer", property: "font-size", token: "--font-size-body-medium" },
  { element: "Header", property: "padding", token: "--space-2xlarge, --space-large" },
  { element: "Panel", property: "padding-left", token: "--space-medium" },
  { element: "Focus", property: "outline", token: "--border-focus" },
] as const;

function FaqList() {
  return (
    <Accordion>
      <AccordionItem
        id="partnership"
        question="Наша компанія хоче бути партнером фонду, куди звернутись?"
      >
        {DEMO_ANSWER}
      </AccordionItem>
      <AccordionItem id="donate" question="Як підтримати фонд донатом?">
        <p>
          Перейдіть на сторінку донату або скористайтесь кнопкою «Задонатити» у
          меню сайту.
        </p>
      </AccordionItem>
      <AccordionItem id="reports" question="Де переглянути звітність?">
        <p>Річні звіти та прозорість фонду — у розділі «Звітність фонду».</p>
      </AccordionItem>
    </Accordion>
  );
}

function AccordionShowcasePage() {
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
        title="Accordion"
        description="FAQ-акордеон: Default, Hover і Opened; один відкритий пункт у групі."
        status="stable"
        version="1.0"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="live-preview"
          description="Типовий FAQ-блок; max-width 920px (Figma desktop)."
        >
          <ShowcaseDocLivePreview
            caption="Accordion group · один open · hover на заголовку — CSS."
            code={LIVE_PREVIEW_CODE}
            constrainWidth
          >
            <div className={styles.list}>
              <FaqList />
            </div>
          </ShowcaseDocLivePreview>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="variants-gallery"
          description="Окремий пункт: closed / opened (без групи)."
        >
          <p className={styles.galleryCaption}>
            AccordionItem · defaultOpen=false / true
          </p>
          <ShowcasePreview className={styles.singleList}>
            <AccordionItem question="Закритий пункт (Default)">
              <p>Контент прихований.</p>
            </AccordionItem>
            <AccordionItem question="Відкритий пункт (Opened)" defaultOpen>
              <p>Контент видимий; фон --accent-highlight.</p>
            </AccordionItem>
          </ShowcasePreview>

          <p className={styles.galleryCaption}>FAQ list · 3 items</p>
          <ShowcasePreview constrainWidth className={styles.list}>
            <FaqList />
          </ShowcasePreview>
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
              "Header — <button> з aria-expanded, aria-controls.",
              "Panel — role=region, aria-labelledby, hidden коли закритий.",
              "Chevron — aria-hidden; стан через aria-expanded.",
              "Keyboard: Tab до header, Enter/Space toggle.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDocUsageGuidelines
            do={[
              "Обгортай пункти в <Accordion> для одного відкритого FAQ",
              "Стабільний id на кожен AccordionItem у групі",
              "Відповідь — ReactNode (параграфи, списки, посилання)",
            ]}
            dont={[
              "Не додавай props state/variant — Hover/Opened у CSS",
              "Не хардкодуй жовтий фон — --accent-highlight",
              "Не вкладай кнопки в заголовок",
            ]}
            alternatives={[]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="related-components">
          <ShowcaseDocRelated
            usedWith={[
              { label: "Footer", path: "footer" },
              { label: "Sub Page Hero", path: "sub-page-hero" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function AccordionShowcase() {
  return (
    <ShowcaseThemeProvider>
      <AccordionShowcasePage />
    </ShowcaseThemeProvider>
  );
}
