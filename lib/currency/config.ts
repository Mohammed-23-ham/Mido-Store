export const BASE_CURRENCY = "USD";

export const CURRENCIES = {
  USD: { symbol: "$", locale: "en-US", decimals: 2 },
  EUR: { symbol: "€", locale: "de-DE", decimals: 2 },
  GBP: { symbol: "£", locale: "en-GB", decimals: 2 },
  SAR: { symbol: "﷼", locale: "ar-SA", decimals: 2 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
export type ExchangeRates = Record<CurrencyCode, number>;

export const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  SAR: 3.75,
} as const satisfies ExchangeRates;

export function isCurrencyCode(value: string): value is CurrencyCode {
  return Object.hasOwn(CURRENCIES, value);
}
