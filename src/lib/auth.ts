import { getToken, getUser } from "./api";

export function isLoggedIn() {
  return !!getToken();
}

export function requireAuth() {
  if (!getToken()) {
    window.location.href = "/login";
    return false;
  }
  return true;
}

export function currentUser() {
  return getUser();
}