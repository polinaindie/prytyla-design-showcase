import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

type MemorandumPartnerCardBase = {
  logoSrc: string;
  logoAlt: string;
  className?: string;
};

export type MemorandumPartnerCardProps = MemorandumPartnerCardBase &
  (
    | ({
        href: string;
      } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof MemorandumPartnerCardBase | "href">)
    | ({ href?: undefined } & HTMLAttributes<HTMLDivElement>)
  );
