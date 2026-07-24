# Article Detail Page

## যা আছে এতে

```
app/articles/[slug]/page.tsx   ← article-এর নিজস্ব পেজ (title, content, SEO)
globals-addition.css           ← article content-এর জন্য styling (আলাদা ফাইল, merge করতে হবে)
```

## Upload করার নিয়ম

`financepilot-web` repo-তে:

1. `app/articles/[slug]/page.tsx` — নতুন path তৈরি করে upload করো (bracket
   `[slug]` সহ exact নাম)
2. `globals-addition.css`-এর ভিতরের পুরো কোড কপি করো, তারপর repo-র
   `app/globals.css` ফাইলে **Edit** করে একদম নিচে গিয়ে paste করো (এটা নতুন
   ফাইল না, বিদ্যমান `globals.css`-এর শেষে যোগ করা)
3. Commit করো

## যা কাজ করবে এখন

- Homepage-এ article card-এ ক্লিক করলে পুরো article পেজ খুলবে
- Title, author, date, reading time, featured image, full content দেখাবে
- Google-এর জন্য Article + Breadcrumb JSON-LD schema, আর proper meta
  title/description/OG tags থাকবে (SEO-friendly)

## এখনো বাকি

- `/categories/[slug]` পেজ — category-তে ক্লিক করলে এখনো ৪০৪ দেখাবে
- `/newsletter` পেজ
- `/authors/[slug]` পেজ
