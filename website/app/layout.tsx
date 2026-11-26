
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const BASE = "/DOLLARSPLAY-OFFICIAL-WEBSITE";

export const metadata: Metadata = {
  title: "DollarsPlay | Play More. Achieve More.",
  description:
    "Explore games, tasks, referrals and rewards with DollarsPlay.",
  icons: {
    icon: `${BASE}/logo.png`,
  },
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features/" },
  { label: "How It Works", href: "/how-it-works/" },
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms/" },
  { label: "Cookie Policy", href: "/cookies/" },
  { label: "Support", href: "/support/" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="DollarsPlay Home"
            >
              <img
                src={`${BASE}/logo.png`}
                alt="DollarsPlay Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-bold tracking-wide">
                DOLLARSPLAY
              </span>
            </Link>

            <nav
              aria-label="Main navigation"
              className="flex flex-wrap items-center gap-4 text-sm"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-green-400"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer>
          <div className="mx-auto max-w-7xl px-5 py-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <p className="font-bold tracking-wide">DOLLARSPLAY</p>

              <nav
                aria-label="Footer navigation"
                className="flex flex-wrap gap-4 text-sm"
              >
                {footerLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-green-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <p className="mt-6 text-sm opacity-60">
              © {new Date().getFullYear()} DollarsPlay. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
