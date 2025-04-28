/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { PrismaService } from '@/config/prisma/prisma.service';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get(PrismaService);

    await app.init();

    // 🔥 Limpar o banco de dados antes dos testes
    await prismaService.user.deleteMany();

    // Criar usuário de teste
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test Event User',
        email: 'testevent@example.com',
        password: '123456',
      })
      .expect(201);

    // Logar para obter token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testevent@example.com',
        password: '123456',
      })
      .expect(200);

    accessToken = (loginResponse.body as { access_token: string }).access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/events (GET) should return all events', async () => {
    const response = await request(app.getHttpServer())
      .get('/events')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
