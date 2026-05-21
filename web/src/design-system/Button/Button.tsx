import { useId } from "react";
import {
  IconArrowLeft10,
  IconArrowRight10,
  IconArrowUpRight,
  IconEmail20,
  IconMenu,
  IconPhone20,
  IconSocialFacebook,
} from "../Icons";
import type {
  ButtonContactProps,
  ButtonNavProps,
  ButtonProps,
  ButtonSocialProps,
} from "./Button.types";
import styles from "./Button.module.css";

/** Special theme: stroke icons with linear gradient (DS 24px icons use fill). */
function ButtonSpecialGradientMenu({
  className,
  gradientId,
}: {
  className?: string;
  gradientId: string;
}) {
  return (
    <svg
      className={className ?? styles.icon}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 9h14M5 15h14"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ButtonSpecialGradientArrow({
  className,
  gradientId,
}: {
  className?: string;
  gradientId: string;
}) {
  return (
    <svg
      className={className ?? styles.icon}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 12h12m0 0-4-4m4 4-4 4"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getThemeClass(props: ButtonProps): string {
  if (props.variant === "contact") {
    return props.theme === "light" ? styles.contactLight : styles.contactDark;
  }

  if (props.variant === "nav") {
    return props.navAppearance === "ghost" ? styles.navGhost : styles.navOutline;
  }

  if (props.variant === "social") {
    return props.theme === "light" ? styles.socialLight : styles.socialDark;
  }

  if (props.theme === "special") {
    return styles.special;
  }

  const key =
    props.variant === "primary"
      ? props.theme === "light"
        ? "primaryLight"
        : "primaryDark"
      : props.theme === "light"
        ? "secondaryLight"
        : "secondaryDark";

  return styles[key];
}

function isContactProps(props: ButtonProps): props is ButtonContactProps {
  return props.variant === "contact";
}

function isNavProps(props: ButtonProps): props is ButtonNavProps {
  return props.variant === "nav";
}

function isSocialProps(props: ButtonProps): props is ButtonSocialProps {
  return props.variant === "social";
}

export function Button(props: ButtonProps) {
  if (isContactProps(props)) {
    return <ButtonContact {...props} />;
  }

  if (isSocialProps(props)) {
    return <ButtonSocial {...props} />;
  }

  if (isNavProps(props)) {
    return <ButtonNav {...props} />;
  }

  const {
    children,
    theme,
    disabled = false,
    leftIcon,
    rightIcon,
    showLeftIcon = true,
    showRightIcon = true,
    htmlType = "button",
    className,
    ...rest
  } = props;

  const isSpecial = theme === "special";
  const gradientId = useId().replace(/:/g, "");
  const themeClass = getThemeClass(props);
  const rootClass = [styles.root, themeClass, className].filter(Boolean).join(" ");
  const labelClass = isSpecial
    ? `${styles.label} ${styles.specialLabel}`
    : styles.label;

  const iconGradient = isSpecial && !disabled ? gradientId : undefined;
  const iconClass = styles.icon;

  const renderLeft =
    showLeftIcon &&
    (leftIcon ??
      (iconGradient ? (
        <ButtonSpecialGradientMenu
          className={iconClass}
          gradientId={iconGradient}
        />
      ) : (
        <IconMenu className={iconClass} size={24} />
      )));

  const renderRight =
    showRightIcon &&
    (rightIcon ??
      (iconGradient ? (
        <ButtonSpecialGradientArrow
          className={iconClass}
          gradientId={iconGradient}
        />
      ) : (
        <IconArrowUpRight className={iconClass} size={24} />
      )));

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

function ButtonNav({
  children,
  navAppearance = "outline",
  active = false,
  disabled = false,
  leftIcon,
  rightIcon,
  showLeftIcon = true,
  showRightIcon = true,
  htmlType = "button",
  className,
  ...rest
}: ButtonNavProps) {
  const themeClass = getThemeClass({
    variant: "nav",
    navAppearance,
    children,
  });
  const rootClass = [styles.root, styles.nav, themeClass, className]
    .filter(Boolean)
    .join(" ");

  const renderLeft =
    showLeftIcon &&
    (leftIcon ?? <IconArrowLeft10 className={styles.navIcon} size={10} />);

  const renderRight =
    showRightIcon &&
    (rightIcon ?? <IconArrowRight10 className={styles.navIcon} size={10} />);

  return (
    <button
      type={htmlType}
      className={rootClass}
      disabled={disabled}
      data-active={active || undefined}
      aria-current={active ? "true" : undefined}
      {...rest}
    >
      {renderLeft}
      <span className={styles.navLabel}>{children}</span>
      {renderRight}
    </button>
  );
}

function ButtonContact({
  children,
  theme,
  contactType,
  contactLabel,
  href,
  disabled = false,
  className,
  ...rest
}: ButtonContactProps) {
  const themeClass = getThemeClass({
    variant: "contact",
    theme,
    contactType,
    href,
    children,
  });
  const rootClass = [styles.root, styles.contact, themeClass, className]
    .filter(Boolean)
    .join(" ");

  const icon =
    contactType === "email" ? (
      <IconEmail20 className={styles.contactIcon} size={20} />
    ) : (
      <IconPhone20 className={styles.contactIcon} size={20} />
    );

  return (
    <a
      href={disabled ? undefined : href}
      className={rootClass}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className={styles.contactContent}>
        {contactType === "phone" && contactLabel ? (
          <span className={styles.contactLabel}>{contactLabel}</span>
        ) : null}
        <span className={styles.contactValue}>{children}</span>
      </span>
      {icon}
    </a>
  );
}

function ButtonSocial({
  theme,
  socialNetwork,
  href,
  className,
  ...rest
}: ButtonSocialProps) {
  const themeClass = getThemeClass({
    variant: "social",
    theme,
    socialNetwork,
    href,
    "aria-label": rest["aria-label"],
  });
  const rootClass = [styles.root, styles.social, themeClass, className]
    .filter(Boolean)
    .join(" ");

  const icon =
    socialNetwork === "facebook" ? (
      <IconSocialFacebook className={styles.socialIcon} size={24} />
    ) : null;

  return (
    <a href={href} className={rootClass} {...rest}>
      {icon}
    </a>
  );
}
