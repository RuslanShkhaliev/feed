import { prisma } from './client';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../src/modules/auth';
import { faker } from '@faker-js/faker';
import { Post, User } from '@prisma/client';

const up = async () => {
  const usersPromises = Array.from({ length: 20 }, () => {
    return prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.firstName(),
        activated: Boolean(Math.random() > 0.5),
        password: bcrypt.hashSync('123', SALT_ROUNDS),
      },
    });
  });

  const users: User[] = await Promise.all(usersPromises);

  users.push(
    await prisma.user.create({
      data: {
        email: 'ruslan@mail.ru',
        name: 'Ruslan',
        activated: Boolean(Math.random() > 0.5),
        password: bcrypt.hashSync('123', SALT_ROUNDS),
      },
    }),
  );

  console.log(`✅ Создано пользователей: ${users.length}`);

  const posts: Post[] = [];
  for (const user of users) {
    const postCount = faker.number.int({ min: 1, max: 10 });

    for (let i = 1; i <= postCount; i++) {
      const post = await prisma.post.create({
        data: {
          content: faker.lorem.sentences({ min: 1, max: 3 }),
          images: faker.helpers.arrayElements(
            [
              faker.image.urlPicsumPhotos(),
              faker.image.urlLoremFlickr(),
              faker.image.url(),
            ],
            faker.number.int({ min: 0, max: 3 }),
          ),
          authorId: user.id,
          published: faker.datatype.boolean(),
        },
      });
      posts.push(post);
    }
  }

  console.log(`✅ Создано постов: ${posts.length}`);
};

const down = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Friendship" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE`;
};
const main = async () => {
  console.log('🌱 Начинаем генерацию...');
  await down();
  await up();
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
