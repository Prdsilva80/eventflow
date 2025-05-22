import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@/auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let authService: AuthService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-secret'),
  };

  const mockAuthService = {
    findUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user data when user exists', async () => {
      const payload = {
        sub: 1,
        email: 'test@example.com',
        role: 'PARTICIPANT',
      };
      const user = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'PARTICIPANT',
      };

      mockAuthService.findUserById.mockResolvedValue(user);

      const result = await jwtStrategy.validate(payload);

      expect(result).toEqual(user);
      expect(authService.findUserById).toHaveBeenCalledWith(1);
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      const payload = {
        sub: 999,
        email: 'nonexistent@example.com',
        role: 'PARTICIPANT',
      };

      mockAuthService.findUserById.mockResolvedValue(null);

      await expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.findUserById).toHaveBeenCalledWith(999);
    });
  });
});
