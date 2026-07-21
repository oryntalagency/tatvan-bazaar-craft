import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductVideoReviews } from "@/components/site/product/ProductSections";
import { categories, products } from "@/data/products";
import { useShop } from "@/store/shop-store";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/shop/")({
  component: ShopIndexPage,
});

function ShopIndexPage() {
  const { addToCart } = useShop();
  const allVideoReviews = products.flatMap((p) =>
    (p.videoReviews ?? []).map((vr) => ({ ...vr, product: p })),
  );

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-x relative py-[34] text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/80">Shop</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">All products</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85">
            A considered range of organic staples. Raw honey, A2 ghee, stone-ground atta, heritage rice and cold-pressed oils.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/shop"
            className="rounded-full border border-primary bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {allVideoReviews.length > 0 && (
        <section className="container-x pb-20">
          <ProductVideoReviews
            videoReviews={allVideoReviews}
            allProducts={products}
            onAddToCart={(pid, weight) => addToCart(pid, weight)}
          />
        </section>
      )}
    </>
  );
}
