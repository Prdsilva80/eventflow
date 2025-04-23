import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/config/prisma/prisma.service';
import { RoleFilterDto } from './dto/role-filter.dto';
import { User } from '@prisma/client';

export type SafeUser = Pick<
  User,
  'id' | 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
}
