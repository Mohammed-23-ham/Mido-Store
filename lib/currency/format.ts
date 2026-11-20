import { CURRENCIES, type CurrencyCode, type ExchangeRates } from "./config.ts";

const formatters = new Map<CurrencyCode, Intl.NumberFormat>();

export function convert(usd: number, rate: number): number {
  return usd * rate;
}

export function format(
  usd: number,
  currency: CurrencyCode,
  rates: ExchangeRates,
): string {
  let formatter = formatters.get(currency);

  if (!formatter) {
    formatter = new Intl.NumberFormat(CURRENCIES[currency].locale, {
      style: "currency",
      currency,
      minimumFractionDigits: CURRENCIES[currency].decimals,
      maximumFractionDigits: CURRENCIES[currency].decimals,
    });
    formatters.set(currency, formatter);
  }

  return formatter.format(convert(usd, rates[currency]));
}
