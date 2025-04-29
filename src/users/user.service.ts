import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { RoleFilterDto } from './dto/role-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

export type SafeUser = Pick<
  User,
  'id' | 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<SafeUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(filter: RoleFilterDto): Promise<SafeUser[]> {
    const { role } = filter;

    return this.prisma.user.findMany({
      where: role ? { role } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateProfile(userId: number, data: UpdateUserDto): Promise<SafeUser> {
    const updatedData: Partial<User> = { ...data };

    if (data.password) {
      if (typeof data.password !== 'string') {
        throw new Error('Password must be a string');
      }
      updatedData.password = await hash(data.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async findMe(userId: number): Promise<SafeUser> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
