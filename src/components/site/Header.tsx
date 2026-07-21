import { Link } from "@tanstack/react-router";
import {
  Heart, Menu, Search, ShoppingBag, X, ChevronDown, Plus, Minus, Boxes,
  Droplet, Milk, Wheat, Sprout, FlaskConical, Leaf, MapPin, Percent,
} from "lucide-react";
import { useState } from "react";
import logoUrl from "@/assets/tatvan-logo.png";
import { categories } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/contact", label: "Contact" },
] as const;

const storyLinks = [
  { to: "/about", label: "Our Story", tagline: "Where Tatvan began" },
  { to: "/story/philosophy", label: "Our Philosophy", tagline: "What we believe in" },
  { to: "/story/traceability", label: "Traceability", tagline: "Farm to jar" },
  { to: "/story/media", label: "Media Recognition", tagline: "Press & awards" },
] as const;


const categoryIcons: Record<string, typeof Droplet> = {
  honey: Droplet,
  ghee: Milk,
  atta: Wheat,
  rice: Sprout,
  oils: FlaskConical,
};

export function Header() {
  const { cartCount, wishlistCount } = useShop();
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="container-x flex h-9 items-center justify-center text-center text-[11px] tracking-wide sm:text-xs">
          Free shipping across India on orders above ₹999 · COD available
        </div>
      </div>
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img src={logoUrl} alt="Tatvan logo" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
          <span className="font-display text-xl tracking-wide text-primary sm:text-2xl">Tatvan</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setStoryOpen(true)}
            onMouseLeave={() => setStoryOpen(false)}
          >
            <button
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              onClick={() => setStoryOpen((v) => !v)}
              aria-expanded={storyOpen}
            >
              Our Story
              <ChevronDown className={`h-4 w-4 transition-transform ${storyOpen ? "rotate-180" : ""}`} />
            </button>
            {storyOpen && (
              <>
                <div className="absolute left-1/2 top-full h-3 w-full -translate-x-1/2" />
                <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 rounded-2xl border border-border bg-popover p-2 shadow-soft">
                  <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-border bg-popover" />
                  <ul className="relative flex flex-col">
                    {storyLinks.map((s) => (
                      <li key={s.to}>
                        <Link
                          to={s.to}
                          onClick={() => setStoryOpen(false)}
                          className="flex flex-col rounded-lg px-3 py-2 transition-colors hover:bg-secondary/50"
                        >
                          <span className="text-sm font-semibold text-primary">{s.label}</span>
                          <span className="text-[11px] text-muted-foreground">{s.tagline}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
            >
              Shop by Category
              <ChevronDown className={`h-4 w-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>

            {catOpen && (
              <>
                <div className="absolute left-1/2 top-full h-3 w-full -translate-x-1/2" />
                <div className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-2xl border border-border bg-popover p-3 shadow-soft">
                  <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-border bg-popover" />
                  <ul className="flex items-stretch divide-x divide-border">
                    {categories.map((c) => {
                      const Icon = categoryIcons[c.slug] ?? Droplet;
                      return (
                        <li key={c.slug}>
                          <Link
                            to="/shop/$category"
                            params={{ category: c.slug }}
                            onClick={() => setCatOpen(false)}
                            className="group flex w-36 flex-col items-center gap-2 px-4 py-2 text-center transition-colors hover:bg-secondary/50 rounded-lg"
                          >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/15 bg-secondary/40 text-primary transition-transform group-hover:scale-105">
                              <Icon className="h-7 w-7" strokeWidth={1.6} />
                            </div>
                            <span className="text-sm font-semibold text-primary">{c.name}</span>
                            <span className="text-[11px] leading-tight text-muted-foreground">{c.tagline}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Link to="/wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background">
          <div className="container-x flex items-center gap-2 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              placeholder="Search for honey, ghee, atta…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-medium text-muted-foreground hover:text-primary"
              aria-label="Close search"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ---- MOBILE DRAWER ---- */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div className="fixed inset-y-0 left-0 z-50 flex w-[min(85vw,360px)] flex-col bg-[color:var(--cream)] text-[color:var(--forest-deep)] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden">
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-[color:var(--forest-deep)]/10 px-5 py-4">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <img src={logoUrl} alt="Tatvan" className="h-9 w-9 object-contain" />
                <span className="font-display text-lg tracking-wide">Tatvan</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-[color:var(--forest-deep)]/10"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-5">
              {/* Category shortcut grid — 3 columns */}
              <div className="grid grid-cols-3 gap-4">
                {categories.map((c) => {
                  const Icon = categoryIcons[c.slug] ?? Droplet;
                  return (
                    <Link
                      key={c.slug}
                      to="/shop/$category"
                      params={{ category: c.slug }}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-center gap-2 py-2 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--forest-deep)]/20 bg-white text-[color:var(--forest-deep)] transition-transform hover:scale-105">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-semibold leading-tight">{c.name}</span>
                    </Link>
                  );
                })}
                {/* Extra tile: All Products */}
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-2 py-2 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[color:var(--forest-deep)]/20 bg-white text-[color:var(--forest-deep)] transition-transform hover:scale-105">
                    <Boxes className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-semibold leading-tight">All</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-[color:var(--forest-deep)]/10" />

              {/* SHOP ALL */}
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-lg border border-[color:var(--forest-deep)]/15 bg-white text-sm font-bold uppercase tracking-wider text-[color:var(--forest-deep)] transition-colors hover:bg-[color:var(--forest-deep)]/5"
              >
                Shop All
              </Link>

              {/* Divider */}
              <div className="my-5 h-px bg-[color:var(--forest-deep)]/10" />

              {/* COLLECTIVE MEMBERSHIP */}
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center gap-3 rounded-lg px-1 transition-colors hover:bg-[color:var(--forest-deep)]/5"
              >
                <span className="inline-flex items-center rounded-md bg-[color:var(--forest-deep)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[color:var(--cream)]">
                  Collective
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide">Membership</span>
              </Link>

              {/* Divider */}
              <div className="my-5 h-px bg-[color:var(--forest-deep)]/10" />

              {/* Expandable: SHOP BY CONCERN */}
              <MobileDrawerExpandable title="Shop by Concern" icon={<Leaf className="h-4 w-4" />}>
                {[
                  { label: "Immunity Boosters", to: "/shop/honey" },
                  { label: "Daily Essentials", to: "/shop/ghee" },
                  { label: "Heart Healthy", to: "/shop/oils" },
                  { label: "Weight Management", to: "/shop/atta" },
                  { label: "Kids & Family", to: "/shop" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center rounded-lg px-3 text-sm text-[color:var(--forest-deep)]/80 transition-colors hover:bg-[color:var(--forest-deep)]/5 hover:text-[color:var(--forest-deep)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </MobileDrawerExpandable>

              {/* Expandable: FARM VISIT */}
              <MobileDrawerExpandable title="Farm Visit" icon={<MapPin className="h-4 w-4" />}>
                {storyLinks.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center rounded-lg px-3 text-sm text-[color:var(--forest-deep)]/80 transition-colors hover:bg-[color:var(--forest-deep)]/5 hover:text-[color:var(--forest-deep)]"
                  >
                    {s.label}
                  </Link>
                ))}
              </MobileDrawerExpandable>

              {/* Expandable: SAVER COMBOS */}
              <MobileDrawerExpandable title="Saver Combos" icon={<Percent className="h-4 w-4" />}>
                {[
                  { label: "Honey + Ghee Combo", to: "/shop" },
                  { label: "Weekly Essentials Pack", to: "/shop" },
                  { label: "Family favourites Bundle", to: "/shop" },
                  { label: "Gift Box Collections", to: "/shop" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center rounded-lg px-3 text-sm text-[color:var(--forest-deep)]/80 transition-colors hover:bg-[color:var(--forest-deep)]/5 hover:text-[color:var(--forest-deep)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </MobileDrawerExpandable>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile drawer expandable row                                      */
/* ------------------------------------------------------------------ */

function MobileDrawerExpandable({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex h-12 w-full items-center justify-between rounded-lg px-1 text-left transition-colors hover:bg-[color:var(--forest-deep)]/5"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[color:var(--forest-deep)]">
          {icon}
          {title}
        </span>
        {expanded ? (
          <Minus className="h-4 w-4 text-[color:var(--forest-deep)]/60" />
        ) : (
          <Plus className="h-4 w-4 text-[color:var(--forest-deep)]/60" />
        )}
      </button>
      {expanded && (
        <div className="ml-1 mt-1 flex flex-col gap-0.5 pb-2 pl-2">
          {children}
        </div>
      )}
      <div className="h-px bg-[color:var(--forest-deep)]/10" />
    </div>
  );
}
