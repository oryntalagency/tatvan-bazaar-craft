import { useNavigate } from "@tanstack/react-router";
import { logout } from "@/lib/api";

export default function LogoutButton() {
  const navigate = useNavigate();

  return (
    <button
      className="rounded-lg bg-red-600 px-4 py-2 text-white"
      onClick={() => {
        logout();
        navigate({ to: "/login" });
      }}
    >
      Logout
    </button>
  );
}