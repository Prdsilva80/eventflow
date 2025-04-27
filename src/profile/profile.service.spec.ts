import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { PrismaService } from '@/config/prisma/prisma.service';
import { User, Role } from '@prisma/client';

describe('ProfileService', () => {
  let profileService: ProfileService;
  let prismaService: PrismaService;

  const mockProfile: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    role: Role.PARTICIPANT,
    phone: '123456789',
    bio: 'Software Developer',
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, PrismaService],
    }).compile();

    profileService = module.get<ProfileService>(ProfileService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(profileService).toBeDefined();
  });

  it('should return a profile by user ID', async () => {
    const findUniqueSpy = jest
      .spyOn(prismaService.user, 'findUnique')
      .mockResolvedValue(mockProfile);

    const profile = await profileService.findProfile(1);

    expect(profile).toEqual(mockProfile);
    expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
