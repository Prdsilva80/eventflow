// src/registrations/registration.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Registration } from '@prisma/client';

@Injectable()
export class RegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRegistrationDto): Promise<Registration> {
    return this.prisma.registration.create({ data: dto });
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

  async remove(id: number): Promise<Registration> {
    return this.prisma.registration.delete({
      where: { id },
    });
  }
}
