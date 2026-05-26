import { useState } from "react";
import { LinkCard } from "../../design-system/LinkCard";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcaseMatrix,
  ShowcasePageLayout,
  ShowcasePropsTable,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  type TokenUsage,
  useShowcaseTheme,
} from "../primitives";
import styles from "./LinkCardShowcase.module.css";

const QUICK_EXAMPLE = `import { LinkCard } from '@/design-system/LinkCard';

<LinkCard
  href="/reports"
  title="Звітність фонду"
  illustration="annualReports"
  size="desktop"
/>`;

const PROPS = [
  { name: "title", type: "string", required: true, description: "Підпис картки." },
  {
    name: "illustration",
    type: "Illustration3DVariant",
    required: true,
    description: "3D-ілюстрація зліва.",
  },
  {
    name: "size",
    type: '"desktop" | "mobile"',
    default: '"desktop"',
    description: "Desktop — зі стрілкою; mobile — компактна без стрілки.",
  },
  { name: "href", type: "string", required: true, description: "URL посилання." },
];

const TOKENS_USED: TokenUsage[] = [
  {
    category: "Color",
    name: "--accent-primary",
    usedIn: "Текст і стрілка (Figma text/accent)",
  },
  {
    category: "Surface",
    name: "--surface-page",
    usedIn: "Hover (Figma section-warm ≈ orange-20)",
  },
  {
    category: "Typography",
    name: "--font-size-body-large, --font-size-caption",
    usedIn: "Desktop 20px / mobile 12px",
  },
  {
    category: "Layout",
    name: "--space-6xlarge, --radius-large, --radius-medium",
    usedIn: "Padding, radius",
  },
];

function LinkCardShowcasePage() {
  const { theme } = useShowcaseTheme();
  const [copied, setCopied] = useState(false);

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
        title="Link Card"
        description="Картка-посилання з 3D-ілюстрацією. Figma Link card (40:12193)."
      >

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} />
          <button type="button" onClick={handleCopy}>
            Copy snippet
          </button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Розміри"
          description="Наведи на desktop — hover (фон + менша ілюстрація). Mobile без стрілки."
        >
          <ShowcaseMatrix
            columns={["Desktop", "Mobile"]}
            rows={[
              {
                cells: [
                  <LinkCard
                    href="#"
                    title="Звітність фонду"
                    illustration="annualReports"
                    size="desktop"
                  />,
                  <LinkCard
                    href="#"
                    title="Звітність"
                    illustration="annualReports"
                    size="mobile"
                  />,
                ],
              },
            ]}
          />
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
              "Hover — CSS (:hover), фон --surface-page.",
              "Desktop — Icon/40/Arrow-Left (у Figma вказує вправо); mobile без стрілки.",
            ]}
            dont={[
              "Не додавай prop state=\"Hover\" — лише інтерактивний hover.",
              "Не підставляй raw img замість Illustration3D.",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
    </div>
  );
}

export function LinkCardShowcase() {
  return (
    <ShowcaseThemeProvider>
      <LinkCardShowcasePage />
    </ShowcaseThemeProvider>
  );
}
