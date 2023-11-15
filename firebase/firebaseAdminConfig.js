// firebaseAdminConfig.js
const admin = require('firebase-admin');
const serviceAccount = require('../slomarket_admin_key.json'); // Ensure this path is correct relative to this file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // ... any other configuration options you need
});

// Get Firestore database instance
const db = admin.firestore();

// Export the admin and db objects for use in other files
module.exports = { admin, db };
