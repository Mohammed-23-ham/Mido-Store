import assert from "node:assert/strict";
import test from "node:test";
import { CURRENCIES, FALLBACK_RATES } from "./config.ts";
import { convert, format } from "./format.ts";

test("converts USD using the selected exchange rate", () => {
  assert.equal(convert(49, FALLBACK_RATES.SAR), 183.75);
});

test("formats the converted amount with the currency locale", () => {
  assert.equal(
    format(49, "SAR", FALLBACK_RATES),
    new Intl.NumberFormat(CURRENCIES.SAR.locale, {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: CURRENCIES.SAR.decimals,
      maximumFractionDigits: CURRENCIES.SAR.decimals,
    }).format(183.75),
  );
  assert.equal(format(49, "USD", FALLBACK_RATES), "$49.00");
});
