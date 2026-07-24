import Link from "next/link";
import type { Metadata } from "next";
import { api } from "@/lib/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all FinancePilot guides by category.",
};

export default async function CategoriesPage() {
  const categories = await api.categories.list().catch(() => []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Categories</h1>
      <p className="mt-2 text-muted">Browse all guides by topic.</p>

      {categories.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No categories yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="card p-5 transition-shadow hover:shadow-md"
            >
              <span className="text-sm font-medium">{category.name}</span>
              {category.description && (
                <p className="mt-1 line-clamp-2 text-xs text-muted">
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
