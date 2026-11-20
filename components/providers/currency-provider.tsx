"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BASE_CURRENCY,
  CURRENCIES,
  isCurrencyCode,
  type CurrencyCode,
  type ExchangeRates,
} from "@/lib/currency/config";
import { convert as convertAmount, format as formatAmount } from "@/lib/currency/format";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rates: ExchangeRates;
  convert: (usd: number) => number;
  format: (usd: number) => string;
}

interface CurrencyProviderProps {
  children: ReactNode;
  initialCurrency: CurrencyCode;
  initialRates: ExchangeRates;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({
  children,
  initialCurrency,
  initialRates,
}: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState(initialCurrency);
  const [rates, setRates] = useState(initialRates);

  useEffect(() => {
    const controller = new AbortController();

    async function refreshRates() {
      try {
        const response = await fetch("/api/rates", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Rate refresh failed with status ${response.status}`);
        }

        const payload: unknown = await response.json();
        if (!isRatesPayload(payload)) {
          throw new Error("Rate refresh returned invalid rate data");
        }
        setRates(payload.rates);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Unable to refresh exchange rates", error);
        }
      }
    }

    void refreshRates();
    const intervalId = window.setInterval(() => void refreshRates(), 3600000);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const setCurrency = useCallback((nextCurrency: CurrencyCode) => {
    if (!isCurrencyCode(nextCurrency)) {
      throw new RangeError(`Unsupported currency: ${nextCurrency}`);
    }

    setCurrencyState(nextCurrency);
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `currency=${nextCurrency}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  }, []);

  const convert = useCallback(
    (usd: number) => convertAmount(usd, rates[currency]),
    [currency, rates],
  );
  const format = useCallback(
    (usd: number) => formatAmount(usd, currency, rates),
    [currency, rates],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, rates, convert, format }),
    [currency, setCurrency, rates, convert, format],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

function isRatesPayload(value: unknown): value is { rates: ExchangeRates } {
  if (typeof value !== "object" || value === null || !("rates" in value)) {
    return false;
  }
  const ratesValue = (value as { rates?: unknown }).rates;
  if (typeof ratesValue !== "object" || ratesValue === null) return false;
  const rateValues = ratesValue as Record<string, unknown>;

  return (Object.keys(CURRENCIES) as CurrencyCode[]).every((code) => {
    const rate = rateValues[code];
    return (
      typeof rate === "number" &&
      Number.isFinite(rate) &&
      rate > 0 &&
      (code !== BASE_CURRENCY || rate === 1)
    );
  });
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error(`${useCurrency.name} must be used within a CurrencyProvider`);
  }
  return context;
}
