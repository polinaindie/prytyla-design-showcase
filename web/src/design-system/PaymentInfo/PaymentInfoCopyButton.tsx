import { useEffect, useState } from "react";
import { IconCopy20 } from "../Icons";
import styles from "./PaymentInfo.module.css";

const COPIED_FEEDBACK_MS = 2000;

type PaymentInfoCopyButtonProps = {
  text: string;
  ariaLabel?: string;
};

export function PaymentInfoCopyButton({
  text,
  ariaLabel,
}: PaymentInfoCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  };

  const label = ariaLabel ?? `Копіювати: ${text}`;

  return (
    <button
      type="button"
      className={[styles.copyButton, copied && styles.copyButtonCopied]
        .filter(Boolean)
        .join(" ")}
      onClick={handleCopy}
      aria-label={copied ? "Скопійовано" : label}
    >
      {copied ? (
        <span className={styles.copyFeedback} role="status" aria-live="polite">
          скопійовано
        </span>
      ) : (
        <IconCopy20 size={20} aria-hidden />
      )}
    </button>
  );
}
