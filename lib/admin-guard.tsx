"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminApi, clearToken, getToken, type AdminUser } from "@/lib/admin-api";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }

    adminApi
      .me()
      .then(setUser)
      .catch(() => router.replace("/admin/login"))
      .finally(() => setChecking(false));
  }, [router]);

  function handleLogout() {
    adminApi.logout().catch(() => {});
    clearToken();
    router.replace("/admin/login");
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/admin/dashboard">Articles</Link>
            <Link href="/admin/categories">Categories</Link>
            <Link href="/admin/authors">Authors</Link>
          </nav>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{user?.name}</span>
            <button onClick={handleLogout} className="text-primary">
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
