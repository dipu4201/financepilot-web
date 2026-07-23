"use client";

import { AdminGuard } from "@/lib/admin-guard";
import { ArticleForm } from "@/components/ArticleForm";

export default function NewArticlePage() {
  return (
    <AdminGuard>
      <h1 className="text-xl font-semibold">New article</h1>
      <div className="mt-6">
        <ArticleForm />
      </div>
    </AdminGuard>
  );
}
