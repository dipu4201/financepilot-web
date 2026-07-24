import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await api.articles.bySlug(slug);
    const description =
      article.excerpt ?? article.content.replace(/<[^>]+>/g, "").slice(0, 160);

    return {
      title: article.title,
      description,
      openGraph: {
        type: "article",
        title: article.title,
        description,
        images: article.featured_media ? [article.featured_media.url] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
      },
    };
  } catch {
    return { title: "Article not found" };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await api.articles.bySlug(slug);
  } catch {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://financepilot.com";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featured_media?.url,
    datePublished: article.published_at,
    author: {
      "@type": "Person",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "FinancePilot",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category.name,
        item: `${siteUrl}/categories/${article.category.slug}`,
      },
      { "@type": "ListItem", position: 3, name: article.title },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href={`/categories/${article.category.slug}`}
          className="hover:text-primary"
        >
          {article.category.name}
        </Link>
      </nav>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {article.title}
      </h1>

      <div className="mt-3 flex items-center gap-2 text-sm text-muted">
        <span>{article.author.name}</span>
        {article.published_at && (
          <>
            <span>·</span>
            <time dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </>
        )}
        {article.reading_time_minutes && (
          <>
            <span>·</span>
            <span>{article.reading_time_minutes} min read</span>
          </>
        )}
      </div>

      {article.featured_media && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={article.featured_media.url}
            alt={article.featured_media.alt_text ?? article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <div
        className="article-content mt-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </main>
  );
}
