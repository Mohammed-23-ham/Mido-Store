"use client";

import Image from "next/image";
import Link from "next/link";
import { RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { Price } from "@/components/price";
import productImg from "@/public/imgs/elixir.jpg";
import dropImg from "@/public/imgs/drop.jpg";
import applyImg from "@/public/imgs/apply.jpg";
import guashaImg from "@/public/imgs/guasha.jpg";

const product = {
  id: "radiance-renewal-elixir",
  name: "Radiance Renewal Squalane & Olive Elixir",
  image: "/imgs/elixir.jpg",
  price: 98,
};

const purchaseOptions = [
  { id: "one", label: "1 Bottle", detail: "" },
  { id: "two", label: "2 Bottles + Free Gua Sha", detail: "Most Popular" },
  { id: "three", label: "Buy 2 Get 1 Free", detail: "Best Value" },
] as const;

export default function Shop() {
  const [selectedOption, setSelectedOption] = useState("one");
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const thumbnails = [
    { src: productImg, alt: "Radiance Renewal Elixir bottle" },
    { src: guashaImg, alt: "Gua Sha and skincare" },
    { src: dropImg, alt: "Botanical serum drop" },
    { src: applyImg, alt: "Woman applying facial oil" },
  ];

  return (
    <div className="overflow-hidden">
      <section className="mx-auto grid max-w-5xl gap-7 px-5 py-9 sm:px-8 md:grid-cols-[1fr_1fr] lg:px-10">
        <div>
          <div className="aspect-[1.08] overflow-hidden rounded-[18px] bg-secondary">
            <Image
              src={thumbnails[selectedImage].src}
              alt={thumbnails[selectedImage].alt}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {thumbnails.map((thumbnail, index) => (
              <button
                key={thumbnail.alt}
                type="button"
                aria-label={`View product image ${index + 1}`}
                aria-pressed={selectedImage === index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-[14px] border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={thumbnail.src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2 text-xs">
            <span className="tracking-[1px]">★★★★★</span>
            <span className="text-[9px] text-muted-foreground">4.9 · 1,800+ REVIEWS</span>
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-fraunces)] text-[38px] leading-[1.08] sm:text-[42px]">
            Radiance Renewal
            <br />
            Squalane &amp; Olive Elixir
          </h1>
          <p className="mt-4 max-w-md text-xs leading-5 text-muted-foreground">
            A lightweight facial oil that restores your barrier, softens fine lines and leaves skin luminous — in 14 days.
          </p>
          <div className="mt-5 flex items-end gap-3">
            <Price amount={98} compareAt={117} className="text-xl font-semibold" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-destructive/10 px-3 py-1.5 text-[10px] text-destructive">
              ⏱ Flash sale ends in: 17:51
            </span>
            <span className="rounded-full bg-secondary px-3 py-1.5 text-[10px]">
              ♧ Only 14 units left
            </span>
          </div>

          <div className="mt-5 space-y-2">
            {purchaseOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`flex w-full items-center justify-between rounded-full border px-4 py-3 text-left text-sm transition-colors ${
                  selectedOption === option.id
                    ? "border-primary bg-secondary"
                    : "hover:bg-secondary/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`size-3 rounded-full border ${
                      selectedOption === option.id
                        ? "border-primary bg-primary"
                        : ""
                    }`}
                  />
                  {option.label}
                </span>
                {option.detail && (
                  <span className="rounded-full bg-primary px-2 py-1 text-[9px] text-primary-foreground">
                    {option.detail}
                  </span>
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
          <button
            type="button"
            className="mt-3 h-12 w-full rounded-full bg-[oklch(0.84_0.16_85)] text-sm font-semibold text-[oklch(0.25_0.05_260)]"
          >
            Buy Now with PayPal
          </button>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[9px] text-muted-foreground">
            <div>
              <Truck className="mx-auto mb-1 size-4" />
              Free shipping
            </div>
            <div>
              <RotateCcw className="mx-auto mb-1 size-4" />
              30-day returns
            </div>
            <div>
              <ShieldCheck className="mx-auto mb-1 size-4" />
              Secure checkout
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-12 sm:px-8 lg:px-10">
        <h2 className="font-[family-name:var(--font-fraunces)] text-xl">How to use</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs leading-5 text-muted-foreground">
          <li>Cleanse and pat skin dry.</li>
          <li>Warm 3–4 drops between palms.</li>
          <li>Press onto face and neck, then sculpt with Gua Sha.</li>
        </ol>
      </section>

      <section className="border-t py-10">
        <h2 className="text-center font-[family-name:var(--font-fraunces)] text-[28px]">
          Loved by 1,800+ customers
        </h2>
        <div className="mx-auto mt-7 grid max-w-5xl gap-4 px-5 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            ["Layla M.", "My skin has never looked this dewy. Absorbs in seconds."],
            ["Sarah N.", "Replaced three products with this one oil. Obsessed."],
            ["Omar A.", "Bought for my wife, now we both use it daily."],
          ].map(([name, quote]) => (
            <article key={name} className="rounded-2xl border bg-card p-5 text-xs">
              <div className="tracking-[1px]">★★★★★</div>
              <p className="mt-2 leading-5">{quote}</p>
              <p className="mt-4 text-[9px] font-semibold">{name} · Verified buyer</p>
            </article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="inline-flex rounded-full border px-5 py-2 text-xs hover:bg-secondary"
          >
            Ask about this product
          </Link>
        </div>
      </section>
    </div>
  );
}
