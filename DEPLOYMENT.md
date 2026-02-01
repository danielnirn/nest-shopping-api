# Render.com Deployment Guide

## Step-by-Step Instructions:

### 1. Initialize Git Repository (if not already done)

```bash
cd /Users/I754255/daniel-scripts/nest-api
git init
git add .
git commit -m "Initial commit - NestJS Shopping List API"
```

### 2. Push to GitHub

Create a new repository on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/nest-api.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Render.com

1. **Sign up at [render.com](https://render.com)** (use GitHub to sign in)

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**
   - Select your nest-api repository

4. **Configure the service:**
   - **Name:** `nest-shopping-api` (or any name you prefer)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** leave blank
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Instance Type:** `Free`

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   Add these:
   ```
   MONGODB_URI=mongodb+srv://danielnirn_db_user:cspH6MZwp8eduY7H@cluster0.j7c64e2.mongodb.net/?appName=Cluster0
   PORT=3000
   ```

6. **Click "Create Web Service"**

Render will:
- Build your app
- Deploy it
- Give you a public URL like: `https://nest-shopping-api.onrender.com`

### 4. Test with Postman

Once deployed (takes 2-3 minutes), use your Render URL:

```
GET https://your-app-name.onrender.com/api/shopping-lists
GET https://your-app-name.onrender.com/api/shopping-lists/:id
POST https://your-app-name.onrender.com/api/shopping-lists
```

## Important Notes:

⚠️ **Free Tier Limitations:**
- Service spins down after 15 minutes of inactivity
- First request after inactivity takes ~30 seconds (cold start)
- 750 hours/month free

💡 **Keep it awake (optional):**
Use a service like UptimeRobot to ping your API every 14 minutes

## Alternative: Deploy to Railway.app

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (MONGODB_URI)
6. Deploy!

Railway auto-detects NestJS and configures everything automatically.
