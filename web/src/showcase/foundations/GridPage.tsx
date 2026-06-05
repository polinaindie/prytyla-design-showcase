import { useMemo, useState, type ReactNode } from "react";
import {
  ShowcaseCodeBlock,
  ShowcaseDocBulletList,
  ShowcaseDocLivePreview,
  ShowcaseDocPage,
  ShowcaseDocPropertiesTable,
  ShowcaseDocRelated,
  ShowcaseDocSection,
  ShowcaseDocTokenUsageTable,
  ShowcaseDoDont,
  ShowcaseThemeProvider,
  showcaseViewportName,
  showcaseViewportWidth,
  type ShowcaseViewportId,
  useShowcaseTheme,
} from "../primitives";
import styles from "./GridPage.module.css";
import { useCssVarValues } from "../tokens/useCssVarValues";

const FIGMA_FILE_URL =
  "https://www.figma.com/design/hiAQiy4aRZQiwD1S4jekxY/Prytula-Responsive";

const GRID_TOKEN_VARS = [
  "--grid-gutter",
  "--grid-columns-mobile",
  "--grid-columns-tablet",
  "--grid-columns-desktop",
  "--container-tablet",
  "--container-desktop",
  "--container-desktop-xl",
] as const;

const TOKEN_USAGE_SAMPLE = [
  { element: ".grid", property: "gap", token: "--grid-gutter" },
  {
    element: ".grid",
    property: "grid-template-columns",
    token: "--grid-columns-mobile",
  },
  {
    element: ".grid (tablet)",
    property: "grid-template-columns",
    token: "--grid-columns-tablet",
  },
  {
    element: ".grid (desktop)",
    property: "grid-template-columns",
    token: "--grid-columns-desktop",
  },
  { element: ".container", property: "max-width", token: "--container-tablet" },
  { element: ".container", property: "max-width", token: "--container-desktop" },
  {
    element: ".container",
    property: "max-width",
    token: "--container-desktop-xl",
  },
] as const;

const GRID_PROPERTIES = [
  {
    property: "Breakpoints",
    type: "layout",
    optionsDefault: "768 / 1024 / 1920px",
    description: "У @media — hardcoded px; решта розмірів через CSS variables.",
  },
  {
    property: "Columns",
    type: "responsive",
    optionsDefault: "4 / 8 / 12",
    description: "Mobile, tablet, desktop — --grid-columns-* на .grid.",
  },
  {
    property: "Gutter",
    type: "token",
    optionsDefault: "--grid-gutter",
    description: "Відстань між колонками (24px у поточній збірці).",
  },
  {
    property: "Container",
    type: "token",
    optionsDefault: "--container-*",
    description: "max-width на .container; центрування margin-inline: auto.",
  },
  {
    property: "Utilities",
    type: "class",
    optionsDefault: ".container · .grid · .col-span-N",
    description: "Імпорт grid.css у застосунку; не дублюй layout у flex для page shell.",
  },
];

type BreakpointId = "mobile" | "tablet" | "desktop" | "desktopXl";

type BreakpointMeta = {
  id: BreakpointId;
  label: string;
  range: string;
  columns: number;
  container: string;
  minWidth: number;
};

const BREAKPOINTS: BreakpointMeta[] = [
  {
    id: "mobile",
    label: "Mobile",
    range: "< 768px",
    columns: 4,
    container: "fluid до 343px",
    minWidth: 0,
  },
  {
    id: "tablet",
    label: "Tablet",
    range: "768–1023px",
    columns: 8,
    container: "760px",
    minWidth: 768,
  },
  {
    id: "desktop",
    label: "Desktop",
    range: "1024–1919px",
    columns: 12,
    container: "1440px",
    minWidth: 1024,
  },
  {
    id: "desktopXl",
    label: "Desktop XL",
    range: "≥ 1920px",
    columns: 12,
    container: "1920px",
    minWidth: 1920,
  },
];

function resolveBreakpoint(width: number): BreakpointMeta {
  if (width >= 1920) return BREAKPOINTS[3];
  if (width >= 1024) return BREAKPOINTS[2];
  if (width >= 768) return BREAKPOINTS[1];
  return BREAKPOINTS[0];
}

function resolveColumns(width: number): number {
  return resolveBreakpoint(width).columns;
}

type ExampleFrameProps = {
  label: string;
  frameClass: string;
  children: ReactNode;
};

function ExampleFrame({ label, frameClass, children }: ExampleFrameProps) {
  return (
    <div className={styles.examplePreview}>
      <p className={styles.frameLabel}>{label}</p>
      <div className={`${styles.frame} ${frameClass}`}>{children}</div>
    </div>
  );
}

