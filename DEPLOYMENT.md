# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Firebase project set up (see FIREBASE_SETUP.md)

## Step 1: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git in your project folder:
```bash
git init
git add .
git commit -m "Initial commit - Wedding RSVP app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your wedding-rsvp repository
4. Configure your project:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

## Step 3: Add Environment Variables

In Vercel dashboard, go to your project settings and add environment variables:

1. Navigate to "Settings" > "Environment Variables"
2. Add the following variables:

**Required - Admin Password:**
- **Name:** `VITE_ADMIN_PASSWORD`
- **Value:** Your secure admin password (e.g., `sonnyvan2026`)
- **Environment:** Production, Preview, Development

**Optional - Firebase Config (if you want to hide it):**

If you want to keep your Firebase config secure, you can also use environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Then update `src/App.jsx` and `src/Admin.jsx` to use:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

**Note:** For public web apps, Firebase config can safely remain in the code. The admin password, however, should always be an environment variable.

## Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 1-2 minutes)
3. Your app will be live at `https://your-project.vercel.app`

## Step 5: Set Up Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add your custom domain: `sonnyandvan.com`
4. Follow the instructions to configure your DNS

Vercel will guide you through adding the necessary DNS records to your domain registrar.

## Step 6: Create Guest Invitation Links

After deployment, create unique links for each guest:

```
https://sonnyandvan.com/?code=GUEST1
https://sonnyandvan.com/?code=GUEST2
https://sonnyandvan.com/?code=GUEST3
```

You can use any code format you like:
- Simple numbers: `?code=001`, `?code=002`
- Names: `?code=smith-family`, `?code=jones-family`
- Random strings: `?code=a7b3c9`, `?code=x2y4z6`

Make sure each code is unique and matches what you set up in Firebase.

## Testing the Deployment

1. Visit your app URL with a test code: `https://sonnyandvan.com/?code=TEST123`
2. Fill out the form
3. Submit and verify the confirmation message appears
4. Check Firebase Console > Firestore Database to see the saved data
5. Reload the page and verify the form pre-populates with your data

## Updating the App

To make changes:
1. Edit your code locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Description of changes"
git push
```
3. Vercel will automatically deploy the new version

## Monitoring

- **Deployments:** View all deployments in Vercel dashboard
- **Analytics:** Enable Vercel Analytics for visitor tracking
- **Database:** Monitor responses in Firebase Console

## Troubleshooting

**Issue: White screen after deployment**
- Check browser console for errors
- Verify Firebase config is correct
- Check Vercel deployment logs

**Issue: Form doesn't save**
- Verify Firestore security rules are set correctly
- Check Firebase Console for errors
- Ensure guest code exists in the URL

**Issue: Form doesn't pre-populate**
- Make sure the guest code in the URL matches a document in Firestore
- Check browser console for Firebase errors

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
