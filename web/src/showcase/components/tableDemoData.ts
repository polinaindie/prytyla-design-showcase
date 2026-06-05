export type TableDemoRow = {
  id: string;
  date: string;
  productName: string;
  category: string;
  unitPrice: string;
  quantity: string;
  total: string;
  project: string;
  department: string;
  subdivision: string;
  hasPhoto: boolean;
  hasDocument: boolean;
};

export const TABLE_DEMO_ROWS: TableDemoRow[] = [
  {
    id: "1",
    date: "03.06.2025",
    productName: "Генератор Zegor DIN-MUTE2500",
    category: "Джерела живлення → Генератори → Інверторні",
    unitPrice: "8 506.66",
    quantity: "2",
    total: "17 013.32",
    project: "-",
    department: "Десантно-штурмові війська",
    subdivision: "Десантно-штурмові війська",
    hasPhoto: true,
    hasDocument: true,
  },
  {
    id: "2",
    date: "03.06.2025",
    productName: "Рюкзак тактичний",
    category: "Спорядження → Рюкзаки",
    unitPrice: "2 450.00",
    quantity: "15",
    total: "36 750.00",
    project: "Збір «Разом»",
    department: "Сухопутні війська",
    subdivision: "Механізована бригада",
    hasPhoto: true,
    hasDocument: false,
  },
  {
    id: "3",
    date: "02.06.2025",
    productName: "Тепловізор Pulsar Axion 2 XQ35",
    category: "Оптика → Тепловізори",
    unitPrice: "98 400.00",
    quantity: "1",
    total: "98 400.00",
    project: "-",
    department: "Десантно-штурмові війська",
    subdivision: "Штурмова рота",
    hasPhoto: false,
    hasDocument: true,
  },
  {
    id: "4",
    date: "02.06.2025",
    productName: "Автомобіль пікап",
    category: "Транспорт → Легкові",
    unitPrice: "1 250 000.00",
    quantity: "1",
    total: "1 250 000.00",
    project: "Проєкт «Мобільність»",
    department: "Національна гвардія",
    subdivision: "Полк оперативного призначення",
    hasPhoto: true,
    hasDocument: true,
  },
  {
    id: "5",
    date: "01.06.2025",
    productName: "Бронежилет IV класу",
    category: "Захист → Бронежилети",
    unitPrice: "18 900.00",
    quantity: "40",
    total: "756 000.00",
    project: "-",
    department: "Сухопутні війська",
    subdivision: "Піхотна бригада",
    hasPhoto: true,
    hasDocument: true,
  },
];
