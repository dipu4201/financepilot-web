import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import type { Article, Category } from "@/lib/types";

// Revalidate the homepage every 60s (ISR) — good balance of freshness + performance
export const revalidate = 60;

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`} className="card block overflow-hidden">
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
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {article.category.name}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold">{article.title}</h3>
        {article.excerpt && (
          <p className="mt-1 line-clamp-2 text-xs text-muted">{article.excerpt}</p>
        )}
        <p className="mt-2 text-xs text-muted">
          {article.author.name}
          {article.reading_time_minutes ? ` · ${article.reading_time_minutes} min read` : ""}
        </p>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  // Fetch in parallel; fall back to empty arrays if the API isn't reachable yet
  const [categories, trending, featured] = await Promise.allSettled([
    api.categories.list(),
    api.articles.trending(),
    api.articles.featured(),
  ]);

  const categoryList: Category[] = categories.status === "fulfilled" ? categories.value : [];
  const trendingList: Article[] = trending.status === "fulfilled" ? trending.value : [];
  const featuredList: Article[] = featured.status === "fulfilled" ? featured.value : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          FinancePilot
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Learn Smarter.{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            Save Better.
          </span>{" "}
          Invest Wisely.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted">
          Practical, no-nonsense guides on banking, investing, saving, and
          budgeting — built to help you make better money decisions.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/categories" className="btn-primary">
            Browse guides
          </Link>
          <Link href="/newsletter" className="btn-secondary">
            Join the newsletter
          </Link>
        </div>
      </section>

      {/* Categories */}
      {categoryList.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-semibold">Categories</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categoryList.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="card p-5 transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trending */}
      <section className="mt-20">
        <h2 className="text-xl font-semibold">Trending Articles</h2>
        {trendingList.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingList.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">
            No trending articles yet — check back soon.
          </p>
        )}
      </section>

      {/* Editor's Picks */}
      <section className="mt-20">
        <h2 className="text-xl font-semibold">Editor&apos;s Picks</h2>
        {featuredList.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredList.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">
            No featured articles yet — check back soon.
          </p>
        )}
      </section>
    </main>
  );
}
