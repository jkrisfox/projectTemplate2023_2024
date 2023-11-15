const { db } = require('../firebaseAdminConfig'); // ensure this path is correct for your project structure

const deleteAllListings = async () => {
  const listingsCollection = db.collection('listings');

  // Fetch all documents within the 'listings' collection
  const snapshot = await listingsCollection.get();

  // Create a batch to perform all deletions in one go (to manage write limits)
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref); // Add each document to the batch for deletion
  });

  // Commit the batch deletion
  await batch.commit();

  console.log('All listings have been removed from Firestore.');
};

deleteAllListings().catch(console.error);
