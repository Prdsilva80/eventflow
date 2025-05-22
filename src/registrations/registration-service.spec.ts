// src/registrations/registration-service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationStatus, EventStatus, Role, Prisma } from '@prisma/client';
import { RegistrationService } from './registration.service';
import { PrismaService } from '../config/prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let prismaService: PrismaService;

  type RegistrationWithRelations = Prisma.RegistrationGetPayload<{
    include: { event: true; user: true };
  }>;

  type EventWithRegistrations = Prisma.EventGetPayload<{
    include: { registrations: true };
  }>;

  const mockRegistration: RegistrationWithRelations = {
    id: 1,
    userId: 1,
    eventId: 1,
    status: RegistrationStatus.PENDING,
    createdAt: new Date(),
    event: {
      id: 1,
      name: 'Test Event',
      description: '',
      date: new Date(),
      location: '',
      capacity: 100,
      status: EventStatus.PUBLISHED,
      organizerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: '',
      role: Role.PARTICIPANT,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarUrl: null,
      bio: null,
      phone: null,
    },
  };

  const mockEvent: EventWithRegistrations = {
    id: 1,
    name: 'Test Event',
    description: '',
    date: new Date(),
    location: '',
    capacity: 100,
    status: EventStatus.PUBLISHED,
    organizerId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    registrations: [],
  };

  const mockPrismaService = {
    registration: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    event: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn().mockImplementation((cb: () => any) => cb()),
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a registration', async () => {
      const dto: CreateRegistrationDto = {
        userId: 1,
        eventId: 1,
      };

      jest
        .spyOn(prismaService.event, 'findUnique')
        .mockResolvedValue(mockEvent);

      jest
        .spyOn(prismaService.registration, 'create')
        .mockResolvedValue(mockRegistration);

      const result = await service.create(dto);

      expect(result).toEqual(mockRegistration);
      expect(prismaService.event.findUnique).toHaveBeenCalledWith({
        where: { id: dto.eventId },
        include: { registrations: true },
      });
      expect(prismaService.registration.create).toHaveBeenCalledWith({
        data: {
          userId: dto.userId,
          eventId: dto.eventId,
          status: RegistrationStatus.PENDING,
        },
        include: {
          event: true,
          user: true,
        },
      });
    });

    it('should throw an error when event capacity is reached', async () => {
      const dto: CreateRegistrationDto = {
        userId: 1,
        eventId: 1,
      };

      const fullEvent: EventWithRegistrations = {
        ...mockEvent,
        capacity: 2,
        registrations: [
          {
            id: 1,
            userId: 1,
            eventId: 1,
            status: RegistrationStatus.CONFIRMED,
            createdAt: new Date(),
          },
          {
            id: 2,
            userId: 2,
            eventId: 1,
            status: RegistrationStatus.CONFIRMED,
            createdAt: new Date(),
          },
        ],
      };

      jest
        .spyOn(prismaService.event, 'findUnique')
        .mockResolvedValue(fullEvent);

      await expect(service.create(dto)).rejects.toThrow(
        'Event capacity has been reached',
      );
    });
  });

  describe('findAll', () => {
    it('should return all registrations', async () => {
      jest
        .spyOn(prismaService.registration, 'findMany')
        .mockResolvedValue([mockRegistration]);

      const result = await service.findAll();

      expect(result).toEqual([mockRegistration]);
      expect(prismaService.registration.findMany).toHaveBeenCalledWith({
        include: {
          event: true,
          user: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a registration by id', async () => {
      jest
        .spyOn(prismaService.registration, 'findUnique')
        .mockResolvedValue(mockRegistration);

      const result = await service.findOne(1);

      expect(result).toEqual(mockRegistration);
      expect(prismaService.registration.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          event: true,
          user: true,
        },
      });
    });
  });

  describe('update', () => {
    it('should update registration status', async () => {
      const updateData = { status: RegistrationStatus.CONFIRMED };
      const updatedRegistration = {
        ...mockRegistration,
        status: RegistrationStatus.CONFIRMED,
      };

      jest
        .spyOn(prismaService.registration, 'update')
        .mockResolvedValue(updatedRegistration);

      const result = await service.update(1, updateData);

      expect(result).toEqual(updatedRegistration);
      expect(prismaService.registration.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        include: {
          event: true,
          user: true,
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete a registration', async () => {
      jest
        .spyOn(prismaService.registration, 'delete')
        .mockResolvedValue(mockRegistration);

      const result = await service.remove(1);

      expect(result).toEqual(mockRegistration);
      expect(prismaService.registration.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          event: true,
          user: true,
        },
      });
    });
  });
});
