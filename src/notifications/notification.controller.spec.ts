import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

describe('NotificationController', () => {
  let notificationController: NotificationController;
  let notificationService: NotificationService;

  const mockNotification = {
    id: 1,
    title: 'Test Notification',
    message: 'This is a test notification',
    recipientId: 1,
    read: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockNotificationService = {
    findAll: jest.fn().mockResolvedValue([mockNotification]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compile();

    notificationController = module.get<NotificationController>(
      NotificationController,
    );
    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(notificationController).toBeDefined();
  });

  it('should get all notifications', async () => {
    const notifications = await notificationController.findAll();
    expect(notifications).toEqual([mockNotification]);
    expect(notificationService.findAll).toHaveBeenCalled();
  });
});
