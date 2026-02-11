# Admin Dashboard Guide

The admin dashboard provides a complete interface for managing wedding RSVPs.

## Accessing the Dashboard

**Local Development:**
```
http://localhost:3000/admin.html
```

**Production:**
```
https://sonnyandvan.com/admin.html
```

## Default Password

The admin password is stored securely as an environment variable.

**For Local Development:**

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your password:
   ```
   VITE_ADMIN_PASSWORD=your_secure_password_here
   ```

3. Restart your dev server (`npm run dev`) to apply changes

**For Production (Vercel):**

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name:** `VITE_ADMIN_PASSWORD`
   - **Value:** Your secure password
   - **Environment:** Production (and Preview if you want)
4. Redeploy your site for changes to take effect

**Important:** Never commit your `.env` file to Git. It's already in `.gitignore` to protect your password.

## Features

### 1. Response Statistics

View real-time counts for each reception:
- **Yes** - Confirmed attendance
- **Maybe** - Tentative
- **No** - Declined
- **No Response** - Invited but haven't responded yet

Stats only include guests where `invited = true`.

### 2. Generate New Invitation

Click "Generate New Invitation" to:
1. Randomly select an uninvited code (`invited = false`)
2. Display the guest URL
3. Add optional internal comments
4. Mark the code as `invited = true`

This is useful for sending invitations one at a time.

### 3. Export Responses (CSV)

Click "Export Responses" to download a CSV file containing:
- All fields for all invited guests
- Filename format: `wedding-rsvps-YYYY-MM-DD.csv`
- Can be opened in Excel, Google Sheets, etc.

**CSV Includes:**
- Guest code
- All Atlanta reception data
- All DC reception data
- Dietary restrictions
- Additional comments
- Internal comments
- Timestamps

### 4. Response Table

View all invited guests in a sortable table:

**Columns:**
- **Invite Code** - Links to the guest's RSVP URL (opens in new tab)
- **Internal Comments** - Your private notes
- **Atlanta** - Response status (color-coded)
- **DC** - Response status (color-coded)

**Color Coding:**
- 🟢 Green = Yes
- 🟠 Orange = Maybe
- 🔴 Red = No
- ⚪ Gray = No response

Click any invite code to open that guest's RSVP page in a new tab.

## Workflow Examples

### Sending Invitations

1. Import all codes with `invited = false`
2. Click "Generate New Invitation"
3. Copy the URL displayed
4. Add internal comments (e.g., "Atlanta friend group", "Plus one approved")
5. Click "Mark as Invited"
6. Send the URL to the guest

### Tracking Responses

1. Log into admin dashboard
2. View stats to see overall response rates
3. Check the table to see who hasn't responded
4. Click their code to view their RSVP details
5. Export CSV for offline analysis

### Analyzing Data

1. Click "Export Responses"
2. Open CSV in Excel/Google Sheets
3. Filter by dietary restrictions to plan catering
4. Sort by location to see attendance patterns
5. Use internal comments to identify groups

## Security Notes

- Password is stored in plain text in the code (simple but effective for private use)
- For production, consider Firebase Authentication for more security
- Admin page is not linked from main site (only you know the URL)
- Keep the admin URL private

## Troubleshooting

**Can't log in:**
- Check that you're using the correct password
- Password is case-sensitive
- If you changed it, make sure you redeployed

**Data not loading:**
- Check your internet connection
- Verify Firebase is accessible
- Check browser console for errors
- Try clicking "Refresh Data"

**Export not working:**
- Make sure you have invited guests
- Check browser's download settings
- Try a different browser

**Generate invite shows "All codes invited":**
- All your codes have `invited = true`
- Import more codes with `invited = false`
- Or manually set some codes back to `false` in Firebase Console

## Tips

- Use internal comments to track guest groups (e.g., "Work friends", "Family", "Plus ones")
- Export regularly to keep a backup of responses
- Click "Refresh Data" before making important decisions to ensure you have latest info
- The invite code links make it easy to view individual guest responses

## Future Enhancements

Potential features to add later:
- Email guests directly from dashboard
- Bulk invitation generation
- Advanced filtering and search
- Charts and visualizations
- Guest check-in functionality
- Seating assignments
