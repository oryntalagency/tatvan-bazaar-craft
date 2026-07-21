import { Link } from "@tanstack/react-router";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Leaf,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { formatINR, getCategory, type Product, type ProductVariant } from "@/data/products";
import { useShop } from "@/store/shop-store";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (v: ProductVariant) => void;
  qty: number;
  onQtyChange: (q: number) => void;
};

const trustBadges = [
  { icon: Truck, label: "Free Shipping", sub: "Orders above ₹999" },
  { icon: ShieldCheck, label: "Lab Tested", sub: "Every batch verified" },
  { icon: Leaf, label: "100% Natural", sub: "No additives" },
  { icon: Award, label: "Certified Organic", sub: "FSSAI approved" },
];

export function ProductInfo({
  product,
  selectedVariant,
  onSelectVariant,
  qty,
  onQtyChange,
}: Props) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);
  const category = getCategory(product.category);

  const currentPrice = selectedVariant.price;
  const currentCompareAt = selectedVariant.compareAt;
  const discount =
    currentCompareAt && currentCompareAt > currentPrice
      ? Math.round(((currentCompareAt - currentPrice) / currentCompareAt) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <nav
        className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          to="/shop/$category"
          params={{ category: product.category }}
          className="capitalize hover:text-primary transition-colors"
        >
          {category?.name ?? product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Title + tagline */}
      <div>
        <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl lg:text-[2.5rem]">
          {product.name}
        </h1>
        {product.tagline && (
          <p className="mt-1.5 text-sm text-muted-foreground">{product.tagline}</p>
        )}
      </div>

      {/* Rating summary */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(product.rating)
                  ? "fill-gold text-gold"
                  : i < product.rating
                    ? "fill-gold/50 text-gold"
                    : "text-muted-foreground/30",
              )}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">{product.rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">· {product.reviewCount} reviews</span>
      </div>

      {/* Price block */}
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-display text-3xl font-bold text-primary">
          {formatINR(currentPrice)}
        </span>
        {currentCompareAt && currentCompareAt > currentPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatINR(currentCompareAt)}
          </span>
        )}
        {discount > 0 && (
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-600">
            {discount}% off
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground -mt-2">Inclusive of all taxes</p>

      {/* Variant / weight selector */}
      <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {product.weightOptions.length > 0 ? "Select size" : "Options"}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button
              key={v.weight}
              onClick={() => onSelectVariant(v)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 min-h-[44px]",
                selectedVariant.weight === v.weight
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border text-foreground/80 hover:border-primary/60 hover:bg-primary/5",
              )}
            >
              <span>{v.weight}</span>
              <span
                className={cn(
                  "text-xs",
                  selectedVariant.weight === v.weight
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {formatINR(v.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart + Wishlist */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <div className="inline-flex items-center rounded-full border border-border">
          <button
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-secondary"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => onQtyChange(qty + 1)}
            className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-secondary"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={() => {
            addToCart(product.id, selectedVariant.weight, qty);
            toast.success(`${product.name} (${selectedVariant.weight}) added to cart`);
          }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95 active:scale-[0.98] min-h-[48px]"
        >
          <ShoppingBag className="h-4 w-4" /> Add to cart
        </button>

        <button
          onClick={() => {
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors",
            wished
              ? "border-destructive text-destructive"
              : "border-border hover:border-destructive hover:text-destructive",
          )}
        >
          <Heart className={cn("h-5 w-5", wished && "fill-current")} />
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4 lg:grid-cols-4">
        {trustBadges.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-secondary/30 px-3 py-3"
          >
            <Icon className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{label}</p>
              <p className="text-[11px] text-muted-foreground truncate">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      {product.benefits.length > 0 && (
        <div className="pt-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Key benefits
          </p>
          <ul className="grid gap-1.5">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                <Leaf className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
