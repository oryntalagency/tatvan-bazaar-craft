import { createFileRoute } from "@tanstack/react-router";
import { getUser } from "@/lib/api";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const user = getUser();

  return (
    <div className="container mx-auto py-16">

      <h1 className="text-4xl font-bold">
        My Profile
      </h1>

      <div className="mt-8 space-y-3">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>

    </div>
  );
}