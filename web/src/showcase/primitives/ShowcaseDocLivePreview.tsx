import { useEffect, useState, type ReactNode, type RefObject } from "react";
import type { ShowcaseViewportId } from "../ShowcaseViewportContext";
import { showcaseViewportWidth } from "../ShowcaseViewportContext";
import { ShowcasePreview } from "./ShowcasePreview";
import {
  ShowcaseDocSizeSwitch,
  type ShowcaseDocSizeOption,
  type ShowcaseDocSwitchOption,
} from "./ShowcaseDocSizeSwitch";
import { ShowcaseDocViewportSwitch } from "./ShowcaseDocViewportSwitch";
import styles from "./ShowcaseDocLivePreview.module.css";

type ShowcaseDocLivePreviewProps = {
  children: ReactNode;
  /** e.g. "Default variant. Selected=False." */
  caption: string;
  /** JSX/TS snippet — enables Copy code in the preview toolbar */
  code?: string;
  /** Show full code block under the caption (default: only when user expands) */
  defaultShowCode?: boolean;
  inverse?: boolean;
  flush?: boolean;
  constrainWidth?: boolean;
  /** Controlled Figma Size preview (desktop / tablet / mobile). */
  previewSize?: ShowcaseDocSizeOption;
  onPreviewSizeChange?: (size: ShowcaseDocSizeOption) => void;
  previewSizeOptions?: readonly ShowcaseDocSizeOption[];
  /** Custom labeled preview modes (e.g. News Card matrix columns). */
  previewValue?: string;
  onPreviewValueChange?: (value: string) => void;
  previewLabeledOptions?: readonly ShowcaseDocSwitchOption<string>[];
  /** Live preview frame width (1920 … 375). Pass `true` for internal state. */
  previewViewport?: boolean;
  previewViewportId?: ShowcaseViewportId;
  onPreviewViewportChange?: (id: ShowcaseViewportId) => void;
  /** Ширина frame (px); якщо не задано — як viewport toggle (напр. картка 329 при toggle 375). */
  previewFrameWidth?: number;
  /** Ref на ShowcasePreview `.preview` + внутрішній скрол (напр. General Widget article morph). */
  previewRef?: RefObject<HTMLDivElement | null>;
  previewClassName?: string;
  scrollablePreview?: boolean;
  /** Кнопки / контроли поруч із View code (напр. демо анімації). */
  previewActions?: ReactNode;
  /** Додаткові перемикачі зліва в toolbar (перед viewport / size). */
  toolbarSwitchesExtra?: ReactNode;
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function ShowcaseDocLivePreview({
  children,
  caption,
  code,
  defaultShowCode = false,
  inverse = false,
  flush = false,
  constrainWidth,
  previewSize,
  onPreviewSizeChange,
  previewSizeOptions,
  previewValue,
  onPreviewValueChange,
  previewLabeledOptions,
  previewViewport = false,
  previewViewportId,
  onPreviewViewportChange,
  previewFrameWidth,
  previewRef,
  previewClassName,
  scrollablePreview = false,
  previewActions,
  toolbarSwitchesExtra,
}: ShowcaseDocLivePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [codeOpen, setCodeOpen] = useState(defaultShowCode);
  const [internalViewportId, setInternalViewportId] =
    useState<ShowcaseViewportId>("1440");

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopyCode = async () => {
    if (!code) return;
    const ok = await copyText(code);
    if (ok) setCopied(true);
  };

  const showLabeledSwitch =
    previewValue !== undefined &&
    onPreviewValueChange !== undefined &&
    previewLabeledOptions !== undefined &&
    previewLabeledOptions.length > 0;
  const showSizeSwitch =
    !showLabeledSwitch &&
    previewSize !== undefined &&
    onPreviewSizeChange !== undefined;
  const isViewportControlled =
    previewViewportId !== undefined && onPreviewViewportChange !== undefined;
  const showViewportSwitch = previewViewport || isViewportControlled;
  const activeViewportId = isViewportControlled
    ? previewViewportId
    : internalViewportId;
  const setActiveViewportId = isViewportControlled
    ? onPreviewViewportChange
    : setInternalViewportId;
  const activeViewportWidth = showViewportSwitch
    ? showcaseViewportWidth(activeViewportId)
    : undefined;
  const activeFrameWidth = previewFrameWidth ?? activeViewportWidth;

  const showLeftSwitches =
    Boolean(toolbarSwitchesExtra) || showSizeSwitch || showViewportSwitch;
  const showToolbarActions =
    showLabeledSwitch || Boolean(code) || Boolean(previewActions);
  const showToolbar = showLeftSwitches || showToolbarActions;

  return (
    <div className={styles.wrap}>
      <div className={styles.previewShell}>
        {showToolbar ? (
          <div className={styles.toolbar}>
            {showLeftSwitches ? (
              <div className={styles.toolbarSwitches}>
                {toolbarSwitchesExtra}
                {showViewportSwitch ? (
                  <ShowcaseDocViewportSwitch
                    value={activeViewportId}
                    onChange={setActiveViewportId}
                  />
                ) : null}
                {showSizeSwitch ? (
                  <ShowcaseDocSizeSwitch
                    value={previewSize}
                    onChange={onPreviewSizeChange}
                    options={previewSizeOptions}
                  />
                ) : null}
              </div>
            ) : null}
            {showToolbarActions ? (
              <div className={styles.toolbarActions}>
                {showLabeledSwitch ? (
                  <ShowcaseDocSizeSwitch
                    value={previewValue}
                    onChange={onPreviewValueChange}
                    labeledOptions={previewLabeledOptions}
                  />
                ) : null}
                {previewActions}
                {code ? (
                  <>
                    <button
                      type="button"
                      className={styles.toolbarButton}
                      onClick={() => setCodeOpen((open) => !open)}
                      aria-expanded={codeOpen}
                    >
                      {codeOpen ? "Hide code" : "View code"}
                    </button>
                    <button
                      type="button"
                      className={styles.toolbarButton}
                      onClick={handleCopyCode}
                    >
                      {copied ? "Copied!" : "Copy code"}
                    </button>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        <ShowcasePreview
          inverse={inverse}
          flush={flush}
          constrainWidth={constrainWidth ?? showViewportSwitch}
          viewportWidth={activeFrameWidth}
          previewRef={previewRef}
          className={previewClassName}
          scrollable={scrollablePreview}
        >
          <div
            className={
              scrollablePreview ? styles.frameScrollable : styles.frame
            }
          >
            {children}
          </div>
        </ShowcasePreview>
      </div>
      <p className={styles.caption}>{caption}</p>
      {code && codeOpen ? (
        <pre className={styles.codeBlock}>
          <code>{code}</code>
        </pre>
      ) : null}
    </div>
  );
}
