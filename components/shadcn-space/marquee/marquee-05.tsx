import { Marquee } from "@/components/shadcn-space/animations/marquee";

const announcement =
  "Free shipping over 50$ · Use code Mido for 20% off · 30-day money-back guarantee";

export default function AnnouncementMarquee() {
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
