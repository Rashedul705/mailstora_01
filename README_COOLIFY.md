# 🚀 Coolify Deployment Guide — MailStora

This guide explains how to deploy the MailStora monorepo onto your self-hosted **Coolify** instance. We support two primary methods of deployment:

1. **Option A (Recommended): Docker Compose Stack (All-in-one)** - Installs the Next.js client, Express server, and Redis database in a single group of connected containers.
2. **Option B: Individual Services (Scalable)** - Deploys the Client and Server as separate services, allowing you to use Coolify's built-in managed Redis/MongoDB instances.

---

## Option A: Docker Compose Stack (All-in-one)

This option uses the root `docker-compose.yml` to deploy everything together.

### Step 1: Create a new Docker Compose application
1. In your Coolify dashboard, select your Project and Environment.
2. Click **+ New Resource** and select **Docker Compose**.
3. Choose your Git repository and branch.
4. Coolify will read the `docker-compose.yml` automatically. Keep the configuration path as default (`./docker-compose.yml`).

### Step 2: Configure Environment Variables
In the application settings, navigate to **Environment Variables** and add all the variables required (do NOT commit these to Git):

- `MONGODB_URI`: Your MongoDB connection string (e.g. `mongodb+srv://...`).
- `JWT_SECRET`: A long random secret key.
- `FRONTEND_URL`: The URL where your Coolify Next.js application will be accessible (e.g., `https://mailstora.yourdomain.com`).
- `NEXT_PUBLIC_API_URL`: The URL where your Coolify Express server will be accessible (e.g., `https://mailstora-api.yourdomain.com`).
  - **⚠️ IMPORTANT:** Next.js bakes `NEXT_PUBLIC_` variables at build-time. In Coolify's environment variable settings, make sure to check the **"Build Variable"** (or **"Show on Build"**) option for `NEXT_PUBLIC_API_URL` so that it is injected during the Docker build stage.
- `IMGBB_API_KEY`: API Key for ImgBB.
- `EMAIL_USER`: Gmail/SMTP user email.
- `EMAIL_PASS`: Gmail/SMTP App password.
- `EMAIL_HOST`: `smtp.gmail.com`
- `EMAIL_PORT`: `587`
- `MASTER_OTP`: `333333`

### Step 3: Deploy
Click **Deploy**! Coolify will build both Docker images, set up Redis, and handle reverse proxy routing for you.

---

## Option B: Individual Services (Scalable)

If you prefer to scale components independently or use Coolify-managed databases, you can deploy them individually.

### 1. Redis Database
1. In Coolify, click **+ New Resource** and select **Databases** -> **Redis**.
2. Deploy the database and copy its internal connection URL (e.g., `redis://redis:6379`).

### 2. Express Server (Backend)
1. Click **+ New Resource** and select **Public/Private Repository** (Git).
2. Set the **Base Directory** to `Server`.
3. Set the **Build Pack** to **Dockerfile**.
4. Set the **Port** to `5001`.
5. Under **Environment Variables**, add:
   - `PORT`: `5001`
   - `REDIS_URL`: The connection URL of the Redis database you created above.
   - `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, `EMAIL_USER`, `EMAIL_PASS`, etc.
6. Under **Storage** / **Persistent Volumes**:
   - Add a volume to persist uploaded email templates.
   - **Mount Path:** `/app/public/Email_Template`
7. Deploy the service and configure its domain (e.g., `https://mailstora-api.yourdomain.com`).

### 3. Next.js Client (Frontend)
1. Click **+ New Resource** and select **Public/Private Repository** (Git).
2. Set the **Base Directory** to `Client`.
3. Set the **Build Pack** to **Dockerfile**.
4. Set the **Port** to `3000`.
5. Under **Environment Variables**:
   - Add `NEXT_PUBLIC_API_URL` set to the backend service URL (e.g., `https://mailstora-api.yourdomain.com`).
   - **⚠️ Make sure to toggle the "Build Variable" option** on for `NEXT_PUBLIC_API_URL` so it is present during image build.
6. Deploy the service and configure its domain (e.g., `https://mailstora.yourdomain.com`).

---

## 💾 Storage & Uploads Persistence

When deploying on Docker/Coolify:
- The **Admin File Manager** saves uploaded email templates locally inside the Server folder under `public/Email_Template`.
- By default, files in Docker containers are temporary and will be deleted on every redeployment.
- We have configured persistent volumes (`email_templates`) for both Option A and Option B to ensure that your uploaded templates **never get lost** during updates or restarts.
