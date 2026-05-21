import { useEffect, useState } from "react";
import styles from "./ShowcaseCodeBlock.module.css";

type ShowcaseCodeBlockProps = {
  code: string;
  language?: string;
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function ShowcaseCodeBlock({ code, language = "tsx" }: ShowcaseCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    const ok = await copyText(code);
    if (ok) setCopied(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {copied ? <span className={styles.feedback}>Copied!</span> : null}
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          Copy
        </button>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code} data-language={language}>
          {code}
        </code>
      </pre>
    </div>
  );
}
