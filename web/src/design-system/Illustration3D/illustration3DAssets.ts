import type { Illustration3DVariant } from "./Illustration3D.types";

export type Illustration3DAssetMeta = {
  variant: Illustration3DVariant;
  /** Figma `Property 1` label */
  figmaLabel: string;
  figmaNodeId: string;
  size: "small" | "large";
  src: string;
};

/**
 * Figma component set `3d images` — node `293:3871`, Prytula-Responsive.
 * PNG у `web/public/illustrations/3d/` (kebab-case імена).
 * Оновлення: експорт варіантів з Figma → покласти в цю папку → перейменувати за slug нижче.
 */
export const ILLUSTRATION_3D_ASSETS: Illustration3DAssetMeta[] = [
  {
    variant: "humanitarianProjects",
    figmaLabel: "Humanitarian Projects",
    figmaNodeId: "40:12220",
    size: "small",
    src: "/illustrations/3d/humanitarian-projects.png",
  },
  {
    variant: "annualReports",
    figmaLabel: "Annual Reports",
    figmaNodeId: "40:12223",
    size: "small",
    src: "/illustrations/3d/annual-reports.png",
  },
  {
    variant: "civilianTraining",
    figmaLabel: "Civilian training",
    figmaNodeId: "40:12233",
    size: "small",
    src: "/illustrations/3d/civilian-training.png",
  },
  {
    variant: "jobOpenings",
    figmaLabel: "Job Openings",
    figmaNodeId: "40:12226",
    size: "small",
    src: "/illustrations/3d/job-openings.png",
  },
  {
    variant: "aboutFund",
    figmaLabel: "About fund",
    figmaNodeId: "40:12229",
    size: "small",
    src: "/illustrations/3d/about-fund.png",
  },
  {
    variant: "militaryTraining",
    figmaLabel: "Military training",
    figmaNodeId: "40:12242",
    size: "small",
    src: "/illustrations/3d/military-training.png",
  },
  {
    variant: "statistic",
    figmaLabel: "Statistic",
    figmaNodeId: "472:4654",
    size: "small",
    src: "/illustrations/3d/statistic.png",
  },
  {
    variant: "handshake",
    figmaLabel: "Handshake",
    figmaNodeId: "472:4652",
    size: "small",
    src: "/illustrations/3d/handshake.png",
  },
  {
    variant: "projects",
    figmaLabel: "Projects",
    figmaNodeId: "1138:24227",
    size: "small",
    src: "/illustrations/3d/projects.png",
  },
  {
    variant: "news",
    figmaLabel: "News",
    figmaNodeId: "1149:24124",
    size: "small",
    src: "/illustrations/3d/news.png",
  },
  {
    variant: "uah",
    figmaLabel: "UAH",
    figmaNodeId: "103:5196",
    size: "large",
    src: "/illustrations/3d/uah.png",
  },
  {
    variant: "radio",
    figmaLabel: "Radio",
    figmaNodeId: "103:5197",
    size: "large",
    src: "/illustrations/3d/radio.png",
  },
  {
    variant: "drone",
    figmaLabel: "Drone",
    figmaNodeId: "103:5198",
    size: "large",
    src: "/illustrations/3d/drone.png",
  },
  {
    variant: "airplane",
    figmaLabel: "Airplane",
    figmaNodeId: "103:5199",
    size: "large",
    src: "/illustrations/3d/airplane.png",
  },
  {
    variant: "thermalImager",
    figmaLabel: "Thermal imager",
    figmaNodeId: "103:5200",
    size: "large",
    src: "/illustrations/3d/thermal-imager.png",
  },
  {
    variant: "turnstile",
    figmaLabel: "Turnstile",
    figmaNodeId: "103:5202",
    size: "large",
    src: "/illustrations/3d/turnstile.png",
  },
  {
    variant: "vehicle",
    figmaLabel: "Vehicle",
    figmaNodeId: "1264:32002",
    size: "large",
    src: "/illustrations/3d/vehicle.png",
  },
];

const ASSET_BY_VARIANT = new Map(
  ILLUSTRATION_3D_ASSETS.map((entry) => [entry.variant, entry]),
);

export function getIllustration3DAsset(
  variant: Illustration3DVariant,
): Illustration3DAssetMeta {
  const asset = ASSET_BY_VARIANT.get(variant);
  if (!asset) {
    throw new Error(`Unknown Illustration3D variant: ${variant}`);
  }
  return asset;
}
