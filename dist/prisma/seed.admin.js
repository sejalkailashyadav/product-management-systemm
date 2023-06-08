"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createProductwithCat() {
    const cetogryarray = Array(10)
        .fill(null)
        .map(() => {
        return prisma.category.create({
            data: {
                category_name: faker_1.faker.commerce.productAdjective(),
            },
        });
    });
    const categiroes = await prisma.$transaction(cetogryarray);
    const productpromise = Array(10)
        .fill(null)
        .map(() => {
        return prisma.product.create({
            data: {
                product_name: faker_1.faker.commerce.productName(),
                product_description: faker_1.faker.commerce.productDescription(),
                product_price: faker_1.faker.phone.imei(),
                product_image: faker_1.faker.image.avatar(),
                catrgory: {
                    connect: [
                        {
                            id: categiroes[Math.floor(Math.random() * categiroes.length)]
                                .id,
                        },
                        {
                            id: categiroes[Math.floor(Math.random() * categiroes.length)]
                                .id,
                        },
                    ],
                },
            },
            include: {
                catrgory: true,
            },
        });
    });
    prisma.$transaction(productpromise);
}
//# sourceMappingURL=seed.admin.js.map