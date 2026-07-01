const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const passwordClient = await bcrypt.hash("client123", 10);
  const passwordBusiness = await bcrypt.hash("business123", 10);

  await prisma.user.upsert({
    where: { email: "client@goumert.co.zw" },
    update: {},
    create: {
      name: "Goumert Client",
      email: "client@goumert.co.zw",
      password: passwordClient,
      role: "CLIENT",
    },
  });

  await prisma.user.upsert({
    where: { email: "business@goumert.co.zw" },
    update: {},
    create: {
      name: "Goumert Business",
      email: "business@goumert.co.zw",
      password: passwordBusiness,
      role: "BUSINESS",
    },
  });

  const products = [
    {
      name: "Crunchy Classic",
      description: "Vivid orange cereal made for breakfast and snacking.",
      price: 5.5,
      stock: 120,
      category: "Cereal",
      image: "https://images.unsplash.com/photo-1505253218260-66d3b8bc547b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Zim Berry Mix",
      description: "A fruity, crunchy blend designed in Harare.",
      price: 6.2,
      stock: 94,
      category: "Cereal",
      image: "https://images.unsplash.com/photo-1505253218260-66d3b8bc547b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Protein Power Bowl",
      description: "High-energy cereal for active mornings.",
      price: 7.1,
      stock: 65,
      category: "Cereal",
      image: "https://images.unsplash.com/photo-1505253218260-66d3b8bc547b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }

  const expense = await prisma.expense.findFirst({ where: { description: "Initial supply purchase" } });
  if (!expense) {
    await prisma.expense.create({
      data: {
        description: "Initial supply purchase",
        amount: 520.0,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
