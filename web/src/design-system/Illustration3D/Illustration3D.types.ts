/** Figma `Property 1` on component set `3d images` (293:3871) */
export type Illustration3DVariant =
  | "humanitarianProjects"
  | "annualReports"
  | "civilianTraining"
  | "jobOpenings"
  | "aboutFund"
  | "militaryTraining"
  | "statistic"
  | "handshake"
  | "projects"
  | "news"
  | "uah"
  | "radio"
  | "drone"
  | "airplane"
  | "thermalImager"
  | "turnstile"
  | "vehicle";

export type Illustration3DProps = {
  variant: Illustration3DVariant;
  className?: string;
  /** Defaults to figma label when omitted */
  alt?: string;
  "aria-hidden"?: boolean;
};
