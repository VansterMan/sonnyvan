# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Name it something like "wedding-rsvp"
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set Up Firestore Database

1. In your Firebase project, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Start in **production mode** (we'll add security rules)
4. Choose a Cloud Firestore location (e.g., us-central)
5. Click "Enable"

## Step 3: Configure Firestore Security Rules

1. In Firestore Database, go to the "Rules" tab
2. Replace the default rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{guestCode} {
      // Allow read/write only to the specific guest code passed in the URL
      allow read, write: if request.auth == null;
    }
  }
}
```

3. Click "Publish"

**Note:** These rules allow unauthenticated access since we're using URL codes for access control. For additional security, you could implement Firebase Authentication or add rate limiting through Cloud Functions.

## Step 4: Get Your Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app with a nickname (e.g., "wedding-rsvp-web")
5. Copy the `firebaseConfig` object

## Step 5: Add Firebase Config to Your App

Open `src/App.jsx` and replace the placeholder config with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 6: Pre-populate Guest Codes (Optional)

You can manually add guest codes to Firestore:

1. Go to Firestore Database in Firebase Console
2. Click "Start collection"
3. Collection ID: `rsvps`
4. Add documents with guest codes as document IDs (e.g., "ABC123")
5. Leave fields empty - they'll be populated when guests submit

### Or use this script to bulk import codes:

Create a file called `import-codes.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Your config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const guestCodes = [
  'CODE1',
  'CODE2',
  'CODE3',
  // Add all your codes here
];

async function importCodes() {
  for (const code of guestCodes) {
    await setDoc(doc(db, 'rsvps', code), {
      // Initialize with empty fields
      atlantaAttending: '',
      atlantaGuest1Name: '',
      // ... etc
    });
    console.log(`Imported: ${code}`);
  }
}

importCodes();
```

## Firestore Data Structure

Each document in the `rsvps` collection will have this structure:

```
{
  // Administrative Fields (not visible to guests)
  invited: boolean,
  internalComments: string | null,
  
  // Atlanta Reception
  atlantaAttending: "yes" | "maybe" | "no" | "",
  atlantaGuest1Name: string,
  atlantaGuest1Email: string,
  atlantaGuest1DietaryRestrictions: string,
  atlantaGuest2Name: string,
  atlantaGuest2Email: string,
  atlantaGuest2DietaryRestrictions: string,
  
  // Washington, DC Reception
  dcAttending: "yes" | "maybe" | "no" | "",
  dcGuest1Name: string,
  dcGuest1Email: string,
  dcGuest1DietaryRestrictions: string,
  dcGuest2Name: string,
  dcGuest2Email: string,
  dcGuest2DietaryRestrictions: string,
  
  // Additional Info
  additionalComments: string,
  createdAt: timestamp,
  lastUpdated: timestamp
}
```

## Guest URLs

Guests will access the form using URLs like:
```
https://sonnyandvan.com/?code=ABC123
```

Each guest gets a unique code that you create and share with them.
