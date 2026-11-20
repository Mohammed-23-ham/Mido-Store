"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "@/components/providers/currency-provider";

const FREE_SHIPPING_THRESHOLD = 75;
const GUA_SHA_ITEM = {
  id: "gua-sha-stone",
  name: "Gua Sha Stone (Free Gift)",
  image: "/imgs/guasha.jpg",
  price: 0,
};

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const { format } = useCurrency();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const hasGuaSha = items.some((item) => item.id === GUA_SHA_ITEM.id);
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );
  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Shopping bag, ${cartCount} items`}
          className="relative inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
          <ShoppingBag aria-hidden="true" size={22} strokeWidth={1.8} />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full max-w-[456px] gap-0 border-0 bg-background p-0 font-[family-name:var(--font-manrope)] text-foreground data-[side=right]:w-full !max-w-[456px]"
      >
        <div className="flex h-[73px] shrink-0 items-center justify-between border-b px-5">
          <SheetTitle className="font-[family-name:var(--font-fraunces)] text-[25px] font-normal">
            Your Cart ({cartCount})
          </SheetTitle>
          <SheetDescription className="sr-only">
            Your shopping cart and checkout summary
          </SheetDescription>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close shopping cart"
              className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
            >
              <X aria-hidden="true" size={22} strokeWidth={1.8} />
            </button>
          </SheetClose>
        </div>

        <div className="shrink-0 border-b px-5 py-5">
          <p className="mb-2 text-sm">
            {remainingForFreeShipping > 0
              ? `You're ${format(remainingForFreeShipping)} away from free shipping`
              : "🎉 You unlocked free shipping!"}
          </p>
          <div
            aria-label={`${Math.round(shippingProgress)}% toward free shipping`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={shippingProgress}
            className="h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-[15px] text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div className="flex gap-3" key={item.id}>
                  <Image
                    alt={item.name}
                    className="size-20 shrink-0 rounded-2xl object-cover"
                    height={80}
                    src={item.image}
                    width={80}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-5">{item.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {format(item.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() =>
                          setQuantity(item.id, item.quantity - 1)
                        }
                        className="inline-flex size-6 items-center justify-center rounded border text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Minus aria-hidden="true" size={14} />
                      </button>
                      <span className="min-w-4 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          setQuantity(item.id, item.quantity + 1)
                        }
                        className="inline-flex size-6 items-center justify-center rounded border text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Plus aria-hidden="true" size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.id)}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Trash2 aria-hidden="true" size={17} />
                  </button>
                </div>
              ))}

              {!hasGuaSha && (
                <div className="flex items-center gap-3 rounded-3xl bg-secondary p-3">
                  <Image
                    alt={GUA_SHA_ITEM.name}
                    className="size-14 shrink-0 rounded-2xl object-cover"
                    height={56}
                    src={GUA_SHA_ITEM.image}
                    width={56}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">Complete the ritual</p>
                    <p className="text-sm text-muted-foreground">
                      Gua Sha Stone · Free
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(GUA_SHA_ITEM)}
                    className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/85"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t px-5 py-4">
            <div className="mb-1 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{format(subtotal)}</span>
            </div>
            <div className="mb-3 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{format(subtotal)}</span>
            </div>
            <SheetClose asChild>
              <Link
                href="/checkout"
                className="flex h-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Checkout
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
