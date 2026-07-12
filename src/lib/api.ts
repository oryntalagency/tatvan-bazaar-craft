const API = import.meta.env.VITE_API_URL;

export async function api(
  path: string,
  options: {
    method?: string;
    body?: any;
    token?: string;
  } = {}
) {
  const response = await fetch(`${API}${path}`, {
    method: options.method ?? "GET",

    headers: {
      "Content-Type": "application/json",

      ...(options.token
        ? {
            Authorization: `Bearer ${options.token}`,
          }
        : {}),
    },

    body: options.body
      ? JSON.stringify(options.body)
      : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export function setAuth(token: string, user: any) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}