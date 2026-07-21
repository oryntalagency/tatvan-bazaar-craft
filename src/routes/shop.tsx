import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Organic Honey, Ghee & Atta — Tatvan" },
      { name: "description", content: "Browse Tatvan's collection of raw honey, A2 ghee and stone-ground whole wheat atta." },
      { property: "og:title", content: "Shop — Tatvan" },
      { property: "og:description", content: "Farm-fresh organic goods from small Indian farms." },
    ],
  }),
  component: ShopLayout,
});

function ShopLayout() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
