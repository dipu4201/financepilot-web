# Frontend Update — Admin Dashboard (Part 1: Login + Categories + Authors)

## যা আছে এতে

```
app/admin/login/page.tsx        ← লগইন পেজ
app/admin/dashboard/page.tsx    ← Article তালিকা (এখন খালি, editor পরের ধাপে)
app/admin/categories/page.tsx   ← Category তালিকা + যোগ করার ফর্ম
app/admin/authors/page.tsx      ← Author তালিকা + যোগ করার ফর্ম
lib/admin-api.ts                ← Backend-এর admin endpoints কল করার helper
lib/admin-guard.tsx             ← লগইন চেক করে, না থাকলে /admin/login-এ পাঠায়
```

## Upload করার নিয়ম

`financepilot-web` repo-তে:

1. `app` folder-এ ঢুকে নতুন subfolder তৈরি করো `admin/login/` (Create new file
   দিয়ে `app/admin/login/page.tsx` টাইপ করলেই GitHub subfolder বানিয়ে নেবে)
   — সেখানে zip-এর `app/admin/login/page.tsx` কপি করো
2. একইভাবে `app/admin/dashboard/page.tsx`, `app/admin/categories/page.tsx`,
   `app/admin/authors/page.tsx` — প্রতিটা তার নিজের path-এ বসাও
3. `lib/` folder-এ `admin-api.ts` আর `admin-guard.tsx` upload করো
4. Commit করো

## প্রথমবার লগইন করার জন্য admin user লাগবে

Database-এ এখনো কোনো admin user নাই (শুধু `users` table খালি)। এটা
তৈরি করার জন্য পরের ধাপে আমি একটা migration/seeder দেব যেটা একটা
admin account বানাবে — সেটা ছাড়া `/admin/login`-এ ঢুকে login করা যাবে না।

## এখনো বাকি

- Article লেখার/সম্পাদনার editor (`app/admin/articles/new/page.tsx`,
  `app/admin/articles/[id]/edit/page.tsx`) — পরের ধাপে
- প্রথম admin user তৈরি — পরের ধাপে
