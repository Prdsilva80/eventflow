import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { PrismaService } from '@/config/prisma/prisma.service';
import { ResendService } from '@/providers/resend.service';

describe('NotificationService', () => {
  let service: NotificationService;

  const mockPrisma = {
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const mockResend = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ResendService, useValue: mockResend }, // ADICIONADO
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a notification', async () => {
    const userId = 1;
    const email = 'test@example.com';
    const message = 'You have a new event.';
    const result = { id: 1, userId, message };

    mockPrisma.notification.create.mockResolvedValue(result);

    expect(await service.create(userId, email, message)).toEqual(result);
    expect(mockPrisma.notification.create).toHaveBeenCalledWith({
      data: { userId, message },
    });
  });

  it('should return all notifications', async () => {
    const notifications = [{ id: 1, title: 'Test', content: 'Testing' }];

    mockPrisma.notification.findMany.mockResolvedValue(notifications);

    expect(await service.findAll()).toEqual(notifications);
    expect(mockPrisma.notification.findMany).toHaveBeenCalled();
  });
});
