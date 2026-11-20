"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Leaf, LockKeyhole, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useCurrency } from "@/components/providers/currency-provider";
import { DemoPurchaseDialog } from "@/components/demo-purchase-dialog";

const FREE_SHIPPING_THRESHOLD = 75;

const expressMethods = [
  { name: "Shop Pay", className: "bg-primary text-primary-foreground" },
  { name: "PayPal", className: "bg-[#ffc439] text-[#111827]" },
  { name: "Crypto USDT", className: "bg-[#111612] text-white" },
] as const;

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const { currency, format } = useCurrency();
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const [demoMethod, setDemoMethod] = useState<string | null>(null);

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
      <div className="space-y-7">
        <section>
          <p className="mb-3 text-center text-xs text-muted-foreground">
            Express checkout
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {expressMethods.map(({ name, className }) => (
              <button
                className={`h-11 rounded-full text-sm font-medium transition-opacity hover:opacity-85 ${className}`}
                key={name}
                onClick={() => setDemoMethod(name)}
                type="button"
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-3xl border bg-card p-5">
          <h1 className="font-[family-name:var(--font-fraunces)] text-xl">
            Demo checkout
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Products are fictional. This demo does not collect contact, shipping,
            or card details, and it cannot place a real order.
          </p>
          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            onClick={() => setDemoMethod("Checkout")}
            type="button"
          >
            <LockKeyhole aria-hidden="true" size={15} />
            Complete demo checkout · {format(subtotal)}
          </button>
        </section>
      </div>
      <DemoPurchaseDialog
        method={demoMethod}
        onOpenChange={(open) => {
          if (!open) setDemoMethod(null);
        }}
      />

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
                {format(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="my-4 space-y-2 border-t border-border pt-3 text-xs">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{format(subtotal)}</span>
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
                ? format(subtotal)
                : "Calculated at next step"}
            </span>
          </div>
          <p className="pt-2 text-[10px] leading-4 text-muted-foreground">
            Prices converted at today&apos;s rate; charged in {currency}.
          </p>
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
