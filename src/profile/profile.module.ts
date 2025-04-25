// src/profile/profile.module.ts
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from '@/config/prisma/prisma.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
