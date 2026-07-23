# Article লেখার Editor

## যা আছে এতে

```
components/ArticleForm.tsx              ← মূল ফর্ম (নতুন/এডিট দুটোতেই ব্যবহার হয়)
app/admin/articles/new/page.tsx         ← নতুন article লেখার পেজ
app/admin/articles/[id]/edit/page.tsx   ← বিদ্যমান article সম্পাদনার পেজ
lib/admin-api.ts                        ← আপডেট (articles.get() যোগ হয়েছে) — পুরনোটা replace করো
```

## Upload করার নিয়ম

`financepilot-web` repo-তে:

1. `components/` নামে নতুন folder তৈরি করো (না থাকলে), তাতে `ArticleForm.tsx` upload করো
2. `app/admin/articles/new/page.tsx` — নতুন path তৈরি করে upload করো
3. `app/admin/articles/[id]/edit/page.tsx` — খেয়াল রাখো folder নামে বর্গাকার
   bracket `[id]` ঠিক আছে (এটা Next.js-এর dynamic route syntax, বানান exact
   রাখতে হবে)
4. `lib/admin-api.ts` — পুরনোটা সম্পূর্ণ **replace** করো এই নতুন ভার্সন দিয়ে

Commit করো — Vercel automatic redeploy করবে।

## ব্যবহার

1. Dashboard-এ "New article" চাপো
2. Title, category, author, content লিখে **"Create draft"** চাপো —
   এতে article তৈরি হয়ে draft অবস্থায় থাকবে, edit page-এ নিয়ে যাবে
3. Edit page-এ থাকা অবস্থায় **"Publish"** চাপলে article live হয়ে যাবে,
   homepage-এ trending/featured section-এ (checkbox টিক দেওয়া থাকলে) দেখা যাবে

## সীমাবদ্ধতা (এখনকার জন্য)

Article edit করার সময় সব article টেনে এনে id দিয়ে খোঁজা হয় (backend-এ
একটা নির্দিষ্ট article-এর জন্য আলাদা admin endpoint এখনো নাই) — খুব বেশি
article হলে এটা ধীর হয়ে যাবে, তখন backend-এ `GET
/api/admin/articles/{id}` endpoint যোগ করতে হবে।
