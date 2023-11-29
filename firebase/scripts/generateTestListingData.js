const { faker } = require("@faker-js/faker");
const { db, admin } = require("../firebaseAdminConfig");

// Define the categories with specific product names
const categoryProducts = {
  "Furniture": ["Chair", "Sofa", "Table", "Closet", "Desk"],
  "Electronics": ["Laptop", "Smartphone", "Tablet", "Headphones", "Camera"],
  "School Supplies": ["Notebook", "Pen", "Backpack", "Calculator", "Binder"],
  "Home Decor": ["Lamp", "Rug", "Curtain", "Vase", "Wall Art"],
  "Clothing and Accessories": ["Jacket", "Sunglasses", "Hat", "Jeans", "Watch"],
  "Appliances": ["Microwave", "Toaster", "Blender", "Vacuum Cleaner", "Coffee Maker"],
  "Bicycles and Transportation": ["Bicycle", "Scooter", "Skateboard", "Helmet", "Rollerblades"],
  "Textbooks": ["Mathematics Textbook", "History Textbook", "Science Textbook", "Literature Textbook", "Language Textbook"],
  "Sports and Fitness Equipment": ["Yoga Mat", "Dumbbells", "Tennis Racket", "Football", "Swim Goggles"],
  "Home Office": ["Printer", "Monitor", "Office Chair", "Keyboard", "Mouse"],
  "Miscellaneous": ["Gift Card", "Tool Set", "Camping Gear", "Board Game", "Book"]
};

const generateFakeData = async () => {
  const listingsCollection = db.collection("listings");

  for (let i = 0; i < 300; i++) {
    const randomCategory = Object.keys(categoryProducts)[Math.floor(Math.random() * Object.keys(categoryProducts).length)];
    const randomProduct = categoryProducts[randomCategory][Math.floor(Math.random() * categoryProducts[randomCategory].length)];

    const description = `Item type: ${faker.commerce.productMaterial()}, Features: ${faker.commerce.productAdjective()}`;
    const title = `${randomCategory} - ${randomProduct}`;
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
