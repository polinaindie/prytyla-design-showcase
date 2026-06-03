import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { useShowcaseViewport } from "../ShowcaseViewportContext";
import {
  typographyModeForWidth,
  type ShowcaseTypographyMode,
} from "../showcaseTypography";
import { showcaseViewportFrameStyle } from "./showcaseViewportFrame";
import styles from "./ShowcasePreview.module.css";

type ShowcasePreviewProps = {
  children: ReactNode;
  inverse?: boolean;
  /** No inner padding — full-bleed section previews (SubPageHero, etc.). */
  flush?: boolean;
  /** Pin frame to showcase viewport width (sections). Default: same as `flush`. */
  constrainWidth?: boolean;
  /** Override global showcase viewport (e.g. Live preview toolbar). */
  viewportWidth?: number;
  className?: string;
  /** Ref на `div.preview` (напр. articleScrollContainerRef у General Widget). */
  previewRef?: RefObject<HTMLDivElement | null>;
  /** Висота за контентом; scaler не обрізає overflow по вертикалі. */
  scrollable?: boolean;
};

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };
}

function measureFitScale(outer: HTMLElement, viewportWidth: number): number {
  const available = outer.clientWidth;
  if (available <= 0 || available >= viewportWidth) return 1;
  return available / viewportWidth;
}

export function ShowcasePreview({
  children,
  inverse = false,
  flush = false,
  constrainWidth = flush,
  viewportWidth: viewportWidthProp,
  className,
  previewRef,
  scrollable = false,
}: ShowcasePreviewProps) {
  const { viewportWidth: contextWidth, typographyMode: contextTypographyMode } =
    useShowcaseViewport();
  const viewportWidth = viewportWidthProp ?? contextWidth;
  const ownsViewportFrame = constrainWidth || viewportWidthProp !== undefined;
  const typographyMode: ShowcaseTypographyMode = ownsViewportFrame
    ? typographyModeForWidth(viewportWidth)
    : contextTypographyMode;
  const outerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const frame = frameRef.current;
    if (!outer || !frame) return;

    const sync = () => {
      if (!scrollable) {
        outer.scrollLeft = 0;
        outer.scrollTop = 0;
      }
      const scale = constrainWidth ? measureFitScale(outer, viewportWidth) : 1;
      setFitScale(scale);
      const frameHeight = frame.offsetHeight;
      setScaledHeight(
        scrollable || scale < 1 ? frameHeight * scale : undefined,
      );
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
  }, [viewportWidth, children, constrainWidth, scrollable]);

  const rootClass = [
    styles.preview,
    flush ? styles.previewFlush : "",
    inverse ? styles.previewInverse : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const frameStyle: CSSProperties = {
    ...(ownsViewportFrame ? showcaseViewportFrameStyle(viewportWidth, { constrainWidth }) : {}),
    ...(fitScale < 1
      ? {
          transform: `scale(${fitScale})`,
          transformOrigin: scrollable ? "top center" : "top left",
        }
      : {}),
  };

  const scalerStyle: CSSProperties | undefined =
    scrollable || fitScale < 1
      ? {
          width: viewportWidth * fitScale,
          height: scaledHeight,
          ...(scrollable ? { marginInline: "auto" } : {}),
        }
      : undefined;

  const outerClass = [
    styles.previewOuter,
    fitScale < 1 ? styles.previewOuterScaled : "",
    scrollable ? styles.previewOuterScrollable : "",
  ]
    .filter(Boolean)
    .join(" ");

  const scalerClass = [
    styles.previewScaler,
    scrollable ? styles.previewScalerScrollable : "",
    scrollable ? styles.previewScalerScrollableScaled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={outerRef} className={outerClass}>
      <div className={scalerClass} style={scalerStyle}>
        <div
          ref={mergeRefs(frameRef, previewRef)}
          className={rootClass}
          style={frameStyle}
          {...(ownsViewportFrame
            ? { "data-showcase-typography": typographyMode }
            : {})}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
