import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService, SafeUser } from './user.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { RoleFilterDto } from './dto/role-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let userController: UserController;

  const mockUser: SafeUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: Role.PARTICIPANT,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    updateProfile: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return current user profile', async () => {
    const mockRequest = {
      user: { userId: 1 },
    } as Request & { user: { userId: number } };

    const result = await userController.getProfile(mockRequest);

    expect(result).toEqual(mockUser);
    expect(mockUserService.findById).toHaveBeenCalledWith(1);
  });

  it('should update current user profile', async () => {
    const mockRequest = {
      user: { userId: 1 },
    } as Request & { user: { userId: number } };

    const updateData: UpdateUserDto = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    const result = await userController.updateProfile(mockRequest, updateData);

    expect(result).toEqual(mockUser);
    expect(mockUserService.updateProfile).toHaveBeenCalledWith(1, updateData);
  });

  it('should find all users', async () => {
    const filter: RoleFilterDto = { role: Role.PARTICIPANT };

    const result = await userController.findAll(filter);

    expect(result).toEqual([mockUser]);
    expect(mockUserService.findAll).toHaveBeenCalledWith(filter);
  });
});
