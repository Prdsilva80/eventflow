// src/profile/profile.controller.ts
import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@prisma/client';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  getProfile(@Param('id') id: string): Promise<User | null> {
    return this.profileService.getProfile(Number(id));
  }

  @Patch(':id')
  updateProfile(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<User> {
    return this.profileService.updateProfile(Number(id), dto);
  }
}
