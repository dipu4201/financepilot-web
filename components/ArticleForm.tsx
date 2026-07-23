"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  adminApi,
  type AdminArticle,
  type Author,
  type Category,
} from "@/lib/admin-api";

interface ArticleFormProps {
  articleId?: number;
  initial?: Partial<AdminArticle>;
}

export function ArticleForm({ articleId, initial }: ArticleFormProps) {
  const router = useRouter();
  const isEditing = Boolean(articleId);

  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [categoryId, setCategoryId] = useState<string>(
    initial?.category_id ? String(initial.category_id) : ""
  );
  const [authorId, setAuthorId] = useState<string>(
    initial?.author_id ? String(initial.author_id) : ""
  );
  const [isFeatured, setIsFeatured] = useState(initial?.is_featured ?? false);
  const [isTrending, setIsTrending] = useState(initial?.is_trending ?? false);
  const [isEditorsPick, setIsEditorsPick] = useState(
    initial?.is_editors_pick ?? false
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminApi.categories.list(), adminApi.authors.list()])
      .then(([cats, auths]) => {
        setCategories(cats);
        setAuthors(auths);
      })
      .catch((err) => setError(err.message));
  }, []);

  function buildPayload() {
    return {
      title,
      excerpt: excerpt || undefined,
      content,
      category_id: Number(categoryId),
      author_id: Number(authorId),
      is_featured: isFeatured,
      is_trending: isTrending,
      is_editors_pick: isEditorsPick,
    };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedMessage(null);

    try {
      if (isEditing && articleId) {
        await adminApi.articles.update(articleId, buildPayload());
        setSavedMessage("Saved.");
      } else {
        const created = await adminApi.articles.create(buildPayload());
        router.push(`/admin/articles/${created.id}/edit`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (!articleId) return;
    setSaving(true);
    setError(null);
    try {
      await adminApi.articles.publish(articleId);
      setSavedMessage("Published!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">Select…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Author</label>
          <select
            required
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">Select…</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Short summary shown in article cards"
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          placeholder="Write the article here. HTML is supported."
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isTrending}
            onChange={(e) => setIsTrending(e.target.checked)}
          />
          Trending
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isEditorsPick}
            onChange={(e) => setIsEditorsPick(e.target.checked)}
          />
          Editor&apos;s Pick
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {savedMessage && <p className="text-sm text-secondary">{savedMessage}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving…" : isEditing ? "Save changes" : "Create draft"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={handlePublish}
            disabled={saving}
            className="btn-secondary"
          >
            Publish
          </button>
        )}
      </div>
    </form>
  );
}
