import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { category } = await api.categories.bySlug(slug);
    return {
      title: category.name,
      description: category.description ?? `${category.name} guides on FinancePilot.`,
    };
  } catch {
    return { title: "Category not found" };
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  let result;
  try {
    result = await api.categories.bySlug(slug);
  } catch {
    notFound();
  }

  const { category, articles } = result;

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/categories" className="hover:text-primary">
          Categories
        </Link>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{category.name}</h1>
      {category.description && (
        <p className="mt-2 max-w-2xl text-muted">{category.description}</p>
      )}

      {articles.data.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          No articles in this category yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.data.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="card block overflow-hidden"
            >
              {article.featured_media && (
                <div className="relative aspect-video w-full bg-slate-100">
                  <Image
                    src={article.featured_media.url}
                    alt={article.featured_media.alt_text ?? article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold">{article.title}</h3>
                {article.excerpt && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {article.excerpt}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted">{article.author.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
