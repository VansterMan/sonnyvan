# Guest Code Import Guide

## Prerequisites
- Node.js installed on your computer
- Firebase project set up with your configuration
- Guest codes list ready

## Step-by-Step Instructions

### Option 1: Using the Import Script (Recommended)

1. **Edit the import script**
   - Open `import-codes.js`
   - Replace the Firebase config with your actual values
   - Add your guest codes to the `guestCodes` array in this format:
     ```javascript
     { code: 'UNIQUE-CODE', invited: true, internalComments: 'optional note' }
     ```
   - Set `invited` to `true` if you've sent the invitation, `false` if not
   - Set `internalComments` to `null` or a string like `'VIP guest'` or `'Plus one from John'`

2. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Choose the LTS version

3. **Open terminal/command prompt**
   - Navigate to your project folder:
     ```bash
     cd path/to/wedding-rsvp
     ```

4. **Install Firebase**
   ```bash
   npm install firebase
   ```

5. **Run the import script**
   ```bash
   node import-codes.js
   ```

6. **Verify in Firebase Console**
   - Go to Firebase Console → Firestore Database
   - Check the `rsvps` collection for your codes

### Option 2: Manual Entry (For Small Guest Lists)

If you only have a few guests (under 20), you can add them manually:

1. Go to Firebase Console → Firestore Database
2. Click "Start collection" (or add to existing `rsvps` collection)
3. Collection ID: `rsvps`
4. Add a document:
   - Document ID: Your guest code (e.g., `smith-family`)
   - Leave all fields empty or click "Add field" to pre-populate
5. Repeat for each guest

### Option 3: Using Firebase Console Bulk Import

1. **Create a CSV file** with your codes:
   ```csv
   code
   CODE1
   CODE2
   CODE3
   ```

2. **Use Firebase CLI** (more advanced):
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase firestore:import your-codes.json
   ```

## Guest Code Format Examples

The new format includes administrative tracking:

```javascript
const guestCodes = [
  { code: '001', invited: true, internalComments: null },
  { code: '002', invited: false, internalComments: 'Send after venue confirmed' },
  { code: 'smith-family', invited: true, internalComments: 'Atlanta side, close friends' },
  { code: 'garcia-wedding', invited: true, internalComments: 'DC side, plus one approved' },
  { code: 'atlanta-coworkers', invited: false, internalComments: null }
];
```

**Code naming rules:**
- Use only letters, numbers, hyphens, and underscores
- No spaces or special characters
- Keep them reasonably short (under 50 characters)
- Make each one unique

**Invited status:**
- `true` = Invitation has been sent
- `false` = Not yet invited (default for new codes)

**Internal comments:**
- `null` = No notes (default)
- Any string = Private notes for organizers (e.g., 'VIP', 'Plus one', 'Follow up needed')

## Troubleshooting

**Error: "Cannot find module 'firebase'"**
- Solution: Run `npm install firebase` in your project folder

**Error: "Permission denied"**
- Solution: Check your Firestore security rules allow writes

**Error: "Document already exists"**
- Solution: This is fine - it means the code was already imported

## Pre-populating Guest Data

If you want to pre-fill some guest information (like names), modify the script:

```javascript
await setDoc(doc(db, 'rsvps', 'smith-family'), {
  atlantaAttending: '',
  atlantaGuest1Name: 'John Smith',  // Pre-filled
  atlantaGuest1Email: 'john@example.com',  // Pre-filled
  // ... rest of fields
});
```

## After Import

Once codes are imported, share links with guests:
```
https://sonnyandvan.com/?code=smith-family
https://sonnyandvan.com/?code=jones-wedding
https://sonnyandvan.com/?code=CODE1
```

Test each link to make sure it works!
