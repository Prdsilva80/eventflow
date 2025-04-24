// src/notifications/notification.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { ResendService } from '@/providers/resend.service';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resendService: ResendService,
  ) {}

  async create(
    userId: number,
    email: string,
    message: string,
  ): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        message,
      },
    });

    await this.resendService.send(
      email,
      'Notificação do EventFlow',
      `<p>${message}</p>`,
    );

    return notification;
  }

  async findAll(): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: { id },
      include: { user: true },
    });
  }
}
