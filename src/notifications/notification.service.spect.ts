import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { PrismaService } from '@/config/prisma/prisma.service';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let prismaService: PrismaService;

  const mockNotification = {
    id: 1,
    userId: 1,
    message: 'Test Message',
    isRead: false,
    createdAt: new Date(),
    email: 'test@example.com',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [NotificationService, PrismaService],
    }).compile();

    notificationService =
      moduleRef.get<NotificationService>(NotificationService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });

  it('should return all notifications', async () => {
    jest
      .spyOn(prismaService.notification, 'findMany')
      .mockResolvedValue([mockNotification]);

    const notifications = await notificationService.findAll();
    expect(notifications).toEqual([mockNotification]);
  });

  it('should create a notification', async () => {
    jest
      .spyOn(prismaService.notification, 'create')
      .mockResolvedValue(mockNotification);

    const newNotification = await notificationService.create(
      1, // userId
      'test@example.com', // email
      'Test Message', // message
    );

    expect(newNotification).toMatchObject({
      id: mockNotification.id,
      email: mockNotification.email,
    });
  });
});
