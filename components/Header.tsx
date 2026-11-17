import AnnouncementMarquee from "@/components/shadcn-space/marquee/marquee-05";
import Link from 'next/link';
import { Menu } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  return (
    <>
      <AnnouncementMarquee />
      <header className="sticky top-0 z-50">
        <div className="border-b bg-background/90 backdrop-blur flex items-center justify-between py-4 px-3 sm:px-6 font-display text-primary-accent">
          <div className="col hover:text-primary text-xl sm:text-2xl">Mido-Store</div>
          <nav className="hidden flex-row gap-5 text-normal font-light md:flex">
            {navLinks.map(({ href, label }) => (
              <Link className="hover:text-primary" href={href} key={label}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="col hover:text-primary buttons flex items-center gap-1 sm:gap-2 md:gap-4">
            <select
              aria-label="Currency"
              defaultValue="USD"
              className="h-9 scheme-light rounded-full border border-border bg-transparent px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring dark:scheme-dark sm:px-3 sm:text-sm"
            >
              <option className="bg-card text-card-foreground" value="USD">
                USD
              </option>
              <option className="bg-card text-card-foreground" value="EUR">
                EUR
              </option>
              <option className="bg-card text-card-foreground" value="SAR">
                SAR
              </option>
            </select>
            <ThemeToggle />
            <CartDrawer />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
                >
                  <Menu aria-hidden="true" size={22} strokeWidth={1.8} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                {navLinks.map(({ href, label }) => (
                  <DropdownMenuItem asChild key={label}>
                    <Link className="w-full" href={href}>
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
