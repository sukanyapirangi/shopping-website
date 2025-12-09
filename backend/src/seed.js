const { prisma } = require("./db/prisma");
const bcrypt = require("bcryptjs");

async function run() {
  try {
    // Delete existing data first
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.adminUser.deleteMany();

    // Seed admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.adminUser.create({
      data: {
        email: "admin@example.com",
        password: hashedPassword,
        role: "ADMIN"
      }
    });

    console.log("👑 Admin user seeded!");

    // Seed products
    await prisma.product.createMany({
      data: [
        {
          name: "Red T-Shirt",
          description: "100% cotton T-shirt",
          price: 499,
          stock: 20,
          category: "Clothing",
          status: "ACTIVE",
          imageUrl: "https://via.placeholder.com/200"
        },
        {
          name: "Blue Jeans",
          description: "Comfort fit denim jeans",
          price: 1299,
          stock: 15,
          category: "Clothing",
          status: "ACTIVE",
          imageUrl: "https://via.placeholder.com/200"
        },
        {
          name: "Sports Shoes",
          description: "Running shoes for all-day comfort",
          price: 2999,
          stock: 10,
          category: "Footwear",
          status: "ACTIVE",
          imageUrl: "https://via.placeholder.com/200"
        }
      ]
    });

    console.log("🌱 Products seeded successfully!");
  } catch (error) {
    console.error("Seed Failed:", error);
  } finally {
    process.exit();
  }
}

run();

