import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@/config/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Mock completo do módulo bcrypt
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;

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

  beforeEach(async () => {
    // Reset dos mocks entre os testes
    jest.clearAllMocks();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return null if user does not exist', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    const result = await authService.validateUser(
      'nonexistent@example.com',
      'password',
    );
    expect(result).toBeNull();
  });

  it('should return null if password is invalid', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    // Mock de bcrypt.compare para retornar false
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = await authService.validateUser(
      mockUser.email,
      'wrongpassword',
    );
    expect(result).toBeNull();
  });

  it('should return user if password is valid', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

    // Mock de bcrypt.compare para retornar true
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await authService.validateUser(
      mockUser.email,
      'hashedpassword',
    );
    expect(result).toMatchObject({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });
  });

  it('should register and return user without password', async () => {
    // Mock de bcrypt.hash para retornar uma senha hash
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

    jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

    const result = await authService.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    expect(result).toMatchObject({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });
  });
});
