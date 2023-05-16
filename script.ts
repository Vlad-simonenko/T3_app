import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findMany({});
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$connect();
    console.log("connected");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });