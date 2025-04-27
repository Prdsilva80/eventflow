import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { PrismaService } from '@/config/prisma/prisma.service';

describe('FeedbackService', () => {
  let feedbackService: FeedbackService;
  let prismaService: PrismaService;

  const mockFeedback = {
    id: 1,
    rating: 5,
    comment: 'Amazing event!',
    userId: 1,
    eventId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [FeedbackService, PrismaService],
    }).compile();

    feedbackService = moduleRef.get<FeedbackService>(FeedbackService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(feedbackService).toBeDefined();
  });

  it('should return all feedbacks', async () => {
    jest
      .spyOn(prismaService.feedback, 'findMany')
      .mockResolvedValue([mockFeedback]);

    const feedbacks = await feedbackService.findAll();
    expect(feedbacks).toEqual([mockFeedback]);
  });

  it('should create feedback', async () => {
    jest
      .spyOn(prismaService.feedback, 'create')
      .mockResolvedValue(mockFeedback);

    const feedback = await feedbackService.create({
      rating: 5,
      comment: 'Amazing event!',
      userId: 1,
      eventId: 1,
    });

    expect(feedback).toMatchObject({
      id: mockFeedback.id,
      rating: mockFeedback.rating,
    });
  });
});
