const { faker } = require('@faker-js/faker');
const { db, admin } = require('../firebaseAdminConfig'); 

const generateFakeData = async () => {
  const listingsCollection = db.collection('listings');

  for (let i = 0; i < 10; i++) { 
    const fakeListing = {
      category: faker.commerce.product(),
      createdAt: faker.date.past(),
      description: faker.commerce.productDescription(),
      images: [faker.image.url()],
      isFree: faker.datatype.boolean(),
      location: new admin.firestore.GeoPoint(faker.address.latitude(), faker.address.longitude()),
      paymentOptions: faker.finance.transactionType(),
      price: faker.commerce.price(),
      priceHistory: [
        { price: faker.commerce.price(), date: faker.date.past() }
      ],
      sellerId: `/users/${faker.datatype.uuid()}`,
      studentVerification: faker.datatype.boolean(),
      title: faker.commerce.productName(),
      updatedAt: faker.date.recent(),
      videos: [faker.image.url()], // This should be a video URL, you might want to use a different faker method if available
    };

    await listingsCollection.add(fakeListing);
  }

  console.log('Fake data generation complete');
};

generateFakeData().catch(console.error);
