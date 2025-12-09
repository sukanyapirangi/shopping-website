const { prisma } = require("../src/db/prisma");
const bcrypt = require("bcrypt");

async function main() {
  const hash = await bcrypt.hash("Admin@123", 10);

  await prisma.adminUser.create({
    data: {
      email: "admin@example.com",
      password: hash,
      role: "ADMIN"
    }
  });

  console.log("✔ Admin user created successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
