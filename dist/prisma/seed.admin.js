"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const plainPassword = "admin@123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await prisma.user.create({
        data: {
            name: "admin",
            email: "admin@gmail.com",
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
//# sourceMappingURL=seed.admin.js.map