import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { API_ROUTES } from '@feed/shared/api';
import request from 'supertest';

describe('UserController E2E', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();

        await app.init();
    });

    describe('GET /users/me', () => {
        it('should get user profile', () => {
            return request(app.getHttpServer()).get(API_ROUTES.USERS.ME).expect(401);
        });
    });
});
