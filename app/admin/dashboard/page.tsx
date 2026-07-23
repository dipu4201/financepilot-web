"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminGuard } from "@/lib/admin-guard";
import { adminApi, type AdminArticle } from "@/lib/admin-api";

function DashboardContent() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.articles
      .list()
      .then((res) => setArticles(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Articles</h1>
        <Link href="/admin/articles/new" className="btn-primary">
          New article
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading…</p>
      ) : error ? (
        <p className="mt-6 text-sm text-red-600">{error}</p>
      ) : articles.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          No articles yet.{" "}
          <Link href="/admin/articles/new" className="text-primary">
            Write your first one
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-6 space-y-2">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/admin/articles/${article.id}/edit`}
                className="card flex items-center justify-between p-4"
              >
                <div>
                  <p className="text-sm font-medium">{article.title}</p>
                  <p className="text-xs text-muted">
                    {article.category?.name ?? "Uncategorized"} · {article.status}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
