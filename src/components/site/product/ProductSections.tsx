import { Star, BadgeCheck, ChevronDown, ChevronRight, Droplet, Leaf, ShieldCheck, Award, Flame, Milk, Wheat, Sprout, Crown, Sparkles, Heart, Cog, Play, ShoppingBag } from "lucide-react";
import { useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useShop } from "@/store/shop-store";
import { formatINR, type Product, type Review, type FAQ, type ComparisonRow, type Highlight, type VideoReview } from "@/data/products";
import { toast } from "sonner";

const iconMap: Record<string, typeof Droplet> = {
  Droplet,
  Leaf,
  ShieldCheck,
  Award,
  Flame,
  Milk,
  Wheat,
  Sprout,
  Crown,
  Sparkles,
  Heart,
  Cog,
};

/* ──────────── Highlights / USP Row ──────────── */
export function ProductHighlights({ highlights }: { highlights: Highlight[] }) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6 md:gap-10 md:py-8">
      {highlights.map((h) => {
        const Icon = iconMap[h.icon] ?? Leaf;
        return (
          <div key={h.label} className="flex flex-col items-center gap-2.5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">{h.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ──────────── Video Reviews Section ──────────── */
export function ProductVideoReviews({
  videoReviews,
  allProducts,
  onAddToCart,
}: {
  videoReviews: VideoReview[];
  allProducts: Product[];
  onAddToCart: (productId: string, weight?: string) => void;
}) {
  if (!videoReviews || videoReviews.length === 0) return null;

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">See it in action</p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-foreground md:text-3xl">Customer Videos</h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scroll("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            aria-label="Scroll left"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide"
      >
        {videoReviews.map((vr) => {
          const linkedProduct = allProducts.find((p) => p.id === vr.productId) ?? allProducts[0];
          const firstVariant = linkedProduct.variants[0];

          return (
            <div
              key={vr.id}
              className="w-[220px] shrink-0 snap-start rounded-2xl border border-border bg-card shadow-card overflow-hidden"
            >
              {/* Video thumbnail (9:16 aspect) */}
              <div className="relative aspect-[9/16] overflow-hidden bg-secondary">
                <img
                  src={vr.thumbnailUrl}
                  alt={vr.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/85 text-primary shadow-soft transition-transform hover:scale-110">
                    <Play className="h-6 w-6 fill-current ml-0.5" />
                  </div>
                </div>
                {/* Title overlay */}
                <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold leading-tight text-primary-foreground">
                  {vr.title}
                </p>
              </div>

              {/* Product info strip */}
              <div className="flex items-center gap-3 p-3">
                <img
                  src={linkedProduct.image}
                  alt={linkedProduct.name}
                  className="h-11 w-11 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-foreground">{linkedProduct.name}</p>
                  <p className="text-xs text-primary font-semibold">{firstVariant ? formatINR(firstVariant.price) : formatINR(linkedProduct.price)}</p>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(linkedProduct.id, firstVariant?.weight);
                    toast.success(`${linkedProduct.name} added to cart`);
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                  aria-label={`Add ${linkedProduct.name} to cart`}
                >
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ──────────── Expandable Sections (Description, Ingredients, Usage, Benefits, Storage) ──────────── */
export function ProductExpandableSections({ product }: { product: Product }) {
  const paragraphs = product.description.split("\n\n").filter(Boolean);

  const sections: Array<{ id: string; label: string; icon: typeof Leaf; content: React.ReactNode }> = [
    {
      id: "description",
      label: "Description",
      icon: Leaf,
      content: (
        <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-3 last:mb-0">{p}</p>
          ))}
        </div>
      ),
    },
  ];

  if (product.ingredients) {
    sections.push({
      id: "ingredients",
      label: "Ingredients",
      icon: Droplet,
      content: <p className="text-sm text-foreground/80 leading-relaxed">{product.ingredients}</p>,
    });
  }

  if (product.usage) {
    sections.push({
      id: "usage",
      label: "How to Use",
      icon: ChevronRight,
      content: <p className="text-sm text-foreground/80 leading-relaxed">{product.usage}</p>,
    });
  }

  if (product.benefits && product.benefits.length > 0) {
    sections.push({
      id: "benefits",
      label: "Key Benefits",
      icon: Award,
      content: (
        <ul className="grid gap-2">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (product.storage) {
    sections.push({
      id: "storage",
      label: "Storage Info",
      icon: ShieldCheck,
      content: <p className="text-sm text-foreground/80 leading-relaxed">{product.storage}</p>,
    });
  }

  if (sections.length === 0) return null;

  return (
    <section className="py-10 md:py-14">
      <Accordion type="single" collapsible className="divide-y divide-border rounded-2xl border border-border overflow-hidden">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <AccordionItem key={section.id} value={section.id} className="px-0">
              <AccordionTrigger className="px-5 py-5 text-sm font-bold uppercase tracking-wider text-foreground/90 hover:no-underline hover:text-primary [&[data-state=open]]:text-primary">
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0" />
                  {section.label}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-1">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

/* ──────────── Comparison / Nutrition Table ──────────── */
export function ProductComparison({ title, rows }: { title: string; rows: ComparisonRow[] }) {
  if (!rows || rows.length === 0) return null;

  return (
    <section className="py-10 md:py-14">
      <h2 className="mb-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full min-w-[400px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-semibold text-foreground">Parameter</th>
              <th className="py-3 px-4 text-left font-semibold text-primary">Tatvan</th>
              {rows.some((r) => r.compareValue) && (
                <th className="py-3 pl-4 text-left font-medium text-muted-foreground">Others</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-3 pr-4 font-medium text-foreground/80">{row.parameter}</td>
                <td className="py-3 px-4 text-foreground">{row.value}</td>
                {row.compareValue && (
                  <td className="py-3 pl-4 text-muted-foreground">{row.compareValue}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ──────────── FAQ Accordion (Redesigned) ──────────── */
export function ProductFAQ({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* Warm background band */}
      <div className="absolute inset-0 bg-[var(--faq-bg)]" />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* Left: heading + subtext */}
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">FAQ</h2>
            <p className="mt-3 text-muted-foreground">Have questions? We've got answers.</p>
          </div>

          {/* Right: FAQ cards */}
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQCard key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQCard({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl bg-card border border-border shadow-card transition-all duration-300 overflow-hidden",
        open && "shadow-soft",
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-foreground">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 text-sm text-foreground/70 leading-relaxed">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── Reviews Section ──────────── */
export function ProductReviews({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  if (!reviews || reviews.length === 0) return null;

  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === stars).length;
    return { stars, count, pct: reviews.length > 0 ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <section className="py-10 md:py-14">
      <h2 className="mb-6 font-display text-2xl font-semibold text-foreground md:text-3xl">
        Customer reviews
      </h2>

      <div className="grid gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        {/* Summary */}
        <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/30 p-6 md:items-start">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 fill-gold text-gold" />
            <span className="font-display text-3xl font-bold text-foreground">
              {rating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{reviewCount} total reviews</p>
          <div className="mt-2 w-full space-y-1.5">
            {breakdown.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-right text-muted-foreground">{stars}</span>
                <Star className="h-3 w-3 fill-gold text-gold" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gold transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-5 text-right text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-border bg-card p-4 md:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {review.userInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{review.userName}</span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] text-green-600">
                        <BadgeCheck className="h-3 w-3" /> Verified purchase
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < review.rating ? "fill-gold text-gold" : "text-muted-foreground/30",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-foreground">{review.title}</h4>
                  <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{review.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
