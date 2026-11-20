"use client";

import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { useCurrency } from "@/components/providers/currency-provider";

export default function AnnouncementMarquee() {
  const { format } = useCurrency();
  const announcement = `Free shipping on orders over ${format(75)} · Use code Mido for 20% off · 30-day money-back guarantee`;

  return (
    <section
      aria-label="Store announcements"
      className="w-full h-7 overflow-hidden bg-primary text-primary-foreground"
    >
      <p className="sr-only">{announcement}</p>
      <Marquee
        aria-hidden="true"
        className="py-2 [--duration:24s] [--gap:2rem]"
      >
        <span className="whitespace-nowrap text-sm font-medium">
          {announcement}
        </span>
      </Marquee>
    </section>
  );
}
