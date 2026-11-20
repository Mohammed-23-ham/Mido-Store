import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "The Elixir" },
  { href: "/checkout", label: "Checkout" },
] as const;

const helpLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/story", label: "Our Story" },
] as const;

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-3 sm:gap-8 sm:px-8 lg:px-10">
        <div className="sm:pr-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-fraunces)] text-2xl transition-colors hover:text-primary"
          >
            Aura Botanica
          </Link>
          <p className="mt-2 max-w-xs text-sm leading-5 text-muted-foreground">
            Clean, plant-powered skincare rooted in Mediterranean olive groves.
          </p>
        </div>

        <nav aria-labelledby="footer-shop-heading">
          <h2 id="footer-shop-heading" className="mb-3 text-base font-medium">
            Shop
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {shopLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-help-heading">
          <h2 id="footer-help-heading" className="mb-3 text-base font-medium">
            Help
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {helpLinks.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>

      <div className="border-t px-5 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aura Botanica. All rights reserved.
      </div>
    </footer>
  );
}
