<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
=======
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
>>>>>>> 7f6cf4b5a4092156894649a9cca8a0d9f9926e9a
const prisma = new PrismaClient();

<<<<<<< HEAD
async function main() {
  const plainPassword = "admin@123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash the password with salt rounds of 10

  await prisma.user.create({
    data: {
      name: "admin",
      email: "adminmain@gmail.com",
      password: hashedPassword,
      googleid: null,
      hashedRt: null,
      isadmin: true,
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
=======
console.log('many-to-many');
console.log(JSON.stringify(createProductwithCat(), null, 2));
>>>>>>> 7f6cf4b5a4092156894649a9cca8a0d9f9926e9a
