"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/lib/admin-guard";
import { adminApi, type Author } from "@/lib/admin-api";

function AuthorsContent() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function loadAuthors() {
    setLoading(true);
    adminApi.authors
      .list()
      .then(setAuthors)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadAuthors, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminApi.authors.create({
        name,
        title: title || undefined,
        bio: bio || undefined,
      });
      setName("");
      setTitle("");
      setBio("");
      loadAuthors();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create author.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Authors</h1>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-3 p-5">
        <h2 className="text-sm font-semibold">Add an author</h2>
        <input
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <input
          placeholder="Title (e.g. Senior Editor)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <textarea
          placeholder="Short bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Saving…" : "Add author"}
        </button>
      </form>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : authors.length === 0 ? (
          <p className="text-sm text-muted">No authors yet.</p>
        ) : (
          <ul className="space-y-2">
            {authors.map((a) => (
              <li key={a.id} className="card p-4">
                <p className="text-sm font-medium">{a.name}</p>
                {a.title && <p className="text-xs text-muted">{a.title}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function AdminAuthorsPage() {
  return (
    <AdminGuard>
      <AuthorsContent />
    </AdminGuard>
  );
}
