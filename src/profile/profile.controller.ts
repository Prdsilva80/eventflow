// src/profile/profile.controller.ts
import { Controller, Get, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@prisma/client';
import { AuthenticatedRequest } from '@/@types/authenticated-request';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() request: AuthenticatedRequest): Promise<User | null> {
    return this.profileService.getProfile(request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProfile(
    @Req() request: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    return this.profileService.updateProfile(request.user.id, updateProfileDto);
  }
}
