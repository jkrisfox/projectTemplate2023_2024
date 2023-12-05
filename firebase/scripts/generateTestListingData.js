const { faker } = require("@faker-js/faker");
const { db, admin } = require("../firebaseAdminConfig");

const citiesNearSanLuisObispo = [
  "San Luis Obispo",
  "Pismo Beach",
  "Morro Bay",
  "Atascadero",
  "Paso Robles",
  "Arroyo Grande",
  "Grover Beach",
  "Los Osos",
  "Cambria",
  "Santa Maria"
];

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

const brandsAndAdjectives = {
  "Furniture": ["Ikea", "Herman Miller", "Ashley", "Modern", "Vintage", "Sleek", "Minimalistic", "Luxurious", "Functional", "Elegant", "Artisanal", "Custom-made", "Affordable", "Quality", "Traditional"],
  "Electronics": ["Dell", "Apple", "Samsung", "Sony", "Portable", "Innovative", "High-Tech", "Cutting-Edge", "Efficient", "Smart", "Reliable", "Compact", "Affordable", "Gaming", "User-Friendly"],
  "School Supplies": ["Staples", "Office Depot", "Durable", "Ergonomic", "Compact", "Organized", "Efficient", "Sustainable", "Creative", "Educational", "Quality", "Inclusive", "Eco-friendly", "Affordable", "Practical"],
  "Home Decor": ["Handmade", "Antique", "Contemporary", "Minimalist", "Rustic", "Chic", "Artistic", "Eclectic", "Cozy", "Whimsical", "Vintage-inspired", "Timeless", "Bohemian", "Affordable", "Unique"],
  "Clothing and Accessories": ["Nike", "Adidas", "Levi's", "Casual", "Elegant", "Trendy", "Fashionable", "Versatile", "Comfortable", "Sustainable", "Unique", "Designer", "Affordable", "Durable", "Stylish"],
  "Appliances": ["LG", "Whirlpool", "Bosch", "High-Efficiency", "Energy-Saving", "Smart", "Advanced", "Reliable", "Sleek", "Innovative", "Quiet", "Connected", "Space-saving", "Affordable", "Modern"],
  "Bicycles and Transportation": ["Trek", "Giant", "Cannondale", "Lightweight", "Foldable", "Durable", "Fast", "Adventure-ready", "Eco-friendly", "Customizable", "Urban", "Mountain", "Commuter", "Affordable", "Reliable"],
  "Textbooks": ["Pearson", "McGraw-Hill", "Oxford", "Comprehensive", "Essential", "Informative", "Educational", "Authoritative", "Engaging", "Interactive", "Accessible", "Updated", "Scholarly", "Affordable", "Comprehensive"],
  "Sports and Fitness Equipment": ["Under Armour", "Reebok", "Wilson", "Adjustable", "Multifunctional", "High-Performance", "Sturdy", "Athletic", "Motivational", "Professional", "Versatile", "Hygienic", "Inclusive", "Affordable", "Durable"],
  "Home Office": ["HP", "Logitech", "Epson", "Ergonomic", "Compact", "Productive", "Streamlined", "Professional", "Wireless", "Space-saving", "Sleek", "High-Quality", "Efficient", "Affordable", "Reliable"],
  "Miscellaneous": ["Generic", "Specialty", "Multipurpose", "Unique", "Custom", "Unconventional", "Inventive", "Exceptional", "Intriguing", "Versatile", "Quirky", "Practical", "Memorable", "Affordable", "Diverse"]
};


const generateFakeData = async () => {
  const listingsCollection = db.collection("listings");

  for (let i = 0; i < 300; i++) {
    const randomCategory = Object.keys(categoryProducts)[Math.floor(Math.random() * Object.keys(categoryProducts).length)];
    const randomProduct = categoryProducts[randomCategory][Math.floor(Math.random() * categoryProducts[randomCategory].length)];
    const brandOrAdjective = brandsAndAdjectives[randomCategory][Math.floor(Math.random() * brandsAndAdjectives[randomCategory].length)];
    const title = `${brandOrAdjective} ${randomProduct}`;
    const description = `A ${faker.commerce.productMaterial().toLowerCase()}, ${faker.commerce.productMaterial().toLowerCase()} ${randomProduct.toLowerCase()} with ${faker.commerce.productAdjective().toLowerCase()} and ${faker.commerce.productAdjective().toLowerCase()} features.`;
    const keywords = title.split(' ').concat(randomCategory.toLowerCase().split(' '));
    const imageKeywords = keywords.join(','); // Combining keywords for a more focused search
    const randomPrice = faker.datatype.boolean() ? 0 : faker.commerce.price(50, 500);
    const city = citiesNearSanLuisObispo[Math.floor(Math.random() * citiesNearSanLuisObispo.length)];
    const images = Array.from({ length: 3 }, () => faker.image.urlLoremFlickr({ tags: imageKeywords }));

    const priceHistory = Array.from({ length: 3 }, () => ({
      price: faker.commerce.price(50, 500),
      date: faker.date.past(),
    }));

    const fakeListing = {
      category: randomCategory,
      createdAt: faker.date.past(),
      description: description,
      images: images,
      location: city,
      price: randomPrice,
      priceHistory: priceHistory,
      sellerId: `/users/${faker.datatype.uuid()}`,
      studentVerification: faker.datatype.boolean(),
      title: title,
      updatedAt: faker.date.recent(),
      videos: [faker.internet.url()], 
    };

    await listingsCollection.add(fakeListing);
  }

  console.log("Fake data generation complete");
};

generateFakeData().catch(console.error);