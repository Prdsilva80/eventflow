import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number): Promise<User | null> {
    if (!userId || typeof userId !== 'number') {
      throw new BadRequestException('User ID must be a valid number');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto): Promise<User> {
    if (!userId || typeof userId !== 'number') {
      throw new BadRequestException('User ID must be a valid number');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });
  }

  // Removido: método não implementado
}
