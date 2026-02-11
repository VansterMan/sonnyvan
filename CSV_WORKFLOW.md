# CSV Import Workflow

If you have many guest codes to manage, you can use a CSV file for easier editing.

## Step 1: Create Your CSV File

Use `guest-codes-template.csv` as a starting point, or create your own with these columns:

```csv
code,invited,internalComments
smith-family,true,Atlanta side - close friends
jones-wedding,true,
garcia-123,false,DC side - waiting on confirmation
```

**Column details:**
- `code`: Unique guest code (required)
- `invited`: `true` or `false` (required)
- `internalComments`: Notes for organizers (optional, leave blank for no comment)

## Step 2: Convert CSV to Import Format

Save your CSV as `guest-codes.csv` in the project folder, then run:

```bash
node csv-to-import.js
```

This will output JavaScript code that you can copy directly into `import-codes.js`.

## Step 3: Run the Import

After copying the code into `import-codes.js`, run:

```bash
node import-codes.js
```

## Advantages of CSV Workflow

- Edit in Excel, Google Sheets, or any spreadsheet program
- Easy to sort, filter, and manage large guest lists
- Share with your co-organizer for collaborative editing
- Export from other systems (wedding planning software, etc.)

## Example: Managing in Google Sheets

1. Upload `guest-codes-template.csv` to Google Sheets
2. Edit your guest list there
3. Download as CSV when ready to import
4. Run the converter script
5. Import to Firebase

This makes it much easier to track who's been invited and add notes!
