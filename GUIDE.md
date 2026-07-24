# Categories + Newsletter পেজ

## যা আছে এতে

```
app/categories/page.tsx          ← সব category-র তালিকা
app/categories/[slug]/page.tsx   ← একটা category-র article তালিকা
app/newsletter/page.tsx          ← newsletter subscribe ফর্ম
```

## Upload করার নিয়ম

`financepilot-web` repo-তে `app/` folder-এ:

1. `app/categories/page.tsx` — নতুন path তৈরি করে upload করো
2. `app/categories/[slug]/page.tsx` — bracket `[slug]` সহ exact নাম দিয়ে
3. `app/newsletter/page.tsx` — নতুন path

Commit করো — Vercel automatic redeploy করবে।

## এখন যা কাজ করবে

- Homepage-এর "Browse guides" → `/categories` পেজ খুলবে
- Category card-এ ক্লিক → সেই category-র article তালিকা
- "Join the newsletter" → subscribe ফর্ম, submit করলে backend-এ email save হবে

## বাকি

- `/authors/[slug]` পেজ (author profile) — এখনো নাই, কিন্তু কোথাও link করা
  নাই এখনো, তাই জরুরি না
