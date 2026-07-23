# Homepage → Real API Connection

## যা বদলেছে

`app/page.tsx` — আগের placeholder card ("Connects to the Articles API...")
বাদ দিয়ে এখন সরাসরি Laravel API থেকে categories, trending articles, এবং
featured articles fetch করে।

`lib/types.ts`, `lib/api.ts` — নতুন ফাইল। API response-এর shape (TypeScript
types) এবং fetch helper functions।

## কেন React Query ব্যবহার করিনি এখানে

homepage-এর content search engine crawler-দের কাছে সরাসরি HTML-এ থাকা
দরকার (Google Discover/News optimization-এর জন্য brief-এ এটাই বলা ছিল)।
তাই client-side React Query-এর বদলে Next.js-এর built-in server-side fetch
+ ISR (`revalidate = 60`) ব্যবহার করা হয়েছে — প্রতি ৬০ সেকেন্ডে page নিজে
থেকেই আপডেট হবে, কিন্তু crawler-রা সবসময় পূর্ণ HTML পাবে।

## Upload করার নিয়ম (আগের মতোই)

1. `financepilot-web` repo-তে `app/page.tsx` — এই ফাইলটা **replace/overwrite**
   করো (Upload files → পুরনোটার জায়গায় নতুনটা বসবে)
2. `lib/` folder নতুন করে তৈরি করে তাতে `types.ts` আর `api.ts` upload করো
3. Commit করো — Vercel automatic redeploy করবে

## Backend-এ যদি ছবি (featured image) থাকে

`next.config.ts`-এ Supabase storage domain আগে থেকেই allow করা আছে
(`**.supabase.co`)। যদি Render/অন্য কোনো domain থেকে ছবি আসে, সেই domain-ও
`remotePatterns`-এ যোগ করতে হবে, নইলে `<Image>` component error দেবে।

## এখনো বাকি

- `app/articles/[slug]/page.tsx` — article detail page
- `app/categories/[slug]/page.tsx` — category listing page
- Newsletter form (React Hook Form + Zod, POST করবে `/api/newsletter/subscribe`-এ)
