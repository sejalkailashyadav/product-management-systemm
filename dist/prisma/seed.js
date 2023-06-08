"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const argon = require("argon2");
async function main() {
<<<<<<< HEAD
    const plainPassword = 'admin@123';
    const hash = await argon.hash(plainPassword);
    await prisma.user.create({
        data: {
            name: 'admin',
            email: 'admin@gmail.com',
=======
    const plainPassword = "admin@123";
    const hash = await argon.hash(plainPassword);
    await prisma.user.create({
        data: {
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
//# sourceMappingURL=seed.js.map