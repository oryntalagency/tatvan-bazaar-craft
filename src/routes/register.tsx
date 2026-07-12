import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { api, setAuth } from "@/lib/api";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function register(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api("/auth/register", {
        method: "POST",
        body: form,
      });

      setAuth(res.token, res.user);

      navigate({
        to: "/",
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <div className="mt-6 flex justify-center">

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {

                const res = await api("/auth/google", {
                  method: "POST",
                  body: {
                    credential: credentialResponse.credential,
                  },
                });

                setAuth(res.token, res.user);

                navigate({
                  to: "/",
                });

              } catch (err: any) {
                alert(err.message);
              }
            }}
            onError={() => alert("Google Login Failed")}
          />

        </div>

        <div className="text-center my-6">
          OR
        </div>

        <form
          onSubmit={register}
          className="space-y-4"
        >

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-green-700 text-white rounded-lg py-3"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?

          <Link
            to="/login"
            className="text-green-700 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}