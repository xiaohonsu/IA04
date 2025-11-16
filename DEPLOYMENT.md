# Deployment Instructions

This guide walks you through deploying the backend to Render and the frontend to Vercel.

## Prerequisites

- GitHub account with access to https://github.com/xiaohonsu/IA04
- Render account (free tier available at https://render.com)
- Vercel account (free tier available at https://vercel.com)
- MongoDB Atlas connection string (or other MongoDB host)

---

## Backend Deployment (Render)

### Option 1: Deploy via Render Dashboard (Recommended)

1. **Login to Render**
   - Go to https://dashboard.render.com
   - Sign in with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select repository: `xiaohonsu/IA04`
   - Click "Connect"

3. **Configure Service**
   - **Name**: `user-registration-backend` (or your choice)
   - **Region**: Oregon (or nearest to your users)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free

4. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   PORT=3000
   FRONTEND_URL=<will-set-after-frontend-deploy>
   JWT_ACCESS_SECRET=<generate-random-secret-32-chars>
   JWT_REFRESH_SECRET=<generate-different-random-secret-32-chars>
   JWT_ACCESS_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d
   ```

   **Important**: 
   - Use your actual MongoDB Atlas URI (already in your local `.env` if using Atlas)
   - Generate strong random secrets for JWT (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - FRONTEND_URL will be set after deploying frontend (e.g., `https://your-app.vercel.app`)

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Wait for build to complete (usually 2-5 minutes)
   - Once deployed, note your backend URL (e.g., `https://user-registration-backend.onrender.com`)

### Option 2: Deploy via render.yaml (Blueprint)

1. Go to https://dashboard.render.com/select-repo?type=blueprint
2. Connect repository `xiaohonsu/IA04`
3. Render will detect `backend/render.yaml`
4. Set the environment variables manually in the dashboard after creation

---

## Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Login to Vercel**
   - Go to https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import Git Repository: `xiaohonsu/IA04`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Set Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   VITE_API_URL=<your-render-backend-url>
   ```
   
   Example: `VITE_API_URL=https://user-registration-backend.onrender.com`

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy (usually 1-2 minutes)
   - Once deployed, you'll get a URL like: `https://your-app.vercel.app`

6. **Update Backend CORS**
   - Go back to Render dashboard
   - Update `FRONTEND_URL` environment variable with your Vercel URL
   - Example: `FRONTEND_URL=https://your-app.vercel.app`
   - Render will automatically redeploy

### Option 2: Deploy via Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to frontend directory
cd 'frontend'

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel --prod

# Set environment variable
vercel env add VITE_API_URL production
# Enter your Render backend URL when prompted
```

---

## Post-Deployment Steps

### 1. Test Backend Endpoints

```powershell
# Test registration
Invoke-RestMethod -Uri "https://your-backend.onrender.com/user/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"test@example.com","password":"test123"}'

# Test login
Invoke-RestMethod -Uri "https://your-backend.onrender.com/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"test@example.com","password":"test123"}'
```

### 2. Test Frontend

1. Open your Vercel URL in browser
2. Navigate to `/signup` and create an account
3. Login with your credentials
4. Verify you can access the dashboard
5. Test logout functionality

### 3. Monitor Logs

- **Render**: Dashboard → Your Service → Logs
- **Vercel**: Dashboard → Your Project → Deployments → View Function Logs

---

## Troubleshooting

### Backend Issues

**Build fails on Render:**
- Check if `package.json` has correct scripts
- Verify Node version compatibility (Render uses latest LTS by default)
- Check Render build logs for specific errors

**CORS errors:**
- Ensure `FRONTEND_URL` in Render matches your Vercel deployment URL exactly
- No trailing slash in URLs
- Must use HTTPS in production URLs

**Database connection fails:**
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0 in Network Access)
- Check `MONGODB_URI` is correct and includes credentials
- Ensure IP whitelist in MongoDB Atlas includes Render IPs or set to allow all

**JWT errors:**
- Verify all JWT environment variables are set
- Secrets must be at least 32 characters
- Check expiration format is correct (e.g., '15m', '7d')

### Frontend Issues

**Build fails on Vercel:**
- Check TypeScript errors in build logs
- Verify all dependencies are in `package.json`
- Check `vite.config.ts` is valid

**API calls fail:**
- Verify `VITE_API_URL` environment variable is set correctly
- Must include protocol (https://)
- No trailing slash
- Check browser console for actual error messages

**Routes don't work (404 on refresh):**
- Verify `vercel.json` has proper rewrites configuration
- Should already be configured in your project

**Environment variables not working:**
- Vercel requires `VITE_` prefix for client-side variables
- Redeploy after adding environment variables
- Clear browser cache after redeploy

---

## Production Checklist

- [ ] Backend deployed on Render with all environment variables set
- [ ] Frontend deployed on Vercel with VITE_API_URL set
- [ ] MongoDB Atlas network access allows Render connections
- [ ] CORS configured with correct frontend URL
- [ ] JWT secrets are strong random strings (not defaults)
- [ ] Test user registration flow end-to-end
- [ ] Test login → dashboard → logout flow
- [ ] Test token refresh (wait for access token to expire)
- [ ] Monitor logs for any runtime errors
- [ ] Set up custom domain (optional)

---

## URLs Summary

After deployment, document your URLs:

```
Backend (Render):  https://_____.onrender.com
Frontend (Vercel): https://_____.vercel.app
GitHub Repo:       https://github.com/xiaohonsu/IA04
```

---

## Notes

- **Free Tier Limits**:
  - Render: Backend may sleep after 15 min inactivity (cold starts ~30-60s)
  - Vercel: Generous free tier for frontend, no sleep
  - MongoDB Atlas: 512MB free tier

- **Custom Domains**: Both Render and Vercel support custom domains in free tier

- **Automatic Deploys**: Both platforms auto-deploy on git push to `main` branch

---

## Support

If you encounter issues:
1. Check service logs (Render/Vercel dashboards)
2. Verify all environment variables are set correctly
3. Test API endpoints directly with curl/Postman
4. Check MongoDB Atlas connection from your IP first
5. Review browser console for frontend errors
