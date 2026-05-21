import { Accordion, AccordionItem } from "../../design-system/Accordion";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  ShowcaseToolbar,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./AccordionShowcase.module.css";

const QUICK_EXAMPLE = `import { Accordion, AccordionItem } from '@/design-system/Accordion';

<Accordion>
  <AccordionItem id="partnership" question="Наша компанія хоче бути партнером фонду, куди звернутись?">
    <p>Відповідь…</p>
  </AccordionItem>
</Accordion>`;

const ITEM_PROPS = [
  { name: "question", type: "string", required: true, description: "Заголовок (Figma question)." },
  { name: "children", type: "ReactNode", required: true, description: "Контент відповіді (answer)." },
  { name: "id", type: "string", description: "Id для Accordion-групи (один відкритий)." },
  { name: "open / defaultOpen / onToggle", type: "boolean / fn", description: "Контрольований або локальний стан." },
];

const ACCORDION_PROPS = [
  {
    name: "allowMultiple",
    type: "boolean",
    default: "false",
    description: "Кілька відкритих пунктів одночасно.",
  },
  { name: "children", type: "AccordionItem[]", required: true, description: "Пункти FAQ." },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Surface", name: "--accent-highlight", usedIn: "Hover + Opened (#fff5c5)" },
  { category: "Text", name: "--text-default", usedIn: "Question, answer" },
  {
    category: "Border",
    name: "--border-strong, --border-width-small",
    usedIn: "Top/bottom rules",
  },
  {
    category: "Typography",
    name: "--pryt-brand-font-size-600 / 400",
    usedIn: "H4 question 24px, body 16px",
  },
  {
    category: "Layout",
    name: "--space-large, --space-2xlarge, --space-medium",
    usedIn: "Padding 16/24px, answer indent 12px",
  },
];

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

function AccordionShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Accordion"
        description="FAQ-акордеон (Figma Accordeon 292:5029): Default, Hover і Opened. Один відкритий пункт у групі Accordion."
      >
        <ShowcaseToolbar showSearch={false} />

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="FAQ list"
          description="Наведи на заголовок — Hover. Клік — Opened + контент."
        >
          <div className={styles.list}>
            <Accordion>
              <AccordionItem
                id="partnership"
                question="Наша компанія хоче бути партнером фонду, куди звернутись?"
              >
                {DEMO_ANSWER}
              </AccordionItem>
              <AccordionItem
                id="donate"
                question="Як підтримати фонд донатом?"
              >
                <p>
                  Перейдіть на сторінку донату або скористайтесь кнопкою «Задонатити»
                  у меню сайту.
                </p>
              </AccordionItem>
              <AccordionItem
                id="reports"
                question="Де переглянути звітність?"
              >
                <p>
                  Річні звіти та прозорість фонду — у розділі «Звітність фонду».
                </p>
              </AccordionItem>
            </Accordion>
          </div>
          <p className={styles.hint}>max-width 920px (Figma desktop)</p>
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Accordion props">
          <ShowcasePropsTable props={ACCORDION_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="AccordionItem props">
          <ShowcasePropsTable props={ITEM_PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Обгортай пункти в <Accordion> для одного відкритого FAQ.",
              "Передавай стабільний id на кожен AccordionItem у групі.",
              "Відповідь — ReactNode (параграфи, списки, посилання).",
            ]}
            dont={[
              "НЕ додавай props state/variant — Hover і Opened лише в CSS/логіці.",
              "НЕ хардкодуй жовтий фон — --accent-highlight.",
              "НЕ вкладай кнопки в заголовок — клік лише на header.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
