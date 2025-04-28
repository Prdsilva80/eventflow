/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import request from 'supertest';

describe('ProfileController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Cria um usuário e faz login para pegar o token
    const email = `test${Date.now()}@example.com`;
    const password = '123456';

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email,
        password,
      })
      .expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    accessToken = loginResponse.body.access_token;
  });

  it('/profile (GET) should return user profile', async () => {
    const response = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${accessToken}`) // <<< ESSA LINHA É ESSENCIAL
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  });

  afterAll(async () => {
    await app.close();
  });
});
