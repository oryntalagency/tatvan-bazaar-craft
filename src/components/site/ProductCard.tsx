import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Star, ChevronDown, ShoppingCart } from "lucide-react";
import { formatINR, type Product } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const badgeColors: Record<string, string> = {
  Bestseller: "bg-[hsl(140_45%_42%)] text-white",
  New: "bg-[hsl(140_45%_42%)] text-white",
  Heritage: "bg-[hsl(140_45%_42%)] text-white",
  Limited: "bg-[hsl(0_45%_42%)] text-white",
  Premium: "bg-[hsl(0_45%_42%)] text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);

  const defaultVariant =
    product.variants.find((v) => v.weight === product.weightOptions[0]) ??
    product.variants[0];
  const [selected, setSelected] = useState(defaultVariant);

  const handleAdd = () => {
    addToCart(product.id, selected.weight);
    toast.success(`${product.name} (${selected.weight}) added to cart`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft">
      {/* ---- IMAGE + BADGE + WISHLIST ---- */}
      <div className="relative block aspect-square overflow-hidden bg-secondary">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="block h-full w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badge — top-left */}
        {product.badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
              badgeColors[product.badge] ?? "bg-primary text-primary-foreground",
            )}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist heart — top-right */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          className={cn(
            "absolute right-3 top-3 rounded-full bg-background/90 p-2 shadow-card transition-colors",
            wished ? "text-destructive" : "text-foreground/70 hover:text-destructive",
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>
      </div>

      {/* ---- CONTENT ---- */}
      <div className="flex flex-1 flex-col p-4">
        {/* Row 1: Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="min-w-0 flex-1"
          >
            <h3 className="line-clamp-2 text-sm font-bold leading-snug text-foreground group-hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <span className="shrink-0 text-sm font-bold text-primary">
            {formatINR(selected.price)}
          </span>
        </div>

        {/* Row 2: Subtitle / tagline */}
        {product.tagline && (
          <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
            {product.tagline}
          </p>
        )}

        {/* Row 3: Star rating + review count */}
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-xs font-medium text-foreground">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            | {product.reviewCount.toLocaleString()} Reviews
          </span>
        </div>

        {/* ---- SPACER pushes remaining content to bottom ---- */}
        <div className="flex-1" />

        {/* Row 4: Variant selector */}
        {product.variants.length > 1 ? (
          <div className="relative mt-3">
            <select
              value={selected.weight}
              onChange={(e) => {
                const v = product.variants.find((vr) => vr.weight === e.target.value);
                if (v) setSelected(v);
              }}
              className="w-full appearance-none rounded-lg border border-border bg-secondary/50 px-3 py-2 pr-8 text-xs font-medium text-foreground transition-colors focus:border-primary focus:outline-none"
            >
              {product.variants.map((v) => (
                <option key={v.weight} value={v.weight}>
                  {v.weight}
                  {v.compareAt ? ` — ${formatINR(v.price)}` : ""}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        ) : (
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            {product.variants[0].weight}
          </p>
        )}

        {/* Row 5: Full-width ADD TO CART */}
        <button
          onClick={handleAdd}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[hsl(150_40%_30%)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[hsl(150_40%_25%)]"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
