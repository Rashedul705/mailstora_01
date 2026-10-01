# 🚀 Deployment Guide — MailStora

This project is structured as a Monorepo with a **Next.js Client** and an **Express Server**.

## 1. Backend Deployment (Express)
**Recommended Platform:** [Render.com](https://render.com) or [Railway.app](https://railway.app)

1. Create a new **Web Service** on Render.
2. Point it to your repository.
3. Set the **Root Directory** to `Server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add the following **Environment Variables** (see `.env.example` for details):
   - `MONGODB_URI`
   - `REDIS_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL` (Your Netlify URL, e.g., `https://mailstora.netlify.app`)
   - ... (Email and ImgBB keys)

## 2. Frontend Deployment (Next.js)
**Recommended Platform:** [Netlify](https://netlify.com)

1. Create a new site from Git.
2. The `netlify.toml` in the root will automatically configure the build:
   - **Base directory:** `Client`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
3. Add the following **Environment Variable** in Netlify's Site Settings:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://mailstora-server.onrender.com`)

## 3. Connecting the Two
- Make sure `FRONTEND_URL` on the backend matches your Netlify domain.
- Make sure `NEXT_PUBLIC_API_URL` on the frontend matches your Render domain.

## ⚠️ Important Note on the "File Manager" Feature
The new **Admin File Manager** allows you to upload and delete files in the `public/Email_Template` directory dynamically.
- **cPanel / VPS Deployment:** If you run this project on a traditional VPS, cPanel Node.js app, or Railway (with a persistent volume), the File Manager will work perfectly.
- **Netlify / Vercel Deployment:** These platforms are "Serverless" and their file systems are **read-only** at runtime. If you deploy the frontend to Netlify, the File Manager **will fail** when trying to create folders or upload files because it cannot write to the disk.
  - If you *must* use Netlify, you will need to upload your Email Template files manually via Git rather than using the Admin Panel File Manager.

---
**Note:** The `netlify.toml` includes a redirect that proxies `/api/*` to your backend. You can use this for cleaner URLs if desired.
