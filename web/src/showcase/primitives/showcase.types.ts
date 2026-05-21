/** Row for ShowcasePropsTable */
export type PropsConfig = {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
};

/** Row for ShowcaseTokensList */
export type TokenUsage = {
  /** CSS variable, e.g. "--surface-action" */
  name: string;
  /** Where it applies in the component/showcase */
  usedIn: string;
  /** Optional resolved value for display (e.g. from tokens.css comment) */
  value?: string;
  /** Group heading, e.g. "Surface", "Typography" */
  category?: string;
};

/** Bullet for ShowcaseDoDont */
export type Guideline = {
  text: string;
};

export type ShowcaseThemeMode = "light" | "dark";
