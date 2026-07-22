# FinancePilot — Web Frontend

Next.js 15 (App Router) + TypeScript + Tailwind CSS frontend for FinancePilot.

## Setup

1. Extract this zip into your `financepilot-web` repo (or upload each file
   through the GitHub web editor at `github.dev/<you>/financepilot-web`).
2. Copy `.env.example` to `.env.local` and fill in real values once
   Supabase and the API are set up.
3. Push to `main`. Vercel will pick up the Next.js project automatically
   from the import you already created.

## Structure

```
app/
  layout.tsx     — root layout, fonts, SEO metadata, JSON-LD
  page.tsx       — homepage
  globals.css    — Tailwind layers + design tokens
tailwind.config.ts — brand colors, type scale
next.config.ts      — image config, security headers
```

## Brand tokens

| Token       | Value     |
|-------------|-----------|
| Primary     | `#2563EB` |
| Secondary   | `#10B981` |
| Background  | `#F8FAFC` |
| Surface     | `#FFFFFF` |
| Dark BG     | `#0F172A` |
| Dark Card   | `#1E293B` |
| Text        | `#111827` |
| Muted       | `#6B7280` |
| Border      | `#E5E7EB` |
| Accent      | `#38BDF8` |

## Next steps

- Wire the homepage sections to the Laravel API
- Build category/article page templates
- Add sitemap.xml, robots.txt, RSS feed routes
