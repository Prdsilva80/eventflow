/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';

describe('EventController', () => {
  let eventController: EventController;
  let eventService: EventService;

  const mockEvent = {
    id: 1,
    title: 'Test Event',
    description: 'Event description',
    date: new Date(),
    location: 'Test location',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockEventService = {
    findAll: jest.fn().mockResolvedValue([mockEvent]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [{ provide: EventService, useValue: mockEventService }],
    }).compile();

    eventController = module.get<EventController>(EventController);
    eventService = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(eventController).toBeDefined();
  });

  it('should get all events', async () => {
    const events = await eventController.findAll();
    expect(events).toEqual([mockEvent]);
    expect(eventService.findAll).toHaveBeenCalled();
  });
});
