import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Leaf, Sprout, ShieldCheck, Truck, Gift, CloudRain,
  PackageOpen, Boxes, BadgeIndianRupee, Droplet, Milk, Wheat, Play,
  Star, ChevronLeft, ChevronRight, FlaskConical, Sparkles, Tag,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, formatINR, products } from "@/data/products";
import heroImg from "@/assets/hero-farm.jpg";
import heroSlide1 from "@/assets/story-beekeeper.jpg";
import heroSlide2 from "@/assets/story-bilona-ghee.jpg";
import promoRightImg from "@/assets/promo-right-combined.jpg";
import promoMonsoonImg from "@/assets/promo-monsoon-lifestyle.jpg";

/* ------------------------------------------------------------------ */
/*  CATEGORY SHORTCUTS — data array                                   */
/* ------------------------------------------------------------------ */

const categoryShortcuts = [
  { icon: Gift,          label: "Membership Deals", to: "/shop",                bg: "bg-[hsl(25_55%_20%)]",  iconColor: "text-[hsl(45_70%_75%)]" },
  { icon: CloudRain,     label: "Monsoon Special",  to: "/shop/ghee",           bg: "bg-[hsl(150_35%_28%)]", iconColor: "text-[hsl(45_70%_75%)]" },
  { icon: Sparkles,      label: "New Launches",     to: "/shop/honey",          bg: "bg-[hsl(85_30%_32%)]",  iconColor: "text-[hsl(45_70%_75%)]" },
  { icon: Boxes,         label: "All Products",     to: "/shop",                bg: "bg-[hsl(150_40%_18%)]", iconColor: "text-[hsl(45_70%_75%)]" },
  { icon: BadgeIndianRupee, label: "Under ₹999",   to: "/shop",                bg: "bg-[hsl(25_50%_25%)]",  iconColor: "text-[hsl(45_70%_75%)]" },
  { icon: Tag,           label: "Best Sellers",     to: "/shop/atta",           bg: "bg-[hsl(45_40%_28%)]",  iconColor: "text-[hsl(45_70%_75%)]" },
];

/* ------------------------------------------------------------------ */
/*  BANNER CAROUSEL — slides data array                               */
/* ------------------------------------------------------------------ */

const bannerSlides = [
  {
    id: "beekeeper",
    image: heroSlide1,
    alt: "Meet our beekeepers in the Himalayan foothills",
    badge: null as string | null,
    badgeColor: "",
    heading: "Meet Our Beekeepers",
    sub: "Deep in the Himalayan foothills, our beekeepers tend wild hives the traditional way — no shortcuts, no chemicals.",
    cta: { label: "Shop Honey", to: "/shop/honey" },
    overlay: "from-[hsl(150_40%_12%)]/90 via-[hsl(150_40%_12%)]/50 to-transparent",
    align: "left" as const,
  },
  {
    id: "collective",
    image: promoMonsoonImg,
    alt: "Monsoon Immunity range — 18% off for members",
    badge: "Exclusive",
    badgeColor: "bg-[hsl(45_90%_65%)] text-[hsl(25_55%_20%)]",
    heading: "Looks like you're Monsoon's favourite!",
    sub: "18% OFF FOR MEMBERS on our Monsoon Immunity range.",
    cta: { label: "Claim Offer", to: "/shop" },
    overlay: "from-[hsl(150_40%_12%)]/95 via-[hsl(150_40%_12%)]/60 to-transparent",
    align: "left" as const,
  },
  {
    id: "promo",
    image: promoRightImg,
    alt: "Permanent price drop and membership discounts",
    badge: "Price Drop",
    badgeColor: "bg-[hsl(15_75%_50%)] text-primary-foreground",
    heading: "Lower prices. Bigger rewards.",
    sub: "Bestsellers priced down & extra perks for members.",
    cta: { label: "Shop Now", to: "/shop" },
    overlay: "from-black/65 via-black/20 to-transparent",
    align: "left" as const,
  },
  {
    id: "ghee",
    image: heroSlide2,
    alt: "Traditional bilona ghee — slow-cooked to perfection",
    badge: null,
    badgeColor: "",
    heading: "A2 Bilona Ghee, The Old Way",
    sub: "Hand-churned from curd, slow-cooked on wood fire. Pure Kumaoni ghee that tastes like memory.",
    cta: { label: "Shop Ghee", to: "/shop/ghee" },
    overlay: "from-[hsl(25_55%_20%)]/85 via-[hsl(25_55%_20%)]/40 to-transparent",
    align: "left" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  ROUTE                                                             */
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/")({
  component: HomePage,
});

/* ------------------------------------------------------------------ */
/*  HOOK: prefers-reduced-motion                                      */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/*  HOOK: swipe detection (pointer events)                            */
/* ------------------------------------------------------------------ */

function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold = 50,
) {
  const startX = useRef(0);
  const startY = useRef(0);
  const tracking = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    tracking.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!tracking.current) return;
      tracking.current = false;
      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      }
    },
    [onSwipeLeft, onSwipeRight, threshold],
  );

  return { onPointerDown, onPointerUp };
}

/* ================================================================== */
/*  HOME PAGE                                                         */
/* ================================================================== */

