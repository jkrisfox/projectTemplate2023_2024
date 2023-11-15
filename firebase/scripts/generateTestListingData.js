const { faker } = require("@faker-js/faker");
const { db, admin } = require("../firebaseAdminConfig");

const generateFakeData = async () => {
  const listingsCollection = db.collection("listings");

  for (let i = 0; i < 15; i++) {
    const fakeListing = {
      category: "Furniture", // Set category to Furniture
      createdAt: faker.date.past(),
      description: `Chair type: ${faker.commerce.productMaterial()}, Features: ${faker.commerce.productAdjective()}`,
      images: [faker.image.urlLoremFlickr({ category: "furniture" })], // Generate image URL specific to furniture
      isFree: faker.datatype.boolean(),
      location: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
      price: faker.commerce.price(50, 500), // Set a reasonable price range for chairs
      priceHistory: [
        { price: faker.commerce.price(50, 500), date: faker.date.past() },
      ],
      sellerId: `/users/${faker.datatype.uuid()}`,
      studentVerification: faker.datatype.boolean(),
      title: `Chair - ${faker.commerce.productName()}`, // Specify that the product is a chair
      updatedAt: faker.date.recent(),
      videos: [faker.internet.url()], // Just a generic URL, assuming there's no specific method for video URLs in faker
    };

    await listingsCollection.add(fakeListing);
  }

  console.log("Fake data generation complete");
};

generateFakeData().catch(console.error);
