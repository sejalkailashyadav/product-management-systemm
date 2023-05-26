import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function createProductwithCat() {
  const cetogryarray = Array(10)
    .fill(null)
    .map(() => {
      return prisma.category.create({
        data: {
          category_name: faker.commerce.productAdjective(),
        },
      });
    });
  const categiroes = await prisma.$transaction(cetogryarray);
  const productpromise = Array(10)
    .fill(null)
    .map(() => {
      return prisma.product.create({
        data: {
          product_name: faker.commerce.productName(),
          product_description: faker.commerce.productDescription(),
          product_price: faker.phone.imei(),
          product_image: faker.image.avatar(),
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

console.log("many-to-many");
console.log(JSON.stringify(createProductwithCat(), null, 2));
