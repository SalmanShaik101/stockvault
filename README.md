# StockVault / StockBun — 4K Stock Video Marketplace

StockVault is a premium Next.js digital marketplace for 4K and 9:16 vertical stock video vaults, subscriptions, and instant direct downloads.

## 🚀 Deployment Status
- **Hosted Environment**: **Vercel** (Production)
- **Database & Auth**: **Supabase Postgres & Supabase Auth**
- **Public Assets Storage**: **Supabase Storage** (`stockvault` bucket)
- **Heavy ZIP File Downloads**: **Google Drive API (Service Account Stream)**
- **Payment Gateway**: **Razorpay**

---

## 📁 Google Drive Bundle File Mapping Guide

Each product bundle zip file is stored in Google Drive and mapped 1-to-1 in the Supabase `products` database table via `drive_file_id`.

### How File Fetching Works:
1. When a user purchases a bundle (or accesses their Unlimited Pass), the API retrieves the product's `drive_file_id` from the Supabase `products` table.
2. The Next.js API route (`/api/download/[orderId]`) connects to Google Drive via Service Account credentials (`GDRIVE_CLIENT_EMAIL` & `GDRIVE_PRIVATE_KEY`).
3. Google Drive streams the exact ZIP file directly to the user's browser without revealing the private Google Drive link.

### Naming & Mapping Steps:
1. Rename your ZIP files cleanly on Google Drive (e.g. `gym_vault_4k_v1.zip`, `supercar_vault_916_v1.zip`).
2. Share each file or folder with your Google Drive Service Account email as a **Viewer**.
3. Copy the **File ID** from the share link:
   - Link: `https://drive.google.com/file/d/1A2b3C4d5E6f7G8h9I0j/view`
   - File ID: `1A2b3C4d5E6f7G8h9I0j`
4. Update the `drive_file_id` column in your Supabase `products` table for that product.

---

## 🛠 Environment Setup for Vercel

Add the following Environment Variables in your **Vercel Project Settings -> Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mlujprmbjzehteepaubb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

GDRIVE_CLIENT_EMAIL=your-service-account-email
GDRIVE_PRIVATE_KEY="your-service-account-private-key"
```
