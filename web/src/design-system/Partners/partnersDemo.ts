import type { PartnerLogoVariant } from "../PartnerLogo";
import type { PartnerItem } from "./Partners.types";

/** Демо-дані з Figma Partners (3:7369). */
export const PARTNERS_DEMO: PartnerItem[] = [
  {
    id: "fest",
    name: "Холдинг емоцій «!FEST»",
    description:
      "Тепер !FEST – уже більш ніж ресторанна компанія. Ми маємо пивоварню, пиво якої визнане у світі; печемо свій хліб і смачнючі солодощі; робимо морозиво; шиємо одяг про Україну, який надає крила; будуємо нове, інакше житло у Львові; проводимо фестивалі, а ще вчимо творити майбутнє в нашій Школі вільних і небайдужих. Боротьба триває! ;).",
    logoVariant: "fest-white",
    featuredLogoVariant: "fest-black",
  },
  {
    id: "easypay",
    name: "easy pay",
    description: "Партнер платіжних рішень для зборів фонду.",
    logoVariant: "easypay-black",
  },
  {
    id: "helsi",
    name: "Helsi",
    description: "Медична екосистема та цифрові сервіси для пацієнтів.",
    logoVariant: "helsi",
  },
  {
    id: "uniqa",
    name: "UNIQA",
    description: "Страховий партнер.",
    logoVariant: "uniqa",
  },
  {
    id: "work-ua",
    name: "WORK.ua",
    description: "Платформа працевлаштування.",
    logoVariant: "work-ua",
  },
  {
    id: "eds",
    name: "EDS Charity Foundation",
    description: "Благодійний фонд EDS.",
    logoVariant: "eds",
  },
  {
    id: "dila",
    name: "Діла",
    description: "Мережа медичних лабораторій.",
    logoVariant: "dila",
  },
  {
    id: "kran-resurs",
    name: "Кран Ресурс",
    description: "Промисловий партнер.",
    logoVariant: "kran-resurs",
  },
  {
    id: "smile",
    name: "Smile",
    description: "Партнер Smile.",
    logoVariant: "smile",
  },
  {
    id: "zavertailo",
    name: "Завертайло",
    description: "Партнер Завертайло.",
    logoVariant: "zavertailo",
  },
  {
    id: "honey",
    name: "Honey",
    description: "Партнер Honey.",
    logoVariant: "honey",
  },
  {
    id: "sich",
    name: "SICH Tourniquet",
    description: "Виробник турнікетів для ЗСУ.",
    logoVariant: "sich",
  },
];

export function getPartnerFeaturedLogoVariant(
  partner: PartnerItem,
): PartnerLogoVariant {
  return partner.featuredLogoVariant ?? partner.logoVariant;
}
