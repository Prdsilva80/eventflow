import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({ data: dto });
  }

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany({
      include: { organizer: true },
    });
  }

  async findById(id: number): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id },
      include: { organizer: true },
    });
  }

  async update(id: number, dto: UpdateEventDto): Promise<Event> {
    return this.prisma.event.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Event> {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
