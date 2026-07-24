# ছবি Upload ফিচার

## যা আছে এই zip-এ (frontend)

```
lib/supabase.ts          ← নতুন — সরাসরি Supabase Storage-এ ছবি upload করে
lib/admin-api.ts         ← আপডেট (media.create যোগ হয়েছে) — replace করো
components/ArticleForm.tsx ← আপডেট (ছবি upload UI যোগ হয়েছে) — replace করো
package.json              ← আপডেট (@supabase/supabase-js যোগ হয়েছে) — replace করো
```

## backend patch (আলাদা zip: financepilot-api-media.zip)

```
app/Http/Controllers/Api/Admin/MediaController.php  ← নতুন
routes/api.php                                        ← আপডেট, replace করো
```

## Upload করার নিয়ম

**frontend (`financepilot-web` repo):**
1. `lib/supabase.ts` — নতুন ফাইল
2. `lib/admin-api.ts` — replace
3. `components/ArticleForm.tsx` — replace
4. `package.json` — replace (root-এ)
5. Commit করো

**backend (`financepilot-api` repo):**
1. `app/Http/Controllers/Api/Admin/MediaController.php` — নতুন
2. `routes/api.php` — replace
3. Commit করো

## নিশ্চিত করো (আগে করা না থাকলে)

- Supabase-এ **Storage → bucket নাম `media`, Public bucket চালু**
- Vercel-এ env variable: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## ব্যবহার

Article লেখার/সম্পাদনার পেজে এখন "Featured image" নামে একটা ফাইল-চয়নকারী
থাকবে। ছবি সিলেক্ট করলেই automatic upload হয়ে preview দেখাবে — আলাদা করে
"upload" বাটন চাপার দরকার নাই। তারপর normal-ভাবে "Create draft" বা "Save
changes" চাপলে সেই ছবিটাই article-এর featured image হিসেবে save হবে।
