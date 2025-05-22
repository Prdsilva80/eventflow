// src/registrations/registration.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Prisma, Registration, RegistrationStatus } from '@prisma/client';

@Injectable()
export class RegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRegistrationDto): Promise<Registration> {
    const event = await this.prisma.event.findUnique({
      where: { id: dto.eventId },
      include: { registrations: true },
    });

    if (!event) throw new Error('Event not found');

    const confirmedCount = event.registrations.filter(
      (r) => r.status === RegistrationStatus.CONFIRMED,
    ).length;

    if (event.capacity !== null && confirmedCount >= event.capacity) {
      throw new Error('Event capacity has been reached');
    }

    return this.prisma.registration.create({
      data: {
        ...dto,
        status: RegistrationStatus.PENDING,
      },
      include: {
        user: true,
        event: true,
      },
    });
  }

  async findAll(): Promise<Registration[]> {
    return this.prisma.registration.findMany({
      include: { user: true, event: true },
    });
  }

  async findOne(id: number): Promise<Registration | null> {
    return this.prisma.registration.findUnique({
      where: { id },
      include: { user: true, event: true },
    });
  }

  async update(
    id: number,
    updateData: Prisma.RegistrationUpdateInput,
  ): Promise<Registration> {
    return this.prisma.registration.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        event: true,
      },
    });
  }

  async remove(id: number): Promise<Registration> {
    return this.prisma.registration.delete({
      where: { id },
      include: {
        user: true,
        event: true,
      },
    });
  }
}
