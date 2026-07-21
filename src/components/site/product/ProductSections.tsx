import { Star, BadgeCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Product, Review, FAQ, ComparisonRow } from "@/data/products";

/* ──────────── Description ──────────── */
export function ProductDescription({ product }: { product: Product }) {
  const paragraphs = product.description.split("\n\n").filter(Boolean);
  return (
    <section className="py-10 md:py-14">
      <h2 className="mb-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
        About this product
      </h2>
      <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {p}
          </p>
        ))}
      </div>
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

/* ──────────── FAQ Accordion ──────────── */
export function ProductFAQ({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-10 md:py-14">
      <h2 className="mb-4 font-display text-2xl font-semibold text-foreground md:text-3xl">
        Frequently asked questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="divide-y divide-border rounded-xl border border-border"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id} className="px-4">
            <AccordionTrigger className="min-h-[48px] py-4 text-sm font-semibold text-foreground hover:no-underline hover:text-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-foreground/70 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
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
