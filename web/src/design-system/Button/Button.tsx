import { useId } from "react";
import type { ButtonProps } from "./Button.types";
import { ButtonIconArrowRight, ButtonIconMenu } from "./ButtonIcons";
import styles from "./Button.module.css";

function getThemeClass(
  variant: ButtonProps["variant"],
  theme: ButtonProps["theme"],
): string {
  if (theme === "special") {
    return styles.special;
  }

  const key =
    variant === "primary"
      ? theme === "light"
        ? "primaryLight"
        : "primaryDark"
      : theme === "light"
        ? "secondaryLight"
        : "secondaryDark";

  return styles[key];
}

export function Button({
  children,
  variant,
  theme,
  disabled = false,
  leftIcon,
  rightIcon,
  showLeftIcon = true,
  showRightIcon = true,
  htmlType = "button",
  className,
  ...rest
}: ButtonProps) {
  const isSpecial = theme === "special";
  const gradientId = useId().replace(/:/g, "");
  const themeClass = getThemeClass(variant, theme);
  const rootClass = [styles.root, themeClass, className].filter(Boolean).join(" ");
  const labelClass = isSpecial
    ? `${styles.label} ${styles.specialLabel}`
    : styles.label;

  const iconGradient = isSpecial && !disabled ? gradientId : undefined;
  const iconClass = styles.icon;

  const renderLeft =
    showLeftIcon &&
    (leftIcon ?? (
      <ButtonIconMenu className={iconClass} gradientId={iconGradient} />
    ));

  const renderRight =
    showRightIcon &&
    (rightIcon ?? (
      <ButtonIconArrowRight className={iconClass} gradientId={iconGradient} />
    ));

  return (
    <button
      type={htmlType}
      className={rootClass}
      disabled={disabled}
      {...rest}
    >
      {isSpecial && !disabled ? (
        <svg className={styles.gradientDefs} aria-hidden>
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FDD07F" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
        </svg>
      ) : null}
      {renderLeft}
      <span className={labelClass}>{children}</span>
      {renderRight}
    </button>
  );
}
