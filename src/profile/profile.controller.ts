/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@prisma/client';

// Criar uma tipagem customizada para Request com JWT
interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('profile')
export class ProfileController {
  findProfile(arg0: number): unknown {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() request: AuthenticatedRequest): Promise<User | null> {
    return this.profileService.getProfile(request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProfile(
    @Req() request: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    return this.profileService.updateProfile(
      request.user.userId,
      updateProfileDto,
    );
  }
}
