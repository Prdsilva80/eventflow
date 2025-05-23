// src/users/user.controller.ts
import {
  Controller,
  Get,
  Query,
  UseGuards,
  Req,
  NotFoundException,
  Patch,
  Body,
} from '@nestjs/common';
import { UserService, SafeUser } from './user.service';
import { RoleFilterDto } from './dto/role-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedRequest } from '@/@types/authenticated-request';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() role: RoleFilterDto): Promise<SafeUser[]> {
    return this.userService.findAll(role);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() request: AuthenticatedRequest): Promise<SafeUser> {
    const user = await this.userService.findById(request.user.id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(
    @Req() request: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SafeUser> {
    return this.userService.updateProfile(request.user.id, updateUserDto);
  }
}
