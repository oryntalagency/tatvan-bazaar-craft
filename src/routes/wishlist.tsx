import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { useShop } from "@/store/shop-store";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Tatvan" },
      { name: "description", content: "Save your favourite Tatvan organic products for later." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-x relative py-20 text-primary-foreground">
          <h1 className="max-w-3xl font-display text-5xl md:text-6xl">Your Wishlist</h1>
          <p className="mt-3 text-lg text-primary-foreground/85">{items.length} saved item(s)</p>
        </div>
      </section>

      {items.length === 0 ? (
        <div className="container-x flex flex-col items-center py-24 text-center">
          <div className="rounded-full bg-secondary p-6 text-primary">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="mt-6 font-display text-3xl text-primary">Nothing saved yet</h2>
          <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Browse products
          </Link>
        </div>
      ) : (
        <section className="container-x py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
