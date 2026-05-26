import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ShowcaseCodeBlock,
  ShowcaseDoDont,
  ShowcasePageLayout,
  ShowcaseSection,
  ShowcaseThemeProvider,
  ShowcaseTokensList,
  useShowcaseTheme,
  type TokenUsage,
} from "../primitives";
import styles from "./GridPage.module.css";

const QUICK_EXAMPLE = `<div className="container">
  <div className="grid">
    <div className="col-span-12">Full width</div>
    <div className="col-span-6">Half</div>
    <div className="col-span-6">Half</div>
  </div>
</div>`;

const TOKENS_USED: TokenUsage[] = [
  { category: "Grid", name: "--grid-gutter", usedIn: "Gap між колонками (24px)" },
  {
    category: "Grid",
    name: "--grid-columns-mobile / tablet / desktop",
    usedIn: "Кількість колонок .grid",
  },
  {
    category: "Grid",
    name: "--container-mobile",
    usedIn: "Mobile — fluid до 343px (документовано; cap у макеті)",
  },
  { category: "Grid", name: "--container-tablet", usedIn: "Tablet max-width 760px" },
  { category: "Grid", name: "--container-desktop", usedIn: "Desktop max-width 1440px" },
  {
    category: "Grid",
    name: "--container-desktop-xl",
    usedIn: "Desktop XL max-width 1920px",
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlayWidth, setOverlayWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 375,
  );
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 375,
  );

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const node = overlayRef.current;
    if (!node) return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setOverlayWidth(entry.contentRect.width);
    });

    observer.observe(node);
    setOverlayWidth(node.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, []);

  const activeBp = resolveBreakpoint(viewportWidth);

  return (
    <div className={styles.pageRoot} data-showcase-theme={theme}>
      <ShowcasePageLayout
        title="Grid System"
        description="Центрований контейнер і 4 / 8 / 12 колонки з gutter 24px. Breakpoints 768 / 1024 / 1920px — у @media (hardcoded); решта — CSS variables з tokens.css."
      >

        <p className={styles.viewportBanner} aria-live="polite">
          Current viewport: <strong>{viewportWidth}px</strong> → {activeBp.label} (
          {activeBp.columns} cols, container {activeBp.container})
        </p>

        <ShowcaseSection title="Quick example">
          <ShowcaseCodeBlock code={QUICK_EXAMPLE} language="tsx" />
        </ShowcaseSection>

        <ShowcaseSection
          title="Breakpoints"
          description="Center grid — контент центрується через margin-inline: auto на .container."
        >
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Breakpoint</th>
                  <th>Range</th>
                  <th>Columns</th>
                  <th>Container</th>
                  <th>Gutter</th>
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
        </ShowcaseSection>

        <ShowcaseSection
          title="Live grid overlay"
          description="Контейнер на всю ширину preview; колонки та gutter відповідають поточній ширині (ResizeObserver)."
        >
          <div className={styles.overlayPanel} ref={overlayRef}>
            <GridOverlay width={overlayWidth} />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Examples"
          description="Окремі preview на mobile / tablet / desktop — col-span під кількість колонок breakpoint."
        >
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
                <>
                  <div className={`col-span-4 ${styles.exampleCell}`}>4</div>
                </>
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
        </ShowcaseSection>

        <ShowcaseSection title="Tokens used">
          <ShowcaseTokensList tokens={TOKENS_USED} />
        </ShowcaseSection>

        <ShowcaseSection title="Guidelines">
          <ShowcaseDoDont
            do={[
              "Завжди обгортай сторінку у .container",
              "Використовуй .grid + .col-span-N для розкладки",
              "Думай mobile-first (4 col → 8 col → 12 col)",
            ]}
            dont={[
              "НЕ хардкодуй ширини у px",
              "НЕ використовуй .col-span-12 на mobile (там тільки 4 колонки)",
              "НЕ змішуй grid з flex для page layout",
            ]}
          />
        </ShowcaseSection>
      </ShowcasePageLayout>
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
