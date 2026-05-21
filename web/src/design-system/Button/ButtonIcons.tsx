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
