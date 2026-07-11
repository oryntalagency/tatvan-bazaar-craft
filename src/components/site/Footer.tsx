import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Facebook, Youtube, Linkedin, ChevronDown, ArrowRight, Leaf } from "lucide-react";
import logoAsset from "@/assets/tatvan-logo.png.asset.json";
import { categories } from "@/data/products";

type ColumnKey = "categories" | "general" | "connect";

const generalLinks = [
  { to: "/about", label: "Our Story" },
  { to: "/story/philosophy", label: "Our Philosophy" },
  { to: "/story/traceability", label: "Traceability" },
  { to: "/story/media", label: "Media Recognition" },
  { to: "/contact", label: "Contact Us" },
];

const connectLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "LinkedIn" },
];

export function Footer() {
  const [openCol, setOpenCol] = useState<ColumnKey | null>(null);

  const toggle = (key: ColumnKey) => setOpenCol((c) => (c === key ? null : key));

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-[color:var(--cream)] text-[color:var(--forest-deep)]">
      {/* Decorative rolling hills */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-90">
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0,140 C220,80 420,200 720,140 C1020,80 1220,180 1440,120 L1440,200 L0,200 Z" fill="oklch(0.85 0.09 140)" />
          <path d="M0,170 C260,120 520,210 820,160 C1120,110 1300,200 1440,160 L1440,200 L0,200 Z" fill="oklch(0.72 0.11 145)" />
        </svg>
      </div>

      {/* Sun & birds */}
      <div className="pointer-events-none absolute right-8 top-8 hidden md:block">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-[color:var(--gold)] opacity-90" />
          <svg viewBox="0 0 60 24" className="absolute -left-16 top-2 h-6 w-16 text-[color:var(--forest-deep)]">
            <path d="M2 18 C 8 8, 14 8, 20 18 M 22 20 C 28 12, 34 12, 40 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1fr_1.4fr_1fr]">
        {/* Logo column */}
        <div className="flex flex-col items-start">
          <img src={logoAsset.url} alt="Tatvan" className="h-24 w-24" />
          <span className="mt-3 font-display text-3xl tracking-wide">Tatvan</span>
          <span className="mt-1 text-xs uppercase tracking-[0.25em] text-[color:var(--forest-deep)]/70">Organic Farms</span>
        </div>

        {/* Center — newsletter + link menus */}
        <div className="flex flex-col items-center text-center">
          <h3 className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
            THE ORGANIC WAY OF LIFE
          </h3>
          <p className="mt-3 max-w-md text-sm text-[color:var(--forest-deep)]/75">
            Subscribe for special offers, farm stories & be part of our movement.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex w-full max-w-md items-center rounded-full border border-[color:var(--forest-deep)]/25 bg-background/70 px-5 py-3"
          >
            <input
              type="email"
              required
              placeholder="Your e-mail"
              className="w-full bg-transparent text-sm text-[color:var(--forest-deep)] placeholder:text-[color:var(--forest-deep)]/50 focus:outline-none"
            />
            <button
              aria-label="Subscribe"
              className="ml-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--forest-deep)] text-[color:var(--cream)] transition-transform hover:scale-105"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Three link menus */}
          <div className="mt-8 flex w-full max-w-md items-start justify-center divide-x divide-[color:var(--forest-deep)]/20 text-sm font-semibold uppercase tracking-wider">
            <FooterMenu
              label="Categories"
              isOpen={openCol === "categories"}
              onToggle={() => toggle("categories")}
            >
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/shop/$category"
                    params={{ category: c.slug }}
                    className="block py-1 text-sm font-normal normal-case tracking-normal text-[color:var(--forest-deep)]/80 hover:text-[color:var(--forest-deep)]"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </FooterMenu>

            <FooterMenu
              label="General"
              isOpen={openCol === "general"}
              onToggle={() => toggle("general")}
            >
              {generalLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block py-1 text-sm font-normal normal-case tracking-normal text-[color:var(--forest-deep)]/80 hover:text-[color:var(--forest-deep)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </FooterMenu>

            <FooterMenu
              label="Connect"
              isOpen={openCol === "connect"}
              onToggle={() => toggle("connect")}
            >
              {connectLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block py-1 text-sm font-normal normal-case tracking-normal text-[color:var(--forest-deep)]/80 hover:text-[color:var(--forest-deep)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </FooterMenu>
          </div>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-5 text-[color:var(--forest-deep)]">
            <a href="#" aria-label="Facebook" className="hover:opacity-70"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:opacity-70"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:opacity-70"><Youtube className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-70"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>

        {/* Right column — company info */}
        <div className="text-sm leading-relaxed text-[color:var(--forest-deep)]/85">
          <p className="font-semibold">TATVAN ORGANIC FARMS PVT. LTD.</p>
          <p className="mt-3">(CIN): U01110MH2024PTC000000</p>
          <p className="mt-3">
            2nd Floor, Green Acres,<br />
            MG Road, Bandra West,<br />
            Mumbai, Maharashtra, 400050
          </p>
          <p className="mt-3">
            Email: <a href="mailto:hello@tatvan.in" className="underline underline-offset-4 hover:opacity-70">hello@tatvan.in</a>
          </p>
          <p className="mt-2">Tel: +91 98765 43210</p>
          <p className="mt-2">Grievances: +91 98765 43211</p>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-[color:var(--forest-deep)]/15 bg-[color:var(--cream)]/70 backdrop-blur">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-[color:var(--forest-deep)]/70 md:flex-row">
          <p className="flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5" /> © {new Date().getFullYear()} Tatvan. Made with care in India.
          </p>
          <p>Certified Organic · Chemical Free · Ethically Sourced</p>
        </div>
      </div>
    </footer>
  );
}

function FooterMenu({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex-1 px-4">
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-1 text-[color:var(--forest-deep)] hover:opacity-80"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <ul className="absolute left-1/2 top-full z-20 mt-3 w-48 -translate-x-1/2 rounded-xl border border-[color:var(--forest-deep)]/15 bg-background p-3 text-left shadow-soft">
          {children}
        </ul>
      )}
    </div>
  );
}
