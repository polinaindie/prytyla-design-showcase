import { IconArrowUpRight, IconMenu } from "../Icons";
import styles from "./Button.module.css";

type IconProps = {
  className?: string;
  /** When set, stroke uses this SVG gradient (Special theme only — DS icons use fill). */
  gradientId?: string;
};

/** Figma Icon/24/Menu — re-export from Icons; gradient fallback for Special. */
export function ButtonIconMenu({ className, gradientId }: IconProps) {
  if (gradientId) {
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

  return <IconMenu className={className ?? styles.icon} size={24} />;
}

type SocialIconProps = {
  className?: string;
  theme: "light" | "dark";
};

/** Social link — Facebook (Figma Icon/Social, 24px). */
export function ButtonIconFacebook({ className, theme }: SocialIconProps) {
  if (theme === "light") {
    return (
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="12" cy="12" r="11" fill="var(--accent-primary)" />
        <path
          d="M13.2 12.5h2.3l.4-2.6h-2V8.9c0-.7.2-1.2 1.2-1.2h1.4V5.2c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2h-1.9v2.6h1.9v6.3h2.7v-6.3Z"
          fill="var(--text-inverse)"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14.2 12.9h2.5l.4-2.7h-2.2V8.5c0-.8.1-1.4 1.4-1.4h1.2V4.8c-.2 0-1.1-.1-2.1-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H9.5v2.7h2.5v7h3.1v-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Nav control — chevron left (Figma Icon/10/Arrow-Left). */
export function ButtonIconNavArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.25 2.5 3.75 5l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Nav control — chevron right (Figma Icon/10/Arrow-Right). */
export function ButtonIconNavArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M3.75 2.5 6.25 5l-2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Contact chip — envelope (Figma Email Icon, 20px). */
export function ButtonIconEnvelope({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 5.833 10 10.833l7.5-5M2.5 5.833h15v8.334h-15V5.833Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Contact chip — phone (Figma Phone Icon, 20px). */
export function ButtonIconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.5 3.5h2.2l1.1 2.7-1.4 1.4a9.5 9.5 0 0 0 3.7 3.7l1.4-1.4 2.7 1.1v2.2a1.5 1.5 0 0 1-1.5 1.5C7.2 14.7 5.3 12.8 3.5 11A11.5 11.5 0 0 1 4 5.5 1.5 1.5 0 0 1 5.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma Icon/24/Arrow-Up-Right — re-export from Icons; gradient fallback for Special. */
export function ButtonIconArrowRight({ className, gradientId }: IconProps) {
  if (gradientId) {
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

  return <IconArrowUpRight className={className ?? styles.icon} size={24} />;
}
