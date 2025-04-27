/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role, User } from '@prisma/client';
import { Request } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    role: Role.PARTICIPANT,
    phone: null,
    bio: null,
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAuthService = {
    register: jest.fn().mockResolvedValue({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    }),
    validateUser: jest.fn().mockResolvedValue({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    }),
    login: jest.fn().mockReturnValue({
      access_token: 'fake-jwt-token',
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
      },
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await authController.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    expect(result).toEqual({
      message: 'Usuário criado com sucesso',
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
      },
    });
    expect(authService.register).toHaveBeenCalled();
  });

  it('should login a user', async () => {
    const result = await authController.login({
      email: mockUser.email,
      password: '123456',
    });

    expect(result).toEqual({
      access_token: 'fake-jwt-token',
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
      },
    });
    expect(authService.validateUser).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalled();
  });

  it('should return user profile', () => {
    const req = {
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
      },
    } as Request & { user: Omit<User, 'password'> };

    const result = authController.getProfile(req);

    expect(result).toEqual(req.user);
  });
});
