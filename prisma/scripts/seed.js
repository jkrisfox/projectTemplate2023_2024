const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Find or create a category
  let category = await prisma.category.findFirst({
    where: { name: 'Furniture' },
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: 'Furniture' },
    });
  }


  // Create a new user if not exists
  const user = await prisma.user.upsert({
    where: { email: 'fakeuser@example.com' },
    update: {},
    create: {
      email: 'fakeuser@example.com',
      password: 'fakepassword', // In real scenarios, ensure this is hashed
      fullName: 'John Doe',
      isAdmin: false,
      isVerified: true,
      isStudent: false,
      // other required fields
    },
  });

  // Create a new listing for a white chair
  const listing = await prisma.listing.create({
    data: {
      title: 'White Chair',
      description: 'Comfortable white chair in good condition',
      price: 49.99,
      userId: user.id,
      categoryId: category.id,
      images: ['src/assets/whitechairdemo.png'], // Replace with actual image URL
      location: 'Los Angeles, CA',
    },
  });

  console.log('Seed data inserted');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
