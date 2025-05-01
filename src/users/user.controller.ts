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
import { Request } from 'express';

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
    const user = await this.userService.findById(request.user.userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(
    @Req() request: Request & { user: { userId: number } },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SafeUser> {
    const userJwt = request.user;

    return this.userService.updateProfile(userJwt.userId, updateUserDto);
  }
}
