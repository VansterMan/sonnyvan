// import-codes.js
// Run this script with: node import-codes.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcIAQkmyyW7xFkdlZuBB1cABqqcZPmyzk",
  authDomain: "sonnyvan-4f12e.firebaseapp.com",
  projectId: "sonnyvan-4f12e",
  storageBucket: "sonnyvan-4f12e.firebasestorage.app",
  messagingSenderId: "234434414407",
  appId: "1:234434414407:web:0cb66bf043c5eb61e92e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add your guest codes here with their invited status
const guestCodes = [
  { code: 'CODE1', invited: true, internalComments: null },
  { code: 'CODE2', invited: false, internalComments: null },
  { code: 'CODE3', invited: true, internalComments: 'VIP guest' },
  // Add as many codes as you need
  // Format: { code: 'UNIQUE-CODE', invited: true/false, internalComments: 'optional note' or null }
];

async function importCodes() {
  console.log(`Starting import of ${guestCodes.length} guest codes...`);
  
  for (const guest of guestCodes) {
    try {
      await setDoc(doc(db, 'rsvps', guest.code), {
        // Administrative fields
        invited: guest.invited,
        internalComments: guest.internalComments,
        
        // Initialize guest response fields as empty
        atlantaAttending: '',
        atlantaGuest1Name: '',
        atlantaGuest1Email: '',
        atlantaGuest1DietaryRestrictions: '',
        atlantaGuest2Name: '',
        atlantaGuest2Email: '',
        atlantaGuest2DietaryRestrictions: '',
        dcAttending: '',
        dcGuest1Name: '',
        dcGuest1Email: '',
        dcGuest1DietaryRestrictions: '',
        dcGuest2Name: '',
        dcGuest2Email: '',
        dcGuest2DietaryRestrictions: '',
        additionalComments: '',
        createdAt: new Date().toISOString()
      });
      console.log(`✓ Imported: ${guest.code} (invited: ${guest.invited})`);
    } catch (error) {
      console.error(`✗ Error importing ${guest.code}:`, error);
    }
  }
  
  console.log('Import complete!');
  process.exit(0);
}

importCodes();
