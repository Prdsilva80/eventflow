import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  const mockProfileService = {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get user profile', async () => {
    const profile = { id: 1, name: 'John Doe', email: 'john@example.com' };

    mockProfileService.getProfile.mockResolvedValue(profile);

    const mockRequest = {
      user: { userId: 1, email: 'john@example.com', role: 'PARTICIPANT' },
    } as AuthenticatedRequest;

    expect(await controller.getProfile(mockRequest)).toEqual(profile);
    expect(service.getProfile).toHaveBeenCalledWith(1);
  });

  it('should update user profile', async () => {
    const dto: UpdateProfileDto = { name: 'John Updated' };
    const updatedProfile = { id: 1, ...dto };

    mockProfileService.updateProfile.mockResolvedValue(updatedProfile);

    const mockRequest = {
      user: { userId: 1, email: 'john@example.com', role: 'PARTICIPANT' },
    } as AuthenticatedRequest;

    expect(await controller.updateProfile(mockRequest, dto)).toEqual(
      updatedProfile,
    );
    expect(service.updateProfile).toHaveBeenCalledWith(1, dto);
  });
});
