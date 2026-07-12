import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: OrdersPage,
});

function OrdersPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold">
        My Orders
      </h1>

      <p className="mt-4 text-gray-500">
        Your orders will appear here.
      </p>
    </div>
  );
}