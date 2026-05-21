import styles from "./Button.module.css";

type IconProps = {
  className?: string;
  /** When set, stroke uses this SVG gradient (Special theme). */
  gradientId?: string;
};

/** Placeholder until DS icon set ships (Figma Icon/24/*). */
export function ButtonIconMenu({ className, gradientId }: IconProps) {
  const stroke = gradientId ? `url(#${gradientId})` : "currentColor";

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
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
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

/** Placeholder until DS icon set ships (Figma Icon/24/Arrow-Left rotated). */
export function ButtonIconArrowRight({ className, gradientId }: IconProps) {
  const stroke = gradientId ? `url(#${gradientId})` : "currentColor";

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
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
