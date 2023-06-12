import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();
import * as argon from "argon2";
async function main() {
  const plainPassword = "admin@123";
  //   const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash the password with salt rounds of 10
  const hash = await argon.hash(plainPassword);
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@gmail.com",
      password: hash,
      googleid: null,
      hashedRt: null,
      roleId: 2
    },
  });
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
