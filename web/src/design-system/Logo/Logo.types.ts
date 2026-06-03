export type LogoLanguage = "en" | "uk";

/** `inverse` — single-color white (e.g. footer dark card). */
export type LogoVariant = "default" | "inverse";

export type LogoProps = {
  language: LogoLanguage;
  /** `inverse` renders the full-color asset as white via CSS filter. */
  variant?: LogoVariant;
  className?: string;
  /** Accessible name; defaults per language */
  alt?: string;
  /** Rendered height in px; width follows aspect ratio */
  height?: number;
  "aria-hidden"?: boolean;
};
