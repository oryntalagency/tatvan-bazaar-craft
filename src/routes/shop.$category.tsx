import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductVideoReviews } from "@/components/site/product/ProductSections";
import { categories, getCategory, getProductsByCategory, products, type Product, type VideoReview } from "@/data/products";
import { useShop } from "@/store/shop-store";
import heroFarm from "@/assets/hero-farm.jpg";
import heroBeekeeper from "@/assets/story-beekeeper.jpg";
import heroBilona from "@/assets/story-bilona-ghee.jpg";
import heroWheat from "@/assets/story-wheat-hands.jpg";
import heroFarmer from "@/assets/story-farmer-family.jpg";
import heroMill from "@/assets/story-stone-mill.jpg";

const categoryHeroImages: Record<string, string> = {
  honey: heroBeekeeper,
  ghee: heroBilona,
  atta: heroWheat,
  rice: heroFarmer,
  oils: heroMill,
};

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category, products: getProductsByCategory(params.category) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.name} — Tatvan` },
          { name: "description", content: `${loaderData.category.name}: ${loaderData.category.tagline}. Shop pure, organic ${loaderData.category.name.toLowerCase()} from Tatvan.` },
          { property: "og:title", content: `${loaderData.category.name} — Tatvan` },
          { property: "og:description", content: loaderData.category.tagline },
        ]
      : [{ title: "Category — Tatvan" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryPage() {
  const { category, products: categoryProducts } = Route.useLoaderData();
  const { addToCart } = useShop();

  const categoryProductIds = new Set(categoryProducts.map((p) => p.id));
  const categoryVideoReviews: VideoReview[] = products
    .filter((p) => categoryProductIds.has(p.id))
    .flatMap((p) => p.videoReviews ?? []);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={categoryHeroImages[category.slug] ?? heroFarm} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-x relative py-28 text-primary-foreground">
          <div className="mb-3 flex items-center gap-2 text-xs text-primary-foreground/70">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary-foreground">Shop</Link>
            <span>/</span>
            <span className="text-primary-foreground">{category.name}</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">{category.name}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85">{category.tagline}</p>
        </div>
      </section>

      <section className="container-x py-12">
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/shop" className="rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:border-primary hover:text-primary">
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop/$category"
              params={{ category: c.slug }}
              className={
                c.slug === category.slug
                  ? "rounded-full border border-primary bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                  : "rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary"
              }
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {categoryProducts.map((p: Product) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {categoryVideoReviews.length > 0 && (
        <section className="container-x pb-20">
          <ProductVideoReviews
            videoReviews={categoryVideoReviews}
            allProducts={products}
            onAddToCart={(pid, weight) => addToCart(pid, weight)}
          />
        </section>
      )}
    </>
  );
}

function CategoryNotFound() {
  return (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-4xl text-primary">Category not found</h1>
      <p className="mt-3 text-muted-foreground">The category you're looking for doesn't exist.</p>
      <Link to="/shop" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">
        Back to shop
      </Link>
    </div>
  );
}
