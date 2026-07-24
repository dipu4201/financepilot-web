"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "newsletter_page" }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Subscription failed.");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium uppercase tracking-wide text-primary">
        FinancePilot Newsletter
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Get smarter with your money
      </h1>
      <p className="mt-3 text-muted">
        One email a week — practical tips on saving, investing, and budgeting.
        No spam.
      </p>

      {status === "success" ? (
        <p className="mt-8 text-sm font-medium text-secondary">
          You&apos;re subscribed! Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button type="submit" disabled={status === "loading"} className="btn-primary">
            {status === "loading" ? "Joining…" : "Subscribe"}
          </button>
        </form>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </main>
  );
}
