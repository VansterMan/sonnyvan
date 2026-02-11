# Environment Variables Setup Guide

This project uses environment variables to securely store sensitive information like the admin password.

## What Are Environment Variables?

Environment variables are values that are stored outside your code, making them:
- **Secure** - Not visible in your public code
- **Flexible** - Different values for development vs production
- **Safe** - Can't be accidentally committed to Git

## Local Development Setup

### Step 1: Create .env File

Copy the example file:
```bash
cp .env.example .env
```

Or create a new `.env` file manually in the project root with:
```
VITE_ADMIN_PASSWORD=your_secure_password_here
```

### Step 2: Set Your Password

Edit `.env` and change `your_secure_password_here` to your actual password.

**Example:**
```
VITE_ADMIN_PASSWORD=mySecurePass123!
```

### Step 3: Restart Dev Server

If the dev server is running, restart it:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

The new password will now work on `http://localhost:3000/admin.html`.

## Production Setup (Vercel)

### Step 1: Open Vercel Dashboard

1. Go to https://vercel.com
2. Select your project
3. Click "Settings"
4. Click "Environment Variables"

### Step 2: Add Variable

1. Click "Add New"
2. Fill in:
   - **Name:** `VITE_ADMIN_PASSWORD`
   - **Value:** Your secure password
   - **Environments:** Check all (Production, Preview, Development)
3. Click "Save"

### Step 3: Redeploy

1. Go to "Deployments" tab
2. Click the three dots on the latest deployment
3. Select "Redeploy"

Or just push a new commit to trigger automatic deployment.

## Important Security Notes

### ✅ DO:
- Keep your `.env` file private
- Use a strong, unique password
- Set the variable in Vercel before deploying
- Share the password securely with your co-organizer (not via email)

### ❌ DON'T:
- Commit `.env` to Git (it's already in `.gitignore`)
- Share your password in public places
- Use the same password as other accounts
- Forget to set it in Vercel

## Verifying It Works

**Local:**
```bash
npm run dev
# Visit http://localhost:3000/admin.html
# Try logging in with your password from .env
```

**Production:**
```
# Visit https://sonnyandvan.com/admin.html
# Try logging in with password from Vercel settings
```

## Troubleshooting

**"Incorrect password" but you know it's right:**
- Make sure dev server was restarted after changing `.env`
- Check for typos or extra spaces in the password
- Verify the variable name is exactly `VITE_ADMIN_PASSWORD`

**Password works locally but not in production:**
- Check that you added the variable in Vercel
- Verify you redeployed after adding the variable
- Check the variable name matches exactly

**Can't find .env file:**
- It might be hidden - use `ls -la` to see hidden files
- Create it manually if needed
- Make sure you're in the project root directory

## Changing Your Password

**Local:**
1. Edit `.env`
2. Change `VITE_ADMIN_PASSWORD` value
3. Restart dev server

**Production:**
1. Go to Vercel → Settings → Environment Variables
2. Click "Edit" on `VITE_ADMIN_PASSWORD`
3. Enter new password
4. Click "Save"
5. Redeploy

## Best Practices

1. **Use a strong password:** Mix of letters, numbers, symbols
2. **Don't reuse passwords:** Unique to this project
3. **Backup securely:** Save password in a password manager
4. **Rotate periodically:** Change password every few months
5. **Limit access:** Only share with people who need admin access

## Questions?

- See `ADMIN_GUIDE.md` for admin dashboard usage
- See `DEPLOYMENT.md` for full deployment instructions
- Check Vercel docs: https://vercel.com/docs/environment-variables
