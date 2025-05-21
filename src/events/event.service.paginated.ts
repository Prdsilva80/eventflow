// src/events/event.service.ts (versão atualizada com paginação)
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { Event } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  PaginatedResult,
  PaginationQueryDto,
} from '@/common/dto/pagination-query.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({ data: dto });
  }

  async findAll(
    paginationQuery?: PaginationQueryDto,
  ): Promise<PaginatedResult<Event>> {
    const { page = 1, limit = 10 } = paginationQuery || {};
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.event.findMany({
        include: { organizer: true },
        skip,
        take: limit,
      }),
      this.prisma.event.count(),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Event | null> {
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
