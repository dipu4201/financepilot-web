"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AdminGuard } from "@/lib/admin-guard";
import { ArticleForm } from "@/components/ArticleForm";
import { adminApi, type AdminArticle } from "@/lib/admin-api";

function EditContent() {
  const params = useParams();
  const id = Number(params.id);
  const [article, setArticle] = useState<AdminArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.articles
      .get(id)
      .then((a) => {
        if (!a) {
          setError("Article not found.");
        } else {
          setArticle(a);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-sm text-muted">Loading…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!article) return null;

  return (
    <>
      <h1 className="text-xl font-semibold">Edit article</h1>
      <p className="mt-1 text-sm text-muted">
        Status: <span className="font-medium">{article.status}</span>
      </p>
      <div className="mt-6">
        <ArticleForm articleId={article.id} initial={article} />
      </div>
    </>
  );
}

export default function EditArticlePage() {
  return (
    <AdminGuard>
      <EditContent />
    </AdminGuard>
  );
}
