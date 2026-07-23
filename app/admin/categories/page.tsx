"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/lib/admin-guard";
import { adminApi, type Category } from "@/lib/admin-api";

function CategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function loadCategories() {
    setLoading(true);
    adminApi.categories
      .list()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadCategories, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminApi.categories.create({ name, description: description || undefined });
      setName("");
      setDescription("");
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Categories</h1>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-3 p-5">
        <h2 className="text-sm font-semibold">Add a category</h2>
        <input
          placeholder="Name (e.g. Investing Basics)"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Add category"}
        </button>
      </form>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-muted">No categories yet.</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id} className="card p-4">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted">/{c.slug}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <AdminGuard>
      <CategoriesContent />
    </AdminGuard>
  );
}
