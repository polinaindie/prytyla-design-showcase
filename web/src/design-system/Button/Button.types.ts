import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

/**
 * Visual variant (Figma `type`). Named `variant` to avoid clashing with
 * the native `<button type="...">` attribute — use `htmlType` for that.
 */
export type ButtonVariant = "primary" | "secondary" | "contact";

/** Surface context (Figma `theme`). `special` is donate CTA only. */
export type ButtonTheme = "light" | "dark" | "special";

/** Contact chip content (Figma ContactLink `type`). */
export type ButtonContactType = "email" | "phone";

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
};

type ButtonElementProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children" | "disabled"
>;

/**
 * primary/secondary × light/dark. `theme: "special"` is excluded (see ButtonSpecialProps).
 */
export type ButtonStandardProps = ButtonPropsBase & {
  variant: "primary" | "secondary";
  theme: "light" | "dark";
} & ButtonElementProps;

/**
 * Donate CTA («Долучитись»). Only `primary` + `special` — `secondary` + `special` is a type error.
 */
export type ButtonSpecialProps = ButtonPropsBase & {
  variant: "primary";
  theme: "special";
} & ButtonElementProps;

/**
 * Contact chip (Figma ContactLink) — email/phone link on light or dark surfaces.
 * Renders as `<a>`; `href` is required.
 */
export type ButtonContactProps = ButtonPropsBase & {
  variant: "contact";
  theme: "light" | "dark";
  contactType: ButtonContactType;
  href: string;
  /** Phone only — prefix label (e.g. «Гаряча лінія:»). */
  contactLabel?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "type"
>;

export type ButtonProps =
  | ButtonStandardProps
  | ButtonSpecialProps
  | ButtonContactProps;
