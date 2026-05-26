import { Illustration3D } from "../Illustration3D";
import { LinkCard } from "../LinkCard";
import type { SubPageHeroProps } from "./SubPageHero.types";
import styles from "./SubPageHero.module.css";

const DEFAULT_IMAGE_ILLUSTRATION = "humanitarianProjects" as const;

export function SubPageHero(props: SubPageHeroProps) {
  const {
    variant,
    title,
    description,
    showTitle = true,
    showDescription = true,
    background = "orange",
    className,
    ...rest
  } = props;

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  const illustrationVariant =
    props.variant === "image"
      ? (props.illustration ?? DEFAULT_IMAGE_ILLUSTRATION)
      : DEFAULT_IMAGE_ILLUSTRATION;

  return (
    <div className={styles.shell}>
    <section
      className={rootClass}
      data-variant={variant}
      data-background={background}
      aria-labelledby={showTitle ? "subpage-hero-title" : undefined}
      {...rest}
    >
      <div className={styles.copy}>
        {variant === "image" ? (
          <div className={styles.imageTitleRow}>
            {showTitle ? (
              <h1 id="subpage-hero-title" className={styles.title}>
                {title}
              </h1>
            ) : null}
            <Illustration3D
              variant={illustrationVariant}
              className={styles.illustrationInline}
              aria-hidden
            />
          </div>
        ) : showTitle ? (
          <h1 id="subpage-hero-title" className={styles.title}>
            {title}
          </h1>
        ) : null}

        {showDescription && description != null ? (
          <div className={styles.description}>{description}</div>
        ) : null}
      </div>

      {variant === "links" ? (
        <>
          <div className={`${styles.links} ${styles.linksMobile}`}>
            {props.links.map((link) => (
              <LinkCard
                key={`${link.href}-mobile`}
                href={link.href}
                title={link.title}
                illustration={link.illustration}
                size="mobile"
                className={styles.linkCard}
              />
            ))}
          </div>
          <div className={`${styles.links} ${styles.linksDesktop}`}>
            {props.links.map((link) => (
              <LinkCard
                key={`${link.href}-desktop`}
                href={link.href}
                title={link.title}
                illustration={link.illustration}
                size="desktop"
                className={styles.linkCard}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.illustrationAside}>
          <Illustration3D variant={illustrationVariant} aria-hidden />
        </div>
      )}
    </section>
    </div>
  );
}
