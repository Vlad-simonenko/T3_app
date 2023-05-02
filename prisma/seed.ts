import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const harry = await prisma.user.upsert({
    where: { email: "harry.potter@hogwarts.uk" },
    update: {},
    create: {
      email: "harry.potter@hogwarts.uk",
    },
  });
  const gandalf = await prisma.user.upsert({
    where: { email: "gandalf.grey@shire.uk" },
    update: {},
    create: {
      email: "gandalf.grey@shire.uk",
    },
  });
  console.log({ harry, gandalf });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
