"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { Price } from "@/components/price";
import heroImg from "@/public/imgs/apply.jpg";
import productImg from "@/public/imgs/elixir.jpg";
import dropImg from "@/public/imgs/drop.jpg";
import guashaImg from "@/public/imgs/guasha.jpg";

const product = {
  id: "radiance-renewal-elixir",
  name: "Radiance Renewal Squalane & Olive Elixir",
  image: "/imgs/elixir.jpg",
  price: 98,
};

const purchaseOptions = [
  { id: "once", label: "1 Bottle", detail: "" },
  { id: "subscribe", label: "2 Bottles + Free Gua Sha", detail: "Most Popular" },
  { id: "gift", label: "Buy 2 Get 1 Free", detail: "Best Value" },
] as const;

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("once");
  const addItem = useCartStore((state) => state.addItem);

  const thumbnails = [
    { src: productImg, alt: "Radiance Renewal Elixir bottle" },
    { src: dropImg, alt: "Squalane serum texture" },
    { src: heroImg, alt: "Elixir skincare application" },
    { src: guashaImg, alt: "Gua Sha skincare ritual" },
  ];

  return (
    <div className="overflow-hidden">
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 md:grid-cols-2 md:py-16 lg:px-10">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Clinically proven botanicals
          </p>
          <h1 className="max-w-[520px] font-[family-name:var(--font-fraunces)] text-[46px] leading-[1.05] font-medium sm:text-[58px] md:text-[64px]">
            Glow that grows
            <br />
            from nature.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Cold-pressed olive squalane meets rosehip and bakuchiol in one ritual oil.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
              Shop the Elixir
            </Link>
            <Link href="/story" className="rounded-full border px-7 py-3 text-sm font-semibold transition-colors hover:bg-secondary">
              Our Story
            </Link>
          </div>
        </div>
        <div className="h-[390px] sm:h-[470px] md:h-[460px]">
          <Image
            src={heroImg}
            alt="Woman applying botanical facial oil"
            className="h-full w-full rounded-[24px] object-cover"
            priority
          />
        </div>
      </section>

      <section className="border-y py-7">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-6 px-5 text-center sm:grid-cols-4">
          {[
            ["94%", "saw brighter skin"],
            ["89%", "reduced fine lines"],
            ["97%", "felt more hydrated"],
            ["100%", "vegan & cruelty-free"],
          ].map(([value, label]) => (
            <div key={value}>
              <div className="font-[family-name:var(--font-fraunces)] text-2xl">{value}</div>
              <div className="mt-1 text-[10px] text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-9 px-5 py-14 sm:px-8 md:grid-cols-[1.05fr_.95fr] md:py-16 lg:px-10">
        <div>
          <div className="aspect-[1.04] overflow-hidden rounded-[24px] bg-secondary">
            <Image src={productImg} alt="Radiance Renewal Elixir" className="h-full w-full object-cover" priority />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {thumbnails.map((thumb, index) => (
              <button
                key={thumb.alt}
                type="button"
                aria-label={`View product image ${index + 1}`}
                className={`aspect-square overflow-hidden rounded-[16px] border-2 ${index === 0 ? "border-primary" : "border-transparent"}`}
              >
                <Image src={thumb.src} alt={thumb.alt} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:pt-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="tracking-[1px]">★★★★★</span>
            <span className="text-muted-foreground">4.9 · 1,800+ REVIEWS</span>
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-[38px] leading-[1.08] sm:text-[44px]">
            Radiance Renewal
            <br />
            Squalane &amp; Olive Elixir
          </h2>
          <p className="mt-4 max-w-md text-xs leading-5 text-muted-foreground">
            A lightweight facial oil that restores your barrier, softens fine lines and leaves skin luminous — in 14 days.
          </p>
          <div className="mt-5 flex items-end gap-3">
            <Price amount={98} compareAt={117} className="text-xl font-semibold" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-destructive/10 px-3 py-1.5 text-[11px] text-destructive">⏱ Flash sale ends in: 02:23</span>
            <span className="rounded-full bg-secondary px-3 py-1.5 text-[11px]">♧ Ships within 24h</span>
          </div>

          <div className="mt-5 space-y-2">
            {purchaseOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`flex w-full items-center justify-between rounded-full border px-4 py-3 text-left text-sm transition-colors ${
                  selectedOption === option.id ? "border-primary bg-secondary" : "hover:bg-secondary/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`size-3 rounded-full border ${selectedOption === option.id ? "border-primary bg-primary" : ""}`} />
                  {option.label}
                </span>
                {option.detail && (
                  <span className="rounded-full bg-primary px-2 py-1 text-[9px] text-primary-foreground">{option.detail}</span>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addItem(product)}
            className="mt-5 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Add to Cart
          </button>
          <button type="button" className="mt-3 h-12 w-full rounded-full bg-[oklch(0.84_0.16_85)] text-sm font-semibold text-[oklch(0.25_0.05_260)]">
            Buy Now with PayPal
          </button>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[9px] text-muted-foreground">
            <div><Truck className="mx-auto mb-1 size-4" />Free shipping</div>
            <div><RotateCcw className="mx-auto mb-1 size-4" />30-day returns</div>
            <div><ShieldCheck className="mx-auto mb-1 size-4" />Secure checkout</div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 sm:px-8 md:grid-cols-2 md:pb-20 lg:px-10">
        <div className="h-[360px] overflow-hidden rounded-[24px] sm:h-[430px]">
          <Image src={dropImg} alt="Botanical oil drop on an olive leaf" className="h-full w-full object-cover" />
        </div>
        <div className="md:pl-8">
          <h2 className="font-[family-name:var(--font-fraunces)] text-[34px] leading-[1.08] sm:text-[40px]">
            Three ingredients. Zero compromise.
          </h2>
          <div className="mt-6 space-y-4 text-xs leading-5">
            <div className="border-l-2 border-primary pl-3">
              <strong className="block text-sm">Olive Squalane</strong>
              <span className="text-muted-foreground">Mimics skin’s own oils for deep, weightless hydration.</span>
            </div>
            <div className="border-l-2 border-primary pl-3">
              <strong className="block text-sm">Rosehip Seed</strong>
              <span className="text-muted-foreground">Rich in vitamin A to visibly even tone.</span>
            </div>
            <div className="border-l-2 border-primary pl-3">
              <strong className="block text-sm">Bakuchiol</strong>
              <span className="text-muted-foreground">A gentle plant-retinol alternative for smoother texture.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <h2 className="text-center font-[family-name:var(--font-fraunces)] text-2xl sm:text-[28px]">
          Loved by 1,800+ customers
        </h2>
        <div className="mx-auto mt-7 grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-3 lg:px-10">
          {[
            ["Layla M.", "My skin has never looked this dewy. Absorbs in seconds.”"],
            ["Sarah N.", "Replaced three products with this one oil. Obsessed.”"],
            ["Omar A.", "Bought for my wife, now we both use it daily.”"],
          ].map(([name, quote]) => (
            <article key={name} className="rounded-2xl border bg-card p-5 text-xs">
              <div className="tracking-[1px]">★★★★★</div>
              <p className="mt-2 leading-5">“{quote}</p>
              <p className="mt-4 text-[10px] font-semibold">{name} · Verified buyer</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
