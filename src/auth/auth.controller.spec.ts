import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { SafeUser } from './dto/safe-user.dto';

describe('AuthController', () => {
  let authController: AuthController;

  const mockUser: SafeUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: Role.PARTICIPANT,
  };

  const mockAuthService = {
    register: jest.fn().mockResolvedValue(mockUser),
    validateUser: jest.fn().mockResolvedValue(mockUser),
    login: jest.fn().mockReturnValue({
      access_token: 'fake-jwt-token',
      user: mockUser,
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
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
      user: mockUser,
    });
    expect(mockAuthService.register).toHaveBeenCalled();
  });

  it('should login a user', async () => {
    const result = await authController.login({
      email: 'john@example.com',
      password: '123456',
    });

    expect(result).toEqual({
      access_token: 'fake-jwt-token',
      user: mockUser,
    });
    expect(mockAuthService.validateUser).toHaveBeenCalled();
    expect(mockAuthService.login).toHaveBeenCalled();
  });

  it('should return user profile', async () => {
    const req = {
      user: mockUser,
    } as Request & { user: SafeUser };

    const result = await authController.getProfile(req);

    expect(result).toEqual(mockUser);
  });
});
