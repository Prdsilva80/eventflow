import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { PrismaService } from '@/config/prisma/prisma.service';
import { Event, EventStatus } from '@prisma/client';

describe('EventService', () => {
  let eventService: EventService;
  let prismaService: PrismaService;

  const mockEvent: Event = {
    id: 1,
    name: 'Test Event',
    description: 'Test Event Description',
    date: new Date(),
    location: 'Test Location',
    capacity: 100,
    status: EventStatus.PUBLISHED,
    organizerId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, PrismaService],
    }).compile();

    eventService = module.get<EventService>(EventService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(eventService).toBeDefined();
  });

  it('should return an event by ID', async () => {
    const findUniqueSpy = jest
      .spyOn(prismaService.event, 'findUnique')
      .mockResolvedValue(mockEvent);

    const event = await eventService.findById(1);

    expect(event).toEqual(mockEvent);
    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { organizer: true },
    });
  });
});
