import type { DistributionChartRow } from "../../design-system/DistributionChart/DistributionChart.types";

/** Figma 1272:28693 — category distribution demo rows. */
export const CATEGORY_DEMO_ROWS: DistributionChartRow[] = [
  {
    id: "other",
    label: "Інше",
    value: 120_389_831,
    segments: [
      { id: "other-a", label: "Інше A", value: 60_000_000 },
      { id: "other-b", label: "Інше B", value: 60_389_831 },
    ],
  },
  {
    id: "power",
    label: "Джерела живлення",
    value: 310_818_167,
    sharePercent: 8.4,
    segments: [
      { id: "power-a", label: "Батареї", value: 120_000_000 },
      { id: "power-b", label: "Генератори", value: 90_818_167 },
      { id: "power-c", label: "Інше", value: 100_000_000 },
    ],
  },
  {
    id: "electronics",
    label: "Електроніка",
    value: 59_418_214,
    sharePercent: 1.6,
    segments: [{ id: "electronics-a", label: "Електроніка", value: 59_418_214 }],
  },
  {
    id: "comms",
    label: "Зв'язок",
    value: 216_451_398,
    sharePercent: 5.9,
    segments: [{ id: "comms-a", label: "Зв'язок", value: 216_451_398 }],
  },
  {
    id: "medicine",
    label: "Медицина",
    value: 503_553_825,
    sharePercent: 13.7,
    segments: [{ id: "medicine-a", label: "Медицина", value: 503_553_825 }],
  },
  {
    id: "ground-drones",
    label: "Наземні дрони",
    value: 380_775_420,
    sharePercent: 10.3,
    segments: [
      { id: "ground-a", label: "Наземні дрони", value: 380_775_420 },
    ],
  },
  {
    id: "optics",
    label: "Оптика",
    value: 382_662_707,
    sharePercent: 10.4,
    segments: [
      {
        id: "sights",
        label: "Приціли",
        value: 100_000_000,
        breakdown: [
          { id: "night-sights", label: "Нічні приціли", value: 50_000_000 },
          { id: "day-sights", label: "Денні приціли", value: 50_000_000 },
        ],
      },
      { id: "optics-b", label: "Біноклі", value: 132_662_707 },
      { id: "optics-c", label: "Тепловізори", value: 150_000_000 },
    ],
  },
  {
    id: "ew",
    label: "Радіоелектронна боротьба",
    value: 255_112_406,
    sharePercent: 6.9,
    segments: [{ id: "ew-a", label: "РЕБ", value: 255_112_406 }],
  },
  {
    id: "recon-uav",
    label: "Розвідувальні БПЛА",
    value: 470_828_620,
    sharePercent: 12.8,
    segments: [{ id: "recon-a", label: "Розвідка", value: 470_828_620 }],
  },
  {
    id: "transport",
    label: "Транспорт",
    value: 371_681_646,
    sharePercent: 10.1,
    segments: [{ id: "transport-a", label: "Транспорт", value: 371_681_646 }],
  },
  {
    id: "strike-uav",
    label: "Ударні БПЛА",
    value: 368_122_307,
    sharePercent: 10.0,
    segments: [{ id: "strike-a", label: "Ударні БПЛА", value: 368_122_307 }],
  },
];

/** Figma 1272:28769 — department distribution demo rows. */
export const DEPARTMENT_DEMO_ROWS: DistributionChartRow[] = [
  { id: "dept-1", label: "Небесний штурм", value: 120_389_831 },
  { id: "dept-2", label: "Легіон відплати", value: 405_812_820 },
  { id: "dept-3", label: "Дружина сталевої долі", value: 265_091_803 },
  { id: "dept-4", label: "Мисливці на шахеди", value: 430_746_180 },
  { id: "dept-5", label: "Підсвіти ворога 2.0", value: 327_816_301 },
  { id: "dept-6", label: "Сокира справедливості", value: 365_918_710 },
  { id: "dept-7", label: "Темряви охоронці", value: 82_819_208 },
  { id: "dept-8", label: "Щелепи", value: 175_941_803 },
  { id: "dept-9", label: "Тіні вогню", value: 150_837_937 },
  { id: "dept-10", label: "Кодекс війни", value: 235_481_074 },
  { id: "dept-11", label: "Сила вітру", value: 269_810_130 },
];
