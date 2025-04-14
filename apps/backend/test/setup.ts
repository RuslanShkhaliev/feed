import { config } from 'dotenv';
import { TestPrismaService } from './prisma.test.service';
import { execSync } from 'child_process';

config({ path: '.env.test' });

const prisma = new TestPrismaService();

beforeAll(async () => {
  console.log(`Using test database: ${process.env.DATABASE_URL}`);

  execSync('yarn prisma migrate reset --force --skip-seed', {
    stdio: 'inherit',
  });

  execSync('yarn prisma:generate', {
    stdio: 'inherit',
  });
  execSync('yarn prisma:push', {
    stdio: 'inherit',
  });
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.resetDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});