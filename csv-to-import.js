// csv-to-import.js
// Converts guest-codes.csv to JavaScript array format for import-codes.js

import fs from 'fs';

// Read and parse CSV
const csvContent = fs.readFileSync('guest-codes.csv', 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

// Skip header row and process each line
const guestCodes = lines.slice(1).map(line => {
  const values = line.split(',');
  const code = values[0].trim();
  const invited = values[1].trim().toLowerCase() === 'true';
  const internalComments = values[2] && values[2].trim() ? values[2].trim() : null;
  
  return { code, invited, internalComments };
});

// Generate JavaScript code
console.log('Copy this into import-codes.js:\n');
console.log('const guestCodes = [');
guestCodes.forEach((guest, index) => {
  const comment = guest.internalComments ? `'${guest.internalComments}'` : 'null';
  const comma = index < guestCodes.length - 1 ? ',' : '';
  console.log(`  { code: '${guest.code}', invited: ${guest.invited}, internalComments: ${comment} }${comma}`);
});
console.log('];');
console.log(`\n// Total codes: ${guestCodes.length}`);
