import {
  BASE_CURRENCY,
  CURRENCIES,
  FALLBACK_RATES,
  type CurrencyCode,
  type ExchangeRates,
} from "./config.ts";

export interface RatesResult {
  rates: ExchangeRates;
  updatedAt: string;
}

interface ExchangeRateResponse {
  result?: unknown;
  time_last_update_utc?: unknown;
  rates?: Record<string, unknown>;
}

export async function getRates(): Promise<RatesResult> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Exchange-rate service returned ${response.status}`);
    }

    const payload = (await response.json()) as ExchangeRateResponse;
    if (payload.result !== "success" || !payload.rates) {
      throw new Error("Exchange-rate service returned an invalid response");
    }

    const rates = Object.fromEntries(
      (Object.keys(CURRENCIES) as CurrencyCode[]).map((currency) => {
        const rate = currency === BASE_CURRENCY ? 1 : payload.rates?.[currency];
        if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
          throw new Error(`Exchange rate for ${currency} is unavailable`);
        }
        return [currency, rate];
      }),
    ) as ExchangeRates;

    return {
      rates,
      updatedAt:
        typeof payload.time_last_update_utc === "string"
          ? payload.time_last_update_utc
          : new Date().toISOString(),
    };
  } catch {
    return { rates: FALLBACK_RATES, updatedAt: new Date().toISOString() };
  }
}
