import type { Article, Category, PaginatedResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    // Revalidate every 60s so new/updated articles show up without a full redeploy
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status} ${path}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  articles: {
    list: (params?: { category?: string; tag?: string; page?: number }) => {
      const search = new URLSearchParams();
      if (params?.category) search.set("category", params.category);
      if (params?.tag) search.set("tag", params.tag);
      if (params?.page) search.set("page", String(params.page));
      const query = search.toString();
      return apiFetch<PaginatedResponse<Article>>(
        `/api/articles${query ? `?${query}` : ""}`
      );
    },
    bySlug: (slug: string) => apiFetch<Article>(`/api/articles/${slug}`),
    trending: () => apiFetch<Article[]>("/api/articles/trending"),
    featured: () => apiFetch<Article[]>("/api/articles/featured"),
  },
  categories: {
    list: () => apiFetch<Category[]>("/api/categories"),
    bySlug: (slug: string) =>
      apiFetch<{ category: Category; articles: PaginatedResponse<Article> }>(
        `/api/categories/${slug}`
      ),
  },
};
