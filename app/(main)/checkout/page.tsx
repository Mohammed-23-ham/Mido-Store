"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Leaf, LockKeyhole, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

const FREE_SHIPPING_THRESHOLD = 75;
const inputClassName =
  "h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

const expressMethods = [
  { name: "Shop Pay", className: "bg-primary text-primary-foreground" },
  { name: "PayPal", className: "bg-[#ffc439] text-[#111827]" },
  { name: "Crypto USDT", className: "bg-[#111612] text-white" },
] as const;

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Payment processing isn't configured yet. Your order has not been placed.",
    );
  }

  if (items.length === 0) {
    return (
      <section className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-16 text-center">
        <h1 className="font-[family-name:var(--font-fraunces)] text-3xl font-medium sm:text-4xl">
          Your cart is empty
        </h1>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
        >
          Shop now
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)] lg:gap-10 lg:px-10 lg:py-10">
      <form className="space-y-7" onSubmit={handleSubmit}>
        <section>
          <p className="mb-3 text-center text-xs text-muted-foreground">
            Express checkout
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {expressMethods.map(({ name, className }) => (
              <button
                className={`h-11 rounded-full text-sm font-medium transition-opacity hover:opacity-85 ${className}`}
                key={name}
                onClick={() =>
                  setNotice(
                    `${name} payments aren't configured yet. Your order has not been placed.`,
                  )
                }
                type="button"
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h1 className="font-[family-name:var(--font-fraunces)] text-xl">
            1. Contact
          </h1>
          <label className="sr-only" htmlFor="checkout-email">
            Email
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            id="checkout-email"
            name="email"
            placeholder="Email"
            required
            type="email"
          />
        </section>

        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-fraunces)] text-xl">
            2. Shipping
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="sr-only" htmlFor="checkout-first-name">
              First name
            </label>
            <input
              autoComplete="given-name"
              className={inputClassName}
              id="checkout-first-name"
              name="firstName"
              placeholder="First name"
              required
            />
            <label className="sr-only" htmlFor="checkout-last-name">
              Last name
            </label>
            <input
              autoComplete="family-name"
              className={inputClassName}
              id="checkout-last-name"
              name="lastName"
              placeholder="Last name"
              required
            />
          </div>
          <label className="sr-only" htmlFor="checkout-address">
            Address
          </label>
          <input
            autoComplete="street-address"
            className={inputClassName}
            id="checkout-address"
            name="address"
            placeholder="Address"
            required
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <label className="sr-only" htmlFor="checkout-city">
              City
            </label>
            <input
              autoComplete="address-level2"
              className={inputClassName}
              id="checkout-city"
              name="city"
              placeholder="City"
              required
            />
            <label className="sr-only" htmlFor="checkout-country">
              Country
            </label>
            <input
              autoComplete="country-name"
              className={inputClassName}
              id="checkout-country"
              name="country"
              placeholder="Country"
              required
            />
            <label className="sr-only" htmlFor="checkout-postal-code">
              Postal code
            </label>
            <input
              autoComplete="postal-code"
              className={inputClassName}
              id="checkout-postal-code"
              name="postalCode"
              placeholder="Postal code"
              required
            />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-fraunces)] text-xl">
            3. Payment
          </h2>
          <label className="sr-only" htmlFor="checkout-card-number">
            Card number
          </label>
          <input
            autoComplete="cc-number"
            className={inputClassName}
            id="checkout-card-number"
            inputMode="numeric"
            name="cardNumber"
            placeholder="Card number"
            required
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="sr-only" htmlFor="checkout-card-expiry">
              Expiration date
            </label>
            <input
              autoComplete="cc-exp"
              className={inputClassName}
              id="checkout-card-expiry"
              name="cardExpiry"
              placeholder="MM / YY"
              required
            />
            <label className="sr-only" htmlFor="checkout-card-cvc">
              Security code
            </label>
            <input
              autoComplete="cc-csc"
              className={inputClassName}
              id="checkout-card-cvc"
              inputMode="numeric"
              name="cardCvc"
              placeholder="CVC"
              required
            />
          </div>
        </section>

        {notice && (
          <p className="text-sm text-muted-foreground" role="status">
            {notice}
          </p>
        )}

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          type="submit"
        >
          <LockKeyhole aria-hidden="true" size={15} />
          Pay {formatPrice(subtotal)}
        </button>
      </form>

      <aside className="h-fit rounded-3xl bg-secondary p-5 lg:sticky lg:top-24">
        <ul className="space-y-3">
          {items.map((item) => (
            <li className="flex items-center gap-3" key={item.id}>
              <div className="relative size-14 shrink-0">
                <Image
                  alt={item.name}
                  className="size-14 rounded-2xl object-cover"
                  fill
                  sizes="56px"
                  src={item.image}
                />
                <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <p className="min-w-0 flex-1 text-xs leading-4">{item.name}</p>
              <span className="shrink-0 text-xs">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="my-4 space-y-2 border-t border-border pt-3 text-xs">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {qualifiesForFreeShipping ? "Free" : "Calculated at next step"}
            </span>
          </div>
          <div className="flex justify-between pt-1 text-base font-semibold">
            <span>Total</span>
            <span>
              {qualifiesForFreeShipping
                ? formatPrice(subtotal)
                : "Calculated at next step"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground">
          <div className="flex flex-col items-center gap-1">
            <LockKeyhole aria-hidden="true" size={14} />
            <span>256-bit SSL</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck aria-hidden="true" size={14} />
            <span>30-day guarantee</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Leaf aria-hidden="true" size={14} />
            <span>Zero carbon</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
