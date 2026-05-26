import { SubTag } from "../Tag/SubTag";
import { Tag } from "../Tag/Tag";
import type { NewsCardProps } from "./NewsCard.types";
import styles from "./NewsCard.module.css";

function resolveTagLabels(props: NewsCardProps): readonly string[] {
  if (props.tags != null && props.tags.length > 0) {
    return props.tags;
  }
  if (props.tagLabel != null && props.tagLabel !== "") {
    return [props.tagLabel];
  }
  return [];
}

export function NewsCard(props: NewsCardProps) {
  const {
    href,
    imageSrc,
    imageAlt = "",
    date,
    category,
    title,
    variant = "card",
    className,
    ...rest
  } = props;

  const size =
    variant === "featured"
      ? (props.size ?? "desktop")
      : (props.size ?? "desktop");

  const rootClass = [
    styles.root,
    variant === "featured"
      ? size === "mobile"
        ? styles.featuredMobile
        : styles.featuredDesktop
      : size === "tablet"
        ? styles.tablet
        : styles.desktop,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tagLabels = resolveTagLabels(props);
  const isFeatured = variant === "featured";
  const TitleTag = isFeatured && size === "desktop" ? "h2" : "h3";

  const media = (
    <div className={styles.media}>
      <div className={styles.imageMotion}>
        <div className={styles.imagePan}>
          <img
            className={styles.image}
            src={imageSrc}
            alt={imageAlt}
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );

  const body = (
    <div className={styles.body}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <time className={styles.date} dateTime={date}>
            {date}
          </time>
          <span className={styles.metaDot} aria-hidden />
          <SubTag className={styles.category}>{category}</SubTag>
        </div>
        <TitleTag className={styles.title}>{title}</TitleTag>
        {isFeatured && tagLabels.length > 0 ? (
          <div className={styles.tags}>
            {tagLabels.map((label) => (
              <Tag key={label} className={styles.tagItem}>
                {label}
              </Tag>
            ))}
          </div>
        ) : null}
      </div>
      {!isFeatured && tagLabels.length > 0 ? (
        <Tag className={styles.tag}>{tagLabels[0]}</Tag>
      ) : null}
    </div>
  );

  return (
    <a
      href={href}
      className={rootClass}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {isFeatured && size === "desktop" ? (
        <>
          {body}
          {media}
        </>
      ) : (
        <>
          {media}
          {body}
        </>
      )}
    </a>
  );
}
