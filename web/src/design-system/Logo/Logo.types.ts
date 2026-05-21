export type LogoLanguage = "en" | "uk";

export type LogoProps = {
  language: LogoLanguage;
  className?: string;
  /** Accessible name; defaults per language */
  alt?: string;
  /** Rendered height in px; width follows aspect ratio */
  height?: number;
  "aria-hidden"?: boolean;
};
