import { MainProject } from "../../design-system/MainProject";
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
import styles from "./MainProjectShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=3-7322";

const DEMO_IMAGE = "/showcase/main-project-demo.jpg";

const QUICK_EXAMPLE = `import { MainProject } from '@/design-system/MainProject';

<MainProject
  href="/projects/unified-fundraising"
  donateHref="https://donate.example.org/unified"
  imageSrc="/media/hero-dragon.jpg"
  title="Єдинозбір"
  description="Купуємо дрони-перехоплювачі…"
  progress={69}
  collectedAmount="571 819 486 ₴"
  goalAmount="1 000 000 000 ₴"
  size="desktop"
/>`;

const PROPS = [
  { name: "href", type: "string", required: true, description: "Сторінка збору." },
  { name: "donateHref", type: "string", required: true, description: "Зовнішній донат." },
  { name: "imageSrc", type: "string", required: true, description: "Hero background." },
  { name: "title", type: "string", required: true, description: "H0." },
  { name: "description", type: "string", required: true, description: "Body large, inverse." },
  { name: "progress", type: "number", required: true, description: "0–100." },
  { name: "collectedAmount", type: "string", required: true, description: "Сума зібрано." },
  { name: "goalAmount", type: "string", required: true, description: "Ціль." },
  {
    name: "size",
    type: '"desktop" | "tablet" | "mobile"',
    default: '"desktop"',
    description: "Figma Size.",
  },
];

const TOKENS_USED: TokenUsage[] = [
  { category: "Surface", name: "--surface-glass-strong, --surface-action", usedIn: "Glass panel / CTA" },
  { category: "Text", name: "--text-on-inverse, --text-default, --text-secondary", usedIn: "Hero / stats" },
  { category: "Progress", name: "ProgressBar", usedIn: "Збір" },
  {
    category: "Typography",
    name: "--font-size-heading-h0, --font-size-body-large, --font-size-body-medium",
    usedIn: "Hero type",
  },
  {
    category: "Layout",
    name: "--space-large, --space-medium, --space-2xlarge, --space-3xlarge, --radius-large",
    usedIn: "Padding, gaps",
  },
];

const DEMO = {
  href: "/projects/unified-fundraising",
  donateHref: "https://donate.example.org/unified",
  imageSrc: DEMO_IMAGE,
  imageAlt: "Єдинозбір — hero",
  title: "Єдинозбір",
  description:
    "Купуємо дрони-перехоплювачі Шахедів та комплектуємо екіпажі операторів необхідним обладнанням",
  progress: 69,
  collectedAmount: "571 819 486 ₴",
  goalAmount: "1 000 000 000 ₴",
} as const;

function MainProjectShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Main Project"
        description={`Головний hero активного збору (Figma Main project 3:7322). Назва в коді: MainProject. Figma: ${FIGMA_URL}`}
      >
        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Desktop — hover: zoom фото + підкреслення H0. href / donateHref як у ProjectCard."
        >
          <ShowcasePreview className={styles.preview}>
            <MainProject {...DEMO} />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Sizes">
          <ShowcaseMatrix
            columns={["Desktop", "Tablet", "Mobile"]}
            rows={[
              {
                cells: [
                  <MainProject key="d" {...DEMO} size="desktop" />,
                  <MainProject key="t" {...DEMO} size="tablet" />,
                  <MainProject key="m" {...DEMO} size="mobile" />,
                ],
              },
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "href — сторінка збору; donateHref — зовнішній платіж (target=_blank)",
              "Desktop hover — scale(1.1) + underline title, @media (hover: hover)",
              "Glass panel — var(--surface-glass-strong)",
            ]}
            dont={[
              "Не плутати з ProjectCard (картка в сітці проєктів)",
              "Не вкладати <a> в <a> — overlay + окрема кнопка донату",
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function MainProjectShowcase() {
  return (
    <ShowcaseThemeProvider>
      <MainProjectShowcasePage />
    </ShowcaseThemeProvider>
  );
}
