import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Visual variant (Figma `type`). Named `variant` to avoid clashing with
 * the native `<button type="...">` attribute — use `htmlType` for that.
 */
export type ButtonVariant = "primary" | "secondary";

/** Surface context (Figma `theme`). `special` is donate CTA only. */
export type ButtonTheme = "light" | "dark" | "special";

/** Native `<button type>` — not the visual variant. */
export type ButtonHtmlType = "button" | "submit" | "reset";

type ButtonPropsBase = {
  children: ReactNode;
  /** @default false */
  disabled?: boolean;
  /** Slot overrides; component supplies default placeholders when omitted. */
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** @default true */
  showLeftIcon?: boolean;
  /** @default true */
  showRightIcon?: boolean;
  /**
   * TODO(design-system): theme=special should use Icon/Vprytyl on the right.
   * MVP: same arrow icon as other buttons. Export SVG → web/public/icons/.
   */
  htmlType?: ButtonHtmlType;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children" | "disabled"
>;

/**
 * primary/secondary × light/dark. `theme: "special"` is excluded (see ButtonSpecialProps).
 */
export type ButtonStandardProps = ButtonPropsBase & {
  variant: ButtonVariant;
  theme: "light" | "dark";
};

/**
 * Donate CTA («Долучитись»). Only `primary` + `special` — `secondary` + `special` is a type error.
 */
export type ButtonSpecialProps = ButtonPropsBase & {
  variant: "primary";
  theme: "special";
};

export type ButtonProps = ButtonStandardProps | ButtonSpecialProps;
