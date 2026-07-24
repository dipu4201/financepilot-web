const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const TOKEN_KEY = "financepilot_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function adminFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    clearToken();
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  title: string | null;
}

export interface MediaItem {
  id: number;
  url: string;
  alt_text: string | null;
}

export interface AdminArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string;
  author_id: number;
  category_id: number;
  featured_media_id?: number | null;
  featured_media?: MediaItem | null;
  is_featured: boolean;
  is_trending: boolean;
  is_editors_pick: boolean;
  author?: Author;
  category?: Category;
  updated_at: string;
}

export const adminApi = {
  login: (email: string, password: string) =>
    adminFetch<{ user: AdminUser; token: string }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () => adminFetch("/api/admin/logout", { method: "POST" }),

  me: () => adminFetch<AdminUser>("/api/admin/me"),

  categories: {
    list: () => adminFetch<Category[]>("/api/admin/categories"),
    create: (data: { name: string; slug?: string; description?: string }) =>
      adminFetch<Category>("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  authors: {
    list: () => adminFetch<Author[]>("/api/admin/authors"),
    create: (data: { name: string; slug?: string; title?: string; bio?: string }) =>
      adminFetch<Author>("/api/admin/authors", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  media: {
    create: (data: { url: string; alt_text?: string; file_name?: string }) =>
      adminFetch<MediaItem>("/api/admin/media", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  articles: {
    list: (status?: string) =>
      adminFetch<{ data: AdminArticle[] }>(
        `/api/admin/articles${status ? `?status=${status}` : ""}`
      ),
    get: (id: number) =>
      adminFetch<{ data: AdminArticle[] }>("/api/admin/articles").then(
        (res) => res.data.find((a) => a.id === id)
      ),
    create: (data: Partial<AdminArticle>) =>
      adminFetch<AdminArticle>("/api/admin/articles", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: number, data: Partial<AdminArticle>) =>
      adminFetch<AdminArticle>(`/api/admin/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    publish: (id: number) =>
      adminFetch<AdminArticle>(`/api/admin/articles/${id}/publish`, {
        method: "POST",
      }),
    destroy: (id: number) =>
      adminFetch(`/api/admin/articles/${id}`, { method: "DELETE" }),
  },
};
