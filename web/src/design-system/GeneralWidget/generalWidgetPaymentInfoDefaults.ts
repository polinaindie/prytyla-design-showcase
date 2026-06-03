import type { PaymentInfoField } from "../PaymentInfo/PaymentInfo.types";
import type { GeneralWidgetPaymentInfoSection } from "./GeneralWidget.types";

const CARD_FIELDS: PaymentInfoField[] = [
  { label: "Одержувач", value: "Сергій Притула", copyValue: "Сергій Притула" },
  {
    label: "IBAN",
    value: "UA8430529900000026200681993072",
    copyValue: "UA8430529900000026200681993072",
  },
  { label: "РНОКПП", value: "2975800618", copyValue: "2975800618" },
  {
    label: "Призначення платежу",
    value: "OP00279, благодійний безповоротний внесок",
    copyValue: "OP00279, благодійний безповоротний внесок",
  },
  {
    label: "Номер карти",
    value: "5168 7420 6353 7207",
    copyValue: "5168742063537207",
  },
];

const BANK_FIELDS: PaymentInfoField[] = [
  {
    label: "Одержувач",
    value: "БО Фонд Сергія Притули",
    copyValue: "БО Фонд Сергія Притули",
  },
  {
    label: "IBAN",
    value: "UA843220010000026004700000011",
    copyValue: "UA843220010000026004700000011",
  },
  { label: "ЄДРПОУ", value: "43720363", copyValue: "43720363" },
  {
    label: "Призначення платежу",
    value: "OP00279, благодійний безповоротний внесок",
    copyValue: "OP00279, благодійний безповоротний внесок",
  },
];

const PAYPAL_FIELDS: PaymentInfoField[] = [
  {
    label: "Email",
    value: "serhiy.prytula.kyiv@gmail.com",
    copyValue: "serhiy.prytula.kyiv@gmail.com",
  },
  {
    label: "Обов'язковий коментар",
    value: "Charity donation for CHYSTE NEBO",
    copyValue: "Charity donation for CHYSTE NEBO",
  },
];

const SWIFT_FIELDS: PaymentInfoField[] = [
  {
    label: "Beneficiary",
    value: "Serhiy Prytula Charity Foundation",
    copyValue: "Serhiy Prytula Charity Foundation",
  },
  {
    label: "IBAN",
    value: "UA9030529900000026001026709343",
    copyValue: "UA9030529900000026001026709343",
  },
  { label: "SWIFT code", value: "PBANUA2X", copyValue: "PBANUA2X" },
];

const CRYPTO_FIELDS: PaymentInfoField[] = [
  { label: "Bitcoin (BTC)", value: "bc1q…", copyValue: "bc1qexample" },
  { label: "Ethereum (ETH)", value: "0x…", copyValue: "0xexample" },
  { label: "Tether USDT (TRC20)", value: "T…", copyValue: "Texample" },
];

/** Figma GeneralWidget Form / Реквізити — node 287:15037 */
export const DEFAULT_PAYMENT_INFO_SECTIONS: GeneralWidgetPaymentInfoSection[] = [
  {
    title: "Перекази по Україні",
    items: [
      {
        id: "gw-card",
        paymentType: "card",
        title: "Переказ на карту",
        fields: CARD_FIELDS,
      },
      {
        id: "gw-bank",
        paymentType: "bank",
        title: "Банківський переказ",
        fields: BANK_FIELDS,
      },
    ],
  },
  {
    title: "Перекази з-закордону",
    items: [
      {
        id: "gw-paypal",
        paymentType: "paypal",
        title: "Paypal",
        fields: PAYPAL_FIELDS,
      },
      {
        id: "gw-swift",
        paymentType: "swift",
        title: "SWIFT перекази",
        fields: SWIFT_FIELDS,
      },
    ],
  },
  {
    title: "Криптовалюта",
    items: [
      {
        id: "gw-crypto",
        paymentType: "crypto",
        title: "Crypto",
        fields: CRYPTO_FIELDS,
      },
    ],
  },
];
