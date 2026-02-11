# Sonny & Van's Wedding RSVP App

A mobile-optimized wedding RSVP web application for managing responses to two reception events in Atlanta and Washington, DC.

## Features

- ✅ Dual reception RSVP (Atlanta & Washington, DC)
- ✅ Unique URL-based guest access with pre-populated responses
- ✅ Support for up to 2 guests per invitation
- ✅ Mobile-responsive design with green color scheme
- ✅ Firebase Firestore backend for data persistence
- ✅ Vercel deployment ready
- ✅ No authentication required (secured via unique URL codes)
- ✅ "Maybe" option for attendance
- ✅ **Admin Dashboard** - Password-protected interface for managing RSVPs
  - Response statistics and counts
  - Generate new invitations
  - Export responses to CSV
  - View all invited guests in a table

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Custom CSS with mobile-first design
- **Database:** Firebase Firestore
- **Hosting:** Vercel
- **Domain:** sonnyandvan.com

## Project Structure

```
wedding-rsvp/
├── src/
│   ├── App.jsx           # Main application component
│   ├── App.css           # Styling with green theme
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel deployment config
├── FIREBASE_SETUP.md     # Firebase setup instructions
├── DEPLOYMENT.md         # Vercel deployment guide
└── README.md             # This file
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase & Admin Password

Follow the instructions in `FIREBASE_SETUP.md` to:
- Create a Firebase project
- Set up Firestore database
- Get your Firebase configuration
- Update `src/App.jsx` and `src/Admin.jsx` with your config

**Set your admin password:**
1. Copy `.env.example` to `.env`
2. Edit `.env` and set `VITE_ADMIN_PASSWORD` to your secure password
3. This file is in `.gitignore` so it won't be committed

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000/?code=TEST123` to test the guest RSVP.

Visit `http://localhost:3000/admin.html` to access the admin dashboard (use password from `.env`).

### 4. Deploy to Vercel

Follow the instructions in `DEPLOYMENT.md` to deploy your app. **Important:** Set the `VITE_ADMIN_PASSWORD` environment variable in Vercel settings before deploying.

## How It Works

### Guest Access
Each guest receives a unique URL:
```
https://your-app.vercel.app/?code=ABC123
```

The `code` parameter identifies the guest in the database.

### Data Storage
Responses are stored in Firestore under the `rsvps` collection, with each document ID matching a guest code.

### Form Behavior
- First visit: Empty form
- Subsequent visits: Pre-populated with previous responses
- Updates: Guests can modify their responses anytime using their unique URL

## Database Schema

Each RSVP document contains:

**Administrative Fields (not visible to guests):**
- `invited` (boolean) - Whether invitation has been sent
- `internalComments` (string or null) - Private notes for organizers

**Atlanta Reception:**
- `atlantaAttending` (yes/maybe/no)
- `atlantaGuest1Name`, `atlantaGuest1Email`, `atlantaGuest1DietaryRestrictions`
- `atlantaGuest2Name`, `atlantaGuest2Email`, `atlantaGuest2DietaryRestrictions`

**Washington, DC Reception:**
- `dcAttending` (yes/maybe/no)
- `dcGuest1Name`, `dcGuest1Email`, `dcGuest1DietaryRestrictions`
- `dcGuest2Name`, `dcGuest2Email`, `dcGuest2DietaryRestrictions`

**Additional:**
- `additionalComments`
- `createdAt` (timestamp) - When the code was created
- `lastUpdated` (timestamp) - When guest last updated their RSVP

## Reception Details

### Atlanta Reception
- **Location:** Atlanta, GA (within the perimeter)
- **Date & Time:** Sunday, June 7th, 2026, late afternoon / early evening
- _Specific location and start/end times TBA soon, and you'll get an email._

### Washington, DC Reception
- **Location:** DC, NW quadrant
- **Date & Time:** Sunday, August 2nd, 2026, late afternoon / early evening
- _Specific location and start/end times TBA soon, and you'll get an email._

## Customization

### Colors
The app uses a green theme. To change colors, edit `src/App.css`:
- Primary green: `#4caf50`
- Dark green: `#2e7d32`
- Light green backgrounds: `#e8f5e9`, `#c8e6c9`

### Text Content
All text is in `src/App.jsx`. Update as needed for your specific event details.

### Confirmation Message
Located in the `confirmation-box` section of `src/App.jsx`.

## Managing Guest Codes

You can create guest codes manually in Firebase or use a bulk import script. Codes can be:
- Sequential numbers: `001`, `002`, `003`
- Family names: `smith-family`, `jones-family`
- Random strings: `a7b3c9`, `x2y4z6`

Just ensure each code is unique and matches what you share with guests.

## Viewing Responses

1. Log into [Firebase Console](https://console.firebase.google.com/)
2. Navigate to your project > Firestore Database
3. Browse the `rsvps` collection to see all responses
4. Export data if needed for planning

## License

This is a personal project created for Sonny & Van's wedding.

## Support

For questions or issues with setup, refer to:
- `FIREBASE_SETUP.md` for Firebase configuration
- `DEPLOYMENT.md` for deployment instructions
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
