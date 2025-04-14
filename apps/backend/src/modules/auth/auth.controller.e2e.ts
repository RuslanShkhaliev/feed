import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { execSync } from 'child_process';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { API_ROUTES } from '@feed/shared/api';

config({ path: '.env.test' });

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        execSync('yarn prisma migrate reset --force --skip-seed', {
            stdio: 'inherit',
        });

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.use(cookieParser());
        app.useGlobalPipes(new ValidationPipe({ transform: true }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const testUser = {
        email: 'e2e@mail.com',
        password: 'strong-password',
    };

    it('/auth/register (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post(API_ROUTES.AUTH.REGISTER)
            .send(testUser)
            .expect(201);

        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('user');
        expect(res.headers['set-cookie']).toEqual(
            expect.arrayContaining([expect.stringMatching(/refreshToken=/)]),
        );
    });

    it('/auth/login (POST)', async () => {
        const res = await request(app.getHttpServer())
            .post(API_ROUTES.AUTH.LOGIN)
            .send(testUser)
            .expect(200);

        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('user');
    });

    // it('/auth/refresh (POST)', async () => {
    //     const loginRes = await request(app.getHttpServer())
    //         .post(API_ROUTES.AUTH.REFRESH)
    //         .send(testUser);
    //
    //     const refreshToken: string = (loginRes.headers['set-cookie'] || []).find((cookie) =>
    //         cookie.startsWith('refreshToken='),
    //     );
    //
    //     const res = await request(app.getHttpServer())
    //         .post(API_ROUTES.AUTH.REFRESH)
    //         .set('Cookie', refreshToken)
    //         .expect(200);
    //
    //     expect(res.body).toHaveProperty('accessToken');
    // });

    it('/auth/logout (GET)', async () => {
        const res = await request(app.getHttpServer()).get(API_ROUTES.AUTH.LOGOUT).expect(200);

        expect(res.body).toEqual({ message: 'Logged out successfully' });
    });
});
