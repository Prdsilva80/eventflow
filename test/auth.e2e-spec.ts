/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/config/prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);

    // Limpar usuários do banco de dados antes de cada teste
    await prismaService.user.deleteMany({});

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    // Gerar um email único usando timestamp
    const uniqueEmail = `test${Date.now()}@example.com`;

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: uniqueEmail,
        password: '123456',
      })
      .expect(201);

    // Verificar a mensagem de sucesso
    expect(response.body).toHaveProperty(
      'message',
      'Usuário criado com sucesso',
    );

    // Verificar as propriedades do usuário no objeto user
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('name', 'Test User');
    expect(response.body.user).toHaveProperty('email', uniqueEmail);
    expect(response.body.user).not.toHaveProperty('password'); // Senha não deve ser retornada
  });

  it('should login a registered user', async () => {
    // Gerar um email único para este teste também
    const uniqueEmail = `testlogin${Date.now()}@example.com`;

    // Primeiro registrar o usuário
    await request(app.getHttpServer()).post('/auth/register').send({
      name: 'Login Test User',
      email: uniqueEmail,
      password: '123456',
    });

    // Então tentar fazer login
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: uniqueEmail,
        password: '123456',
      })
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
    expect(response.body.access_token).toBeTruthy();
  });
});
