import Link from "next/link";

const categories = [
  "Banking Guides",
  "Investing Basics",
  "Saving Money",
  "Budgeting",
  "Credit Cards",
  "Retirement",
  "Passive Income",
  "Tax Basics",
];

export default function HomePage() {
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
      <section className="mt-20">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="card p-5 transition-shadow hover:shadow-md"
            >
              <span className="text-sm font-medium">{category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending / Featured placeholders — wired to the API next */}
      <section className="mt-20 grid gap-8 sm:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Trending Articles</h2>
          <p className="mt-2 text-sm text-muted">
            Connects to the Articles API once the backend is live.
          </p>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Editor&apos;s Picks</h2>
          <p className="mt-2 text-sm text-muted">
            Connects to the Articles API once the backend is live.
          </p>
        </div>
      </section>
    </main>
  );
}
