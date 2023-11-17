const { faker } = require("@faker-js/faker");
const { db, admin } = require("../firebaseAdminConfig");

// Define the categories
const categories = [
  "Furniture",
  "Electronics",
  "School Supplies",
  "Home Decor",
  "Clothing and Accessories",
  "Appliances",
  "Bicycles and Transportation",
  "Textbooks",
  "Sports and Fitness Equipment",
  "Home Office",
  "Miscellaneous",
];

const generateFakeData = async () => {
  const listingsCollection = db.collection("listings");

  for (let i = 0; i < 100; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // Adjusted for dynamic category
    const description = `Item type: ${faker.commerce.productMaterial()}, Features: ${faker.commerce.productAdjective()}`;
    const title = `${randomCategory} - ${faker.commerce.productName()}`;

    // Generate a random price, including the possibility of being free ($0)
    const randomPrice = faker.datatype.boolean() ? 0 : faker.commerce.price(50, 500);

    // Generate a random latitude and longitude
    const latitude = faker.address.latitude();
    const longitude = faker.address.longitude();

    // Generate multiple images
    const images = Array.from({ length: 3 }, () => faker.image.urlLoremFlickr({ category: randomCategory.toLowerCase() }));

    // Generate more price history
    const priceHistory = Array.from({ length: 3 }, () => ({
      price: faker.commerce.price(50, 500),
      date: faker.date.past(),
    }));

    const fakeListing = {
      category: randomCategory,
      createdAt: faker.date.past(),
      description: description,
      images: images,
      location: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
      latitude: latitude,
      longitude: longitude,
      price: randomPrice,
      priceHistory: priceHistory,
      sellerId: `/users/${faker.datatype.uuid()}`,
      studentVerification: faker.datatype.boolean(),
      title: title,
      updatedAt: faker.date.recent(),
      videos: [faker.internet.url()], // Just a generic URL, assuming there's no specific method for video URLs in faker
    };

    await listingsCollection.add(fakeListing);
  }

  console.log("Fake data generation complete");
};

generateFakeData().catch(console.error);
