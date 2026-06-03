import type { HTMLAttributes } from "react";

/** Figma Logo Partners (3:7114) — імена варіантів. */
export type PartnerLogoVariant =
  | "fest-white"
  | "fest-black"
  | "easypay-black"
  | "easypay-white"
  | "helsi"
  | "uniqa"
  | "work-ua"
  | "eds"
  | "honey"
  | "sich"
  | "dila"
  | "kran-resurs"
  | "zavertailo"
  | "smile"
  | "privatbank"
  | "wog";

export type PartnerLogoProps = HTMLAttributes<HTMLSpanElement> & {
  /** Figma Logo=* variant. */
  variant?: PartnerLogoVariant;
  /** Кастомний логотип замість variant. */
  src?: string;
  alt?: string;
};
