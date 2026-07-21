import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatINR, type Product, type ProductVariant } from "@/data/products";
import { useShop } from "@/store/shop-store";

type Props = {
  product: Product;
  variant: ProductVariant;
  qty: number;
  onQtyChange: (q: number) => void;
};

export function StickyCartBar({ product, variant, qty, onQtyChange }: Props) {
  const { addToCart } = useShop();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm safe-area-bottom">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex items-center rounded-full border border-border">
          <button
            onClick={() => onQtyChange(Math.max(1, qty - 1))}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => onQtyChange(qty + 1)}
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold text-primary leading-tight">
            {formatINR(variant.price * qty)}
          </p>
          <p className="text-[11px] text-muted-foreground truncate">{variant.weight}</p>
        </div>

        <button
          onClick={() => {
            addToCart(product.id, variant.weight, qty);
            toast.success(`${product.name} (${variant.weight}) added to cart`);
          }}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
}
