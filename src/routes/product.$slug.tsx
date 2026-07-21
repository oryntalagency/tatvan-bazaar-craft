import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductGallery } from "@/components/site/product/ProductGallery";
import { ProductInfo } from "@/components/site/product/ProductInfo";
import { StickyCartBar } from "@/components/site/product/StickyCartBar";
import {
  ProductHighlights,
  ProductExpandableSections,
  ProductComparison,
  ProductFAQ,
  ProductReviews,
  ProductVideoReviews,
} from "@/components/site/product/ProductSections";
import { getProductBySlug, products, type ProductVariant } from "@/data/products";
import { useShop } from "@/store/shop-store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Tatvan` },
          { name: "description", content: loaderData.product.shortDescription },
          { property: "og:title", content: `${loaderData.product.name} — Tatvan` },
          { property: "og:description", content: loaderData.product.shortDescription },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Product — Tatvan" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-4xl text-primary">Product not found</h1>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
        >
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart } = useShop();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] ?? {
      weight: product.weightOptions[0] ?? "default",
      price: product.price,
      compareAt: product.compareAt,
    },
  );
  const [qty, setQty] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const stickyTriggerRef = useRef<HTMLDivElement>(null);

  // Derive images: prefer variant image if present, else use gallery
  const allImages = selectedVariant.image
    ? [selectedVariant.image, ...product.gallery.filter((g) => g !== selectedVariant.image)]
    : product.gallery;

  // Intersection observer for sticky bar trigger
  useEffect(() => {
    const el = stickyTriggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the trigger ref is OUT of the viewport (scrolled past)
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -100px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <SiteLayout>
      <div className="container-x pt-6 pb-24 md:pb-10">
        {/* Hero: two-column on desktop, stacked on mobile */}
        <section className="grid gap-8 pt-4 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:items-start">
          <ProductGallery images={allImages} alt={product.name} />

          {/* Right column (desktop) / below gallery (mobile) */}
          <div className="flex flex-col">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
              qty={qty}
              onQtyChange={setQty}
            />
            {/* Sticky bar trigger: when this scrolls out of view, sticky bar shows */}
            <div ref={stickyTriggerRef} className="h-0" />
          </div>
        </section>

        {/* Divider */}
        <hr className="my-4 border-border md:my-8" />

        {/* Product Highlights / USP Row */}
        {product.highlights && product.highlights.length > 0 && (
          <>
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="flex items-center justify-center">
                  <div className="h-px flex-1 bg-border" />
                  <div className="px-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Why Tatvan</p>
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </div>
            </div>
            <ProductHighlights highlights={product.highlights} />
            <hr className="my-4 border-border md:my-6" />
          </>
        )}

        {/* Expandable Sections: Description, Ingredients, Usage, Benefits, Storage */}
        <ProductExpandableSections product={product} />

        {/* Video Reviews — only shown when data exists */}
        <ProductVideoReviews
          videoReviews={product.videoReviews ?? []}
          allProducts={products}
          onAddToCart={(pid, weight) => addToCart(pid, weight)}
        />

        {product.comparisonTable && product.comparisonTable.length > 0 && (
          <ProductComparison title="How we compare" rows={product.comparisonTable} />
        )}

        {product.nutritionInfo && product.nutritionInfo.length > 0 && (
          <ProductComparison title="Nutrition information" rows={product.nutritionInfo} />
        )}

        {/* FAQ — redesigned with colored band */}
        {product.faqs && product.faqs.length > 0 && <ProductFAQ faqs={product.faqs} />}

        {product.reviews && product.reviews.length > 0 && (
          <ProductReviews
            reviews={product.reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section className="py-10 md:py-14">
            <h2 className="mb-6 font-display text-2xl font-semibold text-foreground md:text-3xl">
              You may also like
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky Add-to-Cart bar — hidden on md+ */}
      <div className="md:hidden">
        {showStickyBar && (
          <StickyCartBar
            product={product}
            variant={selectedVariant}
            qty={qty}
            onQtyChange={setQty}
          />
        )}
      </div>
    </SiteLayout>
  );
}
