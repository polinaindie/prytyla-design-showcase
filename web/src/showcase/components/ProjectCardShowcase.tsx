import { ProjectCard } from "../../design-system/ProjectCard";
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
import styles from "./ProjectCardShowcase.module.css";

const FIGMA_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive?node-id=16-9982";

const DEMO_IMAGE = "/showcase/project-card-demo.jpg";

const QUICK_EXAMPLE = `import { ProjectCard } from '@/design-system/ProjectCard';

<ProjectCard
  href="/projects/jaws"
  donateHref="https://donate.example.org/jaws"
  imageSrc="/media/jaws.jpg"
  title="Щелепи"
  description="Смерть приходить з неба…"
  progress={69}
  collectedAmount="48 388 780 ₴"
  goalAmount="20 000 000 ₴"
  size="desktop"
/>`;

const PROPS = [
  { name: "href", type: "string", required: true, description: "Сторінка проєкту (клік по картці)." },
  {
    name: "donateHref",
    type: "string",
    required: true,
    description: "Зовнішній донат (кнопка, target=_blank).",
  },
  { name: "imageSrc", type: "string", required: true, description: "Обкладинка проєкту." },
  { name: "imageAlt", type: "string", description: "Alt зображення." },
  { name: "title", type: "string", required: true, description: "H3." },
  { name: "description", type: "string", required: true, description: "Body medium." },
  { name: "progress", type: "number", required: true, description: "0–100, ProgressBar." },
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
  { category: "Surface", name: "--surface-default, --surface-action", usedIn: "Картка / CTA" },
  { category: "Border", name: "--border-default", usedIn: "Обводка" },
  {
    category: "Text",
    name: "--text-default, --text-muted, --text-secondary, --text-on-action",
    usedIn: "Заголовок, підписи, CTA",
  },
  {
    category: "Progress",
    name: "ProgressBar (--accent-primary, neutral-200 track)",
    usedIn: "Секція збору",
  },
  {
    category: "Typography",
    name: "--font-display, --font-size-heading-h3, --font-size-body-medium, --font-size-caption",
    usedIn: "H3 / body / labels",
  },
  {
    category: "Layout",
    name: "--space-large, --space-xlarge, --space-3xlarge, --space-4xlarge, --spacing-card-progress-gap, --radius-large, --radius-round",
    usedIn: "Padding, gaps, radius",
  },
];

const DEMO = {
  href: "/projects/jaws",
  donateHref: "https://donate.example.org/jaws",
  imageSrc: DEMO_IMAGE,
  imageAlt: "Збір Щелепи",
  title: "Щелепи",
  description:
    "Смерть приходить з неба і в неї гострі зуби. Наша ціль — зібрати 500 млн. грн на БПЛА Shark-M та високоточні українські баражуючі боєприпаси.",
  progress: 69,
  collectedAmount: "48 388 780 ₴",
  goalAmount: "20 000 000 ₴",
} as const;

function ProjectCardShowcasePage() {
  const { theme } = useShowcaseTheme();

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Project Card"
        description={`Картка активного проєкту зі збором (Figma 16:9982). href — сторінка проєкту; donateHref — зовнішній донат. Figma: ${FIGMA_URL}`}
      >
        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Live preview"
          description="Desktop/Tablet — hover: zoom фото + підкреслення заголовка (desktop). Клік → href; кнопка → donateHref."
        >
          <ShowcasePreview className={styles.preview}>
            <ProjectCard {...DEMO} />
          </ShowcasePreview>
        </ShowcaseSection>

        <ShowcaseSection title="Sizes" description="Desktop, Tablet, Mobile (Figma).">
          <ShowcaseMatrix
            columns={["Desktop", "Tablet", "Mobile"]}
            rows={[
              {
                cells: [
                  <ProjectCard key="d" {...DEMO} size="desktop" />,
                  <ProjectCard key="t" {...DEMO} size="tablet" />,
                  <ProjectCard key="m" {...DEMO} size="mobile" />,
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
              "href — внутрішня сторінка проєкту; donateHref — зовнішній платіжний ресурс (rel=noopener)",
              "У продукті: target=\"_blank\" на donate вже в компоненті",
              "Hover zoom фото — desktop/tablet + @media (hover: hover); підкреслення title — desktop",
            ]}
            dont={[
              "Не вкладати другий <a> всередину без donateHref — overlay + окрема кнопка",
              "Не замінюйте ProgressBar сирим div без токенів",
            ]}
          />
        </ShowcaseSection>

        <ShowcaseSection title="Props API">
          <ShowcasePropsTable props={PROPS} />
        </ShowcaseSection>

        <ShowcaseSection title="Accessibility">
          <p>
            Overlay <code>&lt;a href&gt;</code> з <code>aria-label</code> (за замовчуванням — title).
            Кнопка донату — окреме посилання з видимим текстом. Focus ring —{" "}
            <code>--border-focus</code>.
          </p>
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function ProjectCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <ProjectCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
