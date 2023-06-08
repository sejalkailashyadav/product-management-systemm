import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
<<<<<<< HEAD
import * as argon from 'argon2';
async function main() {
  const plainPassword = 'admin@123';
=======
import * as argon from "argon2";
async function main() {
  const plainPassword = "admin@123";
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
  //   const hashedPassword = await bcrypt.hash(plainPassword, 10); // Hash the password with salt rounds of 10
  const hash = await argon.hash(plainPassword);
  await prisma.user.create({
    data: {
<<<<<<< HEAD
      name: 'admin',
      email: 'admin@gmail.com',
=======
      name: "admin",
      email: "admin@gmail.com",
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
      password: hash,
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