type LayoutExampleProps = {
  title: string;
  code: string;
  mobile: React.ReactNode;
  tablet: React.ReactNode;
  desktop: React.ReactNode;
};

function LayoutExample({ title, code, mobile, tablet, desktop }: LayoutExampleProps) {
  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>{title}</h3>
      <div className={styles.exampleRow}>
        <ExampleFrame label="Mobile (4 col)" frameClass={styles.frameMobile}>
          <div className="grid">{mobile}</div>
        </ExampleFrame>
        <ExampleFrame label="Tablet (8 col)" frameClass={styles.frameTablet}>
          <div className="grid">{tablet}</div>
        </ExampleFrame>
        <ExampleFrame label="Desktop (12 col)" frameClass="">
          <div className="grid">{desktop}</div>
        </ExampleFrame>
        <div className={styles.exampleCode}>
          <ShowcaseCodeBlock code={code} language="tsx" />
        </div>
      </div>
    </div>
  );
}

function GridOverlay({ width }: { width: number }) {
  const columns = resolveColumns(width);
  const bp = resolveBreakpoint(width);

  return (
    <div className={styles.overlayViewport}>
      <p className={styles.overlayMeta}>
        <span>
          Ширина зони: <strong>{Math.round(width)}px</strong>
        </span>
        <span>
          Breakpoint: <strong>{bp.label}</strong> ({bp.range})
        </span>
        <span>
          Колонок: <strong>{columns}</strong>
        </span>
      </p>
      <div className="container">
        <div
          className={styles.overlayGridInner}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {Array.from({ length: columns }, (_, index) => (
            <div key={index} className={styles.overlayCol}>
              <span className={styles.overlayColLabel}>{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GridPageContent() {
  const { theme } = useShowcaseTheme();
  const [previewViewportId, setPreviewViewportId] =
    useState<ShowcaseViewportId>("1440");

  const previewWidth = showcaseViewportWidth(previewViewportId);
  const activeBp = useMemo(
    () => resolveBreakpoint(previewWidth),
    [previewWidth],
  );

  const usageValues = useCssVarValues(GRID_TOKEN_VARS);

  const tokenUsageRows = TOKEN_USAGE_SAMPLE.map((row) => ({
    ...row,
    value: usageValues[row.token] ?? "—",
  }));

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcaseDocPage
        title="Grid"
        description="Центрований контейнер і 4 / 8 / 12 колонки з gutter 24px. Breakpoints 768 / 1024 / 1920px — у @media; решта — CSS variables з tokens.css."
        status="stable"
        updatedAt="2026-05-22"
        figmaUrl={FIGMA_FILE_URL}
        showViewportBar={false}
      >
        <ShowcaseDocSection
          section="variants-gallery"
          title="Grid gallery"
          description="Breakpoints, live overlay і приклади col-span. Центрований .container — margin-inline: auto."
        >
          <div className={styles.galleryPart}>
            <h3 className={styles.gallerySubheading}>Breakpoints</h3>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Breakpoint</th>
                    <th scope="col">Range</th>
                    <th scope="col">Columns</th>
                    <th scope="col">Container</th>
                    <th scope="col">Gutter</th>
                  </tr>
                </thead>
                <tbody>
                  {BREAKPOINTS.map((row) => (
                    <tr key={row.id}>
                      <td>{row.label}</td>
                      <td>{row.range}</td>
                      <td>{row.columns}</td>
                      <td>{row.container}</td>
                      <td>24px</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.galleryPart}>
            <h3 className={styles.gallerySubheading}>Live grid overlay</h3>
            <p className={styles.galleryLead}>
              Ширина frame — перемикачі Wide desktop … Mobile; колонки та
              container за breakpoint 768 / 1024 / 1920.
            </p>
            <ShowcaseDocLivePreview
              caption={`${showcaseViewportName(previewViewportId)} (${previewWidth}px) · ${activeBp.label} · ${activeBp.columns} cols · container ${activeBp.container}.`}
              previewViewport
              previewViewportId={previewViewportId}
              onPreviewViewportChange={setPreviewViewportId}
              previewFrameWidth={previewWidth}
            >
              <div className={styles.overlayPanel}>
                <GridOverlay width={previewWidth} />
              </div>
            </ShowcaseDocLivePreview>
          </div>

          <div className={styles.galleryPart}>
            <h3 className={styles.gallerySubheading}>Layout examples</h3>
            <p className={styles.galleryLead}>
              Окремі preview на mobile / tablet / desktop — col-span під breakpoint.
            </p>
            <div className={styles.exampleList}>
              <LayoutExample
                title="Full width"
                code={`<div className="col-span-4">  {/* mobile */}
<div className="col-span-8">  {/* tablet */}
<div className="col-span-12"> {/* desktop */}`}
                mobile={
                  <div className={`col-span-4 ${styles.exampleCell}`}>col-span-4</div>
                }
                tablet={
                  <div className={`col-span-8 ${styles.exampleCell}`}>col-span-8</div>
                }
                desktop={
                  <div className={`col-span-12 ${styles.exampleCell}`}>col-span-12</div>
                }
              />

              <LayoutExample
                title="Half / Half"
                code={`<div className="col-span-2">…</div>  {/* mobile 2+2 */}
<div className="col-span-4">…</div>  {/* tablet */}
<div className="col-span-6">…</div>  {/* desktop */}`}
                mobile={
                  <>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                  </>
                }
                tablet={
                  <>
                    <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                    <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                  </>
                }
                desktop={
                  <>
                    <div className={`col-span-6 ${styles.exampleCell}`}>6</div>
                    <div className={`col-span-6 ${styles.exampleCell}`}>6</div>
                  </>
                }
              />

              <LayoutExample
                title="Thirds"
                code={`col-span-4 (desktop) · col-span-2 (tablet, 3×) · col-span-2 (mobile, 2+1 wrap)`}
                mobile={
                  <>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                  </>
                }
                tablet={
                  <>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                  </>
                }
                desktop={
                  <>
                    <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                    <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                    <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                  </>
                }
              />

              <LayoutExample
                title="Sidebar layout"
                code={`Sidebar col-span-4 + main col-span-8 (desktop)`}
                mobile={
                  <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                }
                tablet={
                  <>
                    <div className={`col-span-2 ${styles.exampleCell}`}>2</div>
                    <div className={`col-span-6 ${styles.exampleCell}`}>6</div>
                  </>
                }
                desktop={
                  <>
                    <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                    <div className={`col-span-8 ${styles.exampleCell}`}>8</div>
                  </>
                }
              />

              <LayoutExample
                title="Card grid"
                code={`3× col-span-4 на desktop; 2× col-span-2 mobile`}
                mobile={
                  <>
                    <div className={`col-span-2 ${styles.exampleCell}`}>Card</div>
                    <div className={`col-span-2 ${styles.exampleCell}`}>Card</div>
                  </>
                }
                tablet={
                  <>
                    <div className={`col-span-2 ${styles.exampleCell}`}>Card</div>
                    <div className={`col-span-2 ${styles.exampleCell}`}>Card</div>
                    <div className={`col-span-2 ${styles.exampleCell}`}>Card</div>
                  </>
                }
                desktop={
                  <>
                    <div className={`col-span-4 ${styles.exampleCell}`}>Card</div>
                    <div className={`col-span-4 ${styles.exampleCell}`}>Card</div>
                    <div className={`col-span-4 ${styles.exampleCell}`}>Card</div>
                  </>
                }
              />
            </div>
          </div>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="properties"
          title="Properties & token usage"
          description="Breakpoints і CSS variables для layout utilities."
        >
          <div className={styles.propertiesStack}>
            <ShowcaseDocPropertiesTable rows={GRID_PROPERTIES} />
            <ShowcaseDocTokenUsageTable rows={tokenUsageRows} />
          </div>
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="accessibility"
          description="Сітка впливає на порядок читання та передбачуваність layout."
        >
          <ShowcaseDocBulletList
            items={[
              "DOM-порядок колонок має відповідати візуальному порядку читання (особливо sidebar + main).",
              "Не покладайтесь лише на колір комірок overlay — підписи breakpoint обов'язкові.",
              "На вузьких viewport перевіряй col-span: mobile має максимум 4 колонки.",
              "Горизонтальний scroll сторінки через overflow на .container — анти-патерн.",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection section="usage-guidelines">
          <ShowcaseDoDont
            do={[
              "Завжди обгортай сторінку у .container",
              "Використовуй .grid + .col-span-N для розкладки",
              "Думай mobile-first (4 col → 8 col → 12 col)",
            ]}
            dont={[
              "НЕ хардкодуй ширини контейнера у px",
              "НЕ використовуй .col-span-12 на mobile (там лише 4 колонки)",
              "НЕ змішуй grid з flex для page layout",
            ]}
          />
        </ShowcaseDocSection>

        <ShowcaseDocSection
          section="related-components"
          description="Інші foundation-сторінки."
        >
          <ShowcaseDocRelated
            links={[
              { label: "Colors", path: "colors" },
              { label: "Typography", path: "typography" },
              { label: "Spacing", path: "spacing" },
              { label: "Radius", path: "radius" },
            ]}
          />
        </ShowcaseDocSection>
      </ShowcaseDocPage>
    </div>
  );
}

export function GridPage() {
  return (
    <ShowcaseThemeProvider>
      <GridPageContent />
    </ShowcaseThemeProvider>
  );
}
