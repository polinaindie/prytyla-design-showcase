import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useShowcaseViewport } from "../ShowcaseViewportContext";
import { showcaseViewportFrameStyle } from "./showcaseViewportFrame";
import styles from "./ShowcasePreview.module.css";

type ShowcasePreviewProps = {
  children: ReactNode;
  inverse?: boolean;
  /** No inner padding — full-bleed section previews (SubPageHero, etc.). */
  flush?: boolean;
  className?: string;
};

function measureFitScale(outer: HTMLElement, viewportWidth: number): number {
  const available = outer.clientWidth;
  if (available <= 0 || available >= viewportWidth) return 1;
  return available / viewportWidth;
}

export function ShowcasePreview({
  children,
  inverse = false,
  flush = false,
  className,
}: ShowcasePreviewProps) {
  const { viewportWidth, typographyMode } = useShowcaseViewport();
  const outerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const frame = frameRef.current;
    if (!outer || !frame) return;

    const sync = () => {
      outer.scrollLeft = 0;
      outer.scrollTop = 0;
      const scale = measureFitScale(outer, viewportWidth);
      setFitScale(scale);
      setScaledHeight(scale < 1 ? frame.offsetHeight * scale : undefined);
    };

    sync();
    const outerObserver = new ResizeObserver(sync);
    outerObserver.observe(outer);
    const frameObserver = new ResizeObserver(sync);
    frameObserver.observe(frame);

    return () => {
      outerObserver.disconnect();
      frameObserver.disconnect();
    };
  }, [viewportWidth, children]);

  const rootClass = [
    styles.preview,
    flush ? styles.previewFlush : "",
    inverse ? styles.previewInverse : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const frameStyle: CSSProperties = {
    ...showcaseViewportFrameStyle(viewportWidth),
    ...(fitScale < 1
      ? {
          transform: `scale(${fitScale})`,
          transformOrigin: "top left",
        }
      : {}),
  };

  const scalerStyle: CSSProperties | undefined =
    fitScale < 1
      ? {
          width: viewportWidth * fitScale,
          height: scaledHeight,
        }
      : undefined;

  const outerClass = [
    styles.previewOuter,
    fitScale < 1 ? styles.previewOuterScaled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={outerRef} className={outerClass}>
      <div className={styles.previewScaler} style={scalerStyle}>
        <div
          ref={frameRef}
          className={rootClass}
          style={frameStyle}
          data-showcase-typography={typographyMode}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
