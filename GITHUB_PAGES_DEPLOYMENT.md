# 🚀 GitHub Pages Deployment Guide

## 🚨 Fix for 404 Errors

The 404 errors you're experiencing are due to incorrect file structure and GitHub Pages configuration. Here's how to fix it:

### 1. **File Structure Issue (FIXED)**
Your `App.tsx` was in the root directory, but Vite expects it in `/src/`. I've moved it to the correct location and updated all imports.

### 2. **Required Repository Settings**

Before deploying, configure your GitHub repository:

1. **Go to your repository on GitHub**
2. **Click "Settings" tab**
3. **Scroll to "Pages" section**
4. **Configure source:**
   - Source: "GitHub Actions" (recommended)
   - Or Source: "Deploy from a branch" → Branch: "main" → Folder: "/ (root)"

### 3. **Important: Update Vite Config**

⚠️ **CRITICAL**: You must update the `base` path in `vite.config.ts`:

```typescript
// Replace 'your-repo-name' with your actual GitHub repository name
base: process.env.NODE_ENV === 'production' ? '/your-actual-repo-name/' : '/',
```

**Example**: If your repo is `https://github.com/username/blop-budget-app`, then use:
```typescript
base: process.env.NODE_ENV === 'production' ? '/blop-budget-app/' : '/',
```

---

## ✅ Quick Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Update vite.config.ts** with your repo name
2. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Fix file structure and add GitHub Pages deployment"
   git push origin main
   ```
3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: "GitHub Actions"
4. **The workflow will automatically deploy your app!**

### Option 2: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to gh-pages branch:**
   ```bash
   # Install gh-pages if you haven't
   npm install -g gh-pages
   
   # Deploy
   gh-pages -d dist
   ```

3. **Configure GitHub Pages:**
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages"
   - Folder: "/ (root)"

---

## 🔧 Additional Configuration Files

### Update package.json scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist",
    "predeploy": "npm run build"
  }
}
```

---

## 🌐 Environment Variables for GitHub Pages

If you're using Firebase in production:

1. **Go to your repository Settings → Secrets and variables → Actions**
2. **Add your environment variables:**
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Update the workflow to use these secrets:**
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
       VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
       VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
       VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
       VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
       VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
   ```

---

## 🎯 What Your App Will Look Like

After successful deployment:
- **URL**: `https://yourusername.github.io/your-repo-name/`
- **Demo Mode**: Works perfectly without Firebase
- **Firebase Mode**: Works with proper environment variables
- **Mobile Responsive**: Perfect on all devices
- **PWA-like**: Fast loading and smooth animations

---

## 🚨 Common Issues & Solutions

### 1. **Blank Page After Deployment**
- Check the `base` path in `vite.config.ts`
- Ensure it matches your repository name exactly

### 2. **Assets Not Loading (404)**
- Wrong base path in vite config
- Check browser console for exact error paths

### 3. **GitHub Actions Failing**
- Check the Actions tab in your repository
- Ensure Node.js version compatibility
- Check for any missing dependencies

### 4. **Environment Variables Not Working**
- Ensure they're prefixed with `VITE_`
- Check they're added to GitHub repository secrets
- Verify the workflow is using them correctly

---

## 🔍 Debugging Steps

If your deployment fails:

1. **Check the build locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check GitHub Actions logs:**
   - Go to "Actions" tab in your repository
   - Click on the failed workflow
   - Check logs for specific errors

3. **Verify file structure:**
   ```
   ├── src/
   │   ├── App.tsx          ✅ (moved here)
   │   └── main.tsx         ✅
   ├── index.html           ✅
   ├── vite.config.ts       ✅ (updated base path)
   └── package.json         ✅
   ```

---

## 🎉 Success Checklist

After deployment, your app should:
- ✅ Load without 404 errors
- ✅ Show the Blop login page
- ✅ Work in demo mode with test credentials
- ✅ Be fully responsive on mobile
- ✅ Have smooth animations and transitions
- ✅ Handle dark/light mode switching
- ✅ Show proper branding and styling

---

## 🚀 Next Steps After Deployment

Once your app is live, consider:
- **Custom Domain**: Add a custom domain in GitHub Pages settings
- **Firebase Setup**: Configure Firebase for production data
- **Performance Monitoring**: Set up analytics and error tracking
- **SEO Optimization**: Add meta tags and social media previews
- **PWA Features**: Add service worker for offline functionality

Your Blop budget management application is now ready for the world! 🌟