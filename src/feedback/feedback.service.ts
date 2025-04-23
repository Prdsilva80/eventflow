// src/feedback/feedback.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from '@prisma/client';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFeedbackDto): Promise<Feedback> {
    return this.prisma.feedback.create({ data: dto });
  }

  async findAll(): Promise<Feedback[]> {
    return this.prisma.feedback.findMany({
      include: {
        user: true,
        event: true,
      },
    });
  }

  async findOne(id: number): Promise<Feedback | null> {
    return this.prisma.feedback.findUnique({
      where: { id },
      include: {
        user: true,
        event: true,
      },
    });
  }
}