function HomePage() {
  return (
    <SiteLayout>
      {/* ---- CATEGORY SHORTCUTS ---- */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container-x py-5 sm:py-8">
          <ul className="flex snap-x gap-5 overflow-x-auto scrollbar-hide sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible lg:gap-10">
            {categoryShortcuts.map(({ icon: Icon, label, to, bg, iconColor }) => (
              <li key={label} className="flex w-20 shrink-0 snap-center flex-col items-center gap-2 text-center sm:w-24 sm:gap-3">
                <Link
                  to={to}
                  aria-label={label}
                  className={`flex h-16 w-16 items-center justify-center rounded-full shadow-soft transition-transform hover:scale-110 sm:h-20 sm:w-20 ${bg}`}
                >
                  <Icon className={`h-7 w-7 sm:h-9 sm:w-9 ${iconColor}`} strokeWidth={1.6} />
                </Link>
                <span className="text-[11px] font-semibold leading-tight tracking-wide text-primary sm:text-xs">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- BANNER CAROUSEL ---- */}
      <section className="bg-secondary/30">
        <div className="container-x pb-10 pt-2">
          <BannerCarousel />
        </div>
      </section>

      {/* ---- HERO (tagline) ---- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
        </div>
        <div className="container-x relative flex min-h-[560px] flex-col justify-center py-24 text-primary-foreground">
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
            The taste of the earth, kept whole.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
            Raw honey, hand-churned ghee, stone-ground atta, heritage rice and cold-pressed oils — sourced from small Indian
            farms that still honour the old ways.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-transform hover:scale-[1.02]"
            >
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/50 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* ---- VALUE STRIP ---- */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-x grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Leaf, title: "100% Organic", text: "No chemicals, ever" },
            { icon: Sprout, title: "Farm Direct", text: "From small Indian farms" },
            { icon: ShieldCheck, title: "Lab Tested", text: "Every batch verified" },
            { icon: Truck, title: "Free Shipping", text: "On orders above ₹999" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- SHOP BY CATEGORY ---- */}
      <section className="container-x py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Shop by category</p>
            <h2 className="mt-2 font-display text-4xl text-primary">Five staples, done right.</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon =
              cat.slug === "honey" ? Droplet :
              cat.slug === "ghee"  ? Milk :
              cat.slug === "atta"  ? Wheat :
              cat.slug === "rice"  ? Sprout :
              FlaskConical;
            return (
              <Link
                key={cat.slug}
                to="/shop/$category"
                params={{ category: cat.slug }}
                className="group flex flex-col items-center gap-4 rounded-2xl p-6 text-center transition-colors hover:bg-secondary/60"
              >
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-primary/15 bg-background text-primary transition-transform group-hover:scale-105 sm:h-36 sm:w-36">
                  <Icon className="h-14 w-14 sm:h-16 sm:w-16" strokeWidth={1.4} />
                </div>
                <div>
                  <h3 className="font-display text-xl text-primary sm:text-2xl">{cat.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{cat.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---- BESTSELLERS ---- */}
      <section className="container-x pb-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Bestsellers</p>
            <h2 className="mt-2 font-display text-4xl text-primary">Loved by our community.</h2>
          </div>
          <Link
            to="/shop"
            className="hidden rounded-md bg-[hsl(25_55%_20%)] px-4 py-2 text-xs font-semibold text-[hsl(45_70%_75%)] transition-colors hover:bg-[hsl(25_55%_25%)] sm:inline-flex"
          >
            Shop More
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {products.map((p) => (
            <div key={p.id} className="w-[85%] shrink-0 snap-center sm:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="mt-4 text-center sm:hidden">
          <Link
            to="/shop"
            className="inline-flex rounded-md bg-[hsl(25_55%_20%)] px-4 py-2 text-xs font-semibold text-[hsl(45_70%_75%)] transition-colors hover:bg-[hsl(25_55%_25%)]"
          >
            Shop More
          </Link>
        </div>
      </section>

      {/* ---- STORY REELS ---- */}
      <section className="bg-[hsl(60_45%_90%)]">
        <div className="container-x py-20">
          <h2 className="text-center font-display text-3xl text-primary sm:text-4xl md:text-5xl">
            It Takes A Village To Make Good Food — Come Take A Peek!
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { title: "Meet Our Beekeepers", product: products[0], tag: "Behind the Honey" },
              { title: "Making of A2 Bilona Ghee", product: products[1], tag: "Farm Story" },
              { title: "Stone-Chakki Atta, Slow & Fresh", product: products[2], tag: "Millers at Work" },
              { title: "859+ of you asked for it", product: products[0], tag: "Loved by all" },
              { title: "From our farm to your kitchen", product: products[1], tag: "Journey" },
            ].map((v, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl bg-background shadow-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={v.product.image} alt={v.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    {v.tag}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/85 text-primary shadow-soft transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                  <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold leading-tight text-primary-foreground">
                    {v.title}
                  </p>
                </div>
                <Link
                  to="/product/$slug"
                  params={{ slug: v.product.slug }}
                  className="flex items-center gap-3 border-t border-border p-3"
                >
                  <img src={v.product.image} alt="" className="h-11 w-11 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-foreground">{v.product.name}</p>
                    <p className="text-xs text-muted-foreground">{formatINR(v.product.price)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- STORY BAND ---- */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-x grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/70">Our promise</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Food, the way our grandmothers knew it.
            </h2>
            <p className="mt-5 text-primary-foreground/80">
              Tatvan (तत्त्व) means essence. Every jar we send holds the essence of
              India's small farms — unhurried, honest and untouched by industrial shortcuts.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.map((p) => (
              <img key={p.id} src={p.image} alt={p.name} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ---- PRESS + REVIEWS ---- */}
      <section className="bg-[hsl(30_50%_96%)]">
        <div className="container-x py-16 sm:py-20">
          <div className="rounded-2xl bg-[hsl(30_15%_92%)] px-6 py-6 sm:py-8">
            <div className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 md:grid-cols-5">
              {[
                { name: "GQ", cls: "font-display text-3xl font-black tracking-tighter" },
                { name: "Hindustan Times", cls: "font-display text-lg font-semibold italic" },
                { name: "KRISHI JAGRAN", cls: "font-display text-base font-black tracking-tight" },
                { name: "myGov", cls: "font-display text-xl font-black lowercase tracking-tight" },
                { name: "THE HINDU", cls: "font-display text-lg font-semibold tracking-widest" },
              ].map((p) => (
                <div key={p.name} className={`text-foreground/80 ${p.cls}`}>
                  {p.name}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                name: "NITHIN KAMATH",
                role: "Founder, Rainmatter",
                initials: "NK",
                quote:
                  "At Tatvan, we care deeply about what we eat. Their farms stood out — clean food, deep purpose, and a clear mission to support farmer livelihoods. We're customers first.",
              },
              {
                name: "ANAND S AHUJA",
                role: "Founder, Bhaane",
                initials: "AA",
                quote:
                  "Pure love, pure taste, pure intention. Every product from Tatvan feels authentic and full of heart — from how it's grown to how it tastes. It inspires mindful eating.",
              },
              {
                name: "MIRA KAPOOR",
                role: "India",
                initials: "MK",
                quote:
                  "One of the few brands that makes ghee the traditional way — from dahi, not malai. That alone won me over. Delicious, wholesome, and always a repeat buy.",
              },
            ].map((r) => (
              <figure key={r.name} className="relative">
                <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-1">
                  <div className="min-w-0">
                    <div className="mb-2 flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="truncate text-sm font-bold tracking-wide text-primary">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <div
                    aria-hidden
                    className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary text-primary shadow-soft ring-4 ring-[hsl(30_50%_96%)]"
                  >
                    <span className="font-display text-lg font-bold">{r.initials}</span>
                  </div>
                </div>
                <blockquote className="-mt-6 rounded-2xl bg-[hsl(28_85%_72%)] p-6 pt-10 text-primary-foreground shadow-card">
                  <p className="text-sm font-semibold leading-relaxed">{r.quote}</p>
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/* ================================================================== */
/*  BANNER CAROUSEL COMPONENT                                         */
/* ================================================================== */

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const count = bannerSlides.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (dir: number) => setCurrent((i) => (i + dir + count) % count),
    [count],
  );

  const goTo = useCallback((i: number) => setCurrent(i), []);

  // Swipe handlers
  const swipe = useSwipe(() => go(1), () => go(-1));

  // Auto-advance
  useEffect(() => {
    if (prefersReducedMotion || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => go(1), 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prefersReducedMotion, paused, go]);

  const slide = bannerSlides[current];

  return (
    <div
      className="group/banner relative overflow-hidden rounded-2xl shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => {
        // Resume after 8 seconds of inactivity
        setTimeout(() => setPaused(false), 8000);
      }}
      {...swipe}
    >
      {/* ---- Slides ---- */}
      <div className="relative aspect-[16/7] w-full sm:aspect-[16/6] md:aspect-[16/5]">
        {bannerSlides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-400 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <Link to={s.cta.to} className="block h-full w-full">
              <img
                src={s.image}
                alt={s.alt}
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14">
                <div className="max-w-lg">
                  {s.badge && (
                    <span className={`mb-3 inline-block w-fit rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${s.badgeColor}`}>
                      {s.badge}
                    </span>
                  )}
                  <h2 className="font-display text-2xl leading-tight text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                    {s.heading}
                  </h2>
                  <p className="mt-2 max-w-md text-sm text-primary-foreground/85 sm:text-base">
                    {s.sub}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-xs font-semibold text-primary transition-transform hover:scale-[1.03] sm:text-sm">
                    {s.cta.label} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ---- Arrow buttons (desktop, appear on hover) ---- */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary opacity-0 shadow-soft backdrop-blur-sm transition-all hover:bg-background group-hover/banner:opacity-100 md:p-3"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary opacity-0 shadow-soft backdrop-blur-sm transition-all hover:bg-background group-hover/banner:opacity-100 md:p-3"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* ---- Dot indicators ---- */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}: ${bannerSlides[i].heading}`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-7 bg-primary-foreground"
                : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
