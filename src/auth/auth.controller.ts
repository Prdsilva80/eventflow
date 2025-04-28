/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  ConflictException,
  Get,
  HttpCode,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthService } from './auth.service';
import { SafeUser } from './dto/safe-user.dto';
import { LoginDto } from '../common/dto/login.dto';
import { RegisterDto } from '../common/dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() data: RegisterDto,
  ): Promise<{ message: string; user: SafeUser }> {
    try {
      const user = await this.authService.register({
        ...data,
        role: data.role as Role,
      });
      return { message: 'Usuário criado com sucesso', user };
    } catch (error: any) {
      if (error?.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw error;
    }
  }

  @Post('login')
  @HttpCode(200) // 👈 Corrige o status para 200 OK
  async login(
    @Body() data: LoginDto,
  ): Promise<{ access_token: string; user: SafeUser }> {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(
    @Req() req: Request & { user: SafeUser },
  ): Promise<SafeUser> {
    return req.user;
  }
}
